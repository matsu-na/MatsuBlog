# Java实现邮件验证码发送

​	在日常的工作代码开发中，经常会出现接收短信验证码的形式，但是由于没有钱，所以想到了另外一个接收验证码的方式，那就是邮箱验证码，即使是现在也有很多大厂在使用。所以这里来研究怎样去实现这样一个功能。



​	首先准备一个能够正常使用的邮箱账号，这里以163邮箱为例。

## 一、开启邮箱POP3/SMTP服务

​	在邮箱的设置中去打开POP3/SMTP服务，如果是第一次打开会弹出默认的授权码，这个只会显示一次，注意进行保管，有效期为180天，差不多是半年的时间，定期更换就行。

![image-20240712142002135](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712142002135.png)

​	如果之前打开过，但是没有保存授权码，在下方去点击新增授权密码按钮保存即可。

​	XQHSGWPPDSJLTRIC

## 二、新建SpringBoot项目

### 2.1、在项目的pom.xml中添加依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
            <version>3.2.7</version>
        </dependency>
```

### 2.2、配置yml文件

​	在项目创建时，默认的配置文件的名称是application.properties，因为习惯上是使用yml这里直接修改后缀即可，换成自己常用的配置文件类型。

![image-20240712143554426](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712143554426.png)

```xml
spring:
  redis:
    host: 127.0.0.1
    port: 6379
    password: your_password
    database: 0
    timeout: 1800000

  mail:
    host: smtp.163.com
    port: 587
    protocol: smtp
    default-encoding: UTF-8
    username: your_email
    password: your_accredit_password
    test-connection: true
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
```

### 2.3、启动Redis服务器

![image-20240712144446590](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712144446590.png)

### 2.4、配置RedisConfig（直接复制即可）

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
            throws UnknownHostException {
        // 创建模板
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 设置序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer =
                new GenericJackson2JsonRedisSerializer();
        // key和 hashKey采用 string序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());
        // value和 hashValue采用 JSON序列化
        redisTemplate.setValueSerializer(jsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return redisTemplate;
    }
}
```

## 三、代码编写

### 3.1、Controller类

```java
@RestController
public class MainController {
    @Resource
    AccreditServer accreditServer;

    @PostMapping("/{email}")
    public Result post(@PathVariable String email) {
        accreditServer.accredit(email);
        return Result.success();
    }
}
```

### 3.2、Server类

```java
@Service
public class AccreditServerImpl implements AccreditServer {
    @Resource
    RedisTemplate redisTemplate;
    @Resource
    EmailUtil emailUtil;

    @Override
    public void accredit(String email) {
        String code = AccreditUtil.getCode();
        redisTemplate.opsForValue().set(email, code, 5, TimeUnit.MINUTES);
        boolean checkStatus = emailUtil.sendCodeEmail(email, code);
        if (!checkStatus){
            throw new RuntimeException("邮件发送失败");
        }
    }
}
```

### 3.3、验证码工具类

```java
public class AccreditUtil {
    public static String getCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder(6);

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            code.append(characters.charAt(index));
        }
        return code.toString();
    }
}
```

### 3.4、邮件工具类

```java
@Component
public class EmailUtil {
    @Value("${spring.mail.username}")
    String from;
    @Resource
    JavaMailSender mailSender;

    public boolean sendCodeEmail(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("验证码");
        message.setText("尊敬的用户，您的验证码是：" + code + "验证码五分钟内有效。");
        try {
            mailSender.send(message);
            return true;
        } catch (MailException e) {
            return false;
        }
    }
}
```

### 3.4、统一返回类

```
@Data
@AllArgsConstructor
public class Result {
    int code;
    String msg;
    Object data;

    public static Result success() {
        return new Result(200, "请求成功", null);
    }
}
```

## 四、运行验证

### 4.1、运行Java后端

![image-20240712172017450](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712172017450.png)

​	如果运行时出现了错误

```
java.lang.NullPointerException: Cannot invoke "org.springframework.mail.javamail.JavaMailSender.send(org.springframework.mail.SimpleMailMessage)" because "this.mailSender" is null
```

​	此时去寻找EmailUtil类被使用的地方，查看是否是new了一个新的对象出来，我们在编写EmailUtil的时候，已经使用了@Component注解，即代表我们这个类是被Spring容器所管理着的，此时创建一个新的对象出来当然一定会报空，我们只需要在上面的位置利用@Resource或@Autowired注解将EmailUtil注入进来就解决了。

### 4.2、使用ApiFox进行测试

![image-20240712172141491](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712172141491.png)

​	同时对应的邮箱收到验证码

![image-20240712173101890](C:\Users\松泽\AppData\Roaming\Typora\typora-user-images\image-20240712173101890.png)