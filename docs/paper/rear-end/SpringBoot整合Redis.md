# SpringBoot整合Redis进行开发

在最近几次的开发中，发现每次都会忘记Redis在项目中应该怎样去配置，现在写一个文章方便以后查阅，希望以后不要忘记怎么去开发了！

## 1、新建一个SpringBoot项目

选择自己最熟悉的SpringBoot的版本即可，这里用的是2.7.18。

### 1.1、在pom.xml中添加依赖项

除开正常创建项目时添加的spring-boot-starter-web等依赖，还应该添加两个依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId> 
        </dependency>
```

### 1.2、配置Redis属性

```yaml
spring:
  redis:
    # Redis服务器地址
    host: 127.0.0.1
    # Redis服务器端口号
    port: 6379
    # 使用的数据库索引，默认是0
    database: 0
    # 连接超时时间
    timeout: 1800000
     # 设置密码
    password: your_password
    lettuce:
      pool:
        # 最大阻塞等待时间，负数表示没有限制
        max-wait: -1
        # 连接池中的最大空闲连接
        max-idle: 5
        # 连接池中的最小空闲连接
        min-idle: 0
        # 连接池中最大连接数，负数表示没有限制
        max-active: 20
```

## 2、修改序列化

这一步必须配置，不然你在数据库里面看到的就是一堆乱掉的编码，像\xAC\xED\x00\x05t这样类似的东西，不方便阅读，所以这一步是重中之重！

### 2.1、修改json序列化

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

### 2.2、手动String序列化

编写这个的目的是防止自带的序列化器将class的信息也写入Redis带来不必要的开销，如果并不在乎Redis的存储空间或者网站较小时可以直接忽略这一步。

```java
    @Autowired
    private StringRedisTemplate redisTemplate;
    // JSON工具
    private static final ObjectMapper mapper = new ObjectMapper();

    @Test
    void testTwo() throws IOException {
        Person person = new Person("我是一棵卷心菜", 21);
        //  手动序列化
        String json = mapper.writeValueAsString(person);
        redisTemplate.opsForValue().set("person", json);
        String personJson = redisTemplate.opsForValue().get("person");
        // 反序列化
        Person person1 = mapper.readValue(personJson, Person.class);
        System.out.println(person1);
    }
```



## 3、使用

在需要使用到Redis时候，直接将StringRedisTemplate进行注入就可以使用了。

```java
    @Resource
    private StringRedisTemplate redisTemplate;
```

## 补充：常见的操作

#### 1、String操作

```java
 redisTemplate.opsForValue().set(key1, "张三");
 String s = redisTemplate.opsForValue().get(key1);
 
 redisTemplate.opsForValue().set(key2, "李四", 30, TimeUnit.SECONDS);
 String s = redisTemplate.opsForValue().get(key2);
```

#### 2、Set操作

```java
redisTemplate.opsForSet().add(key5,"语文");
redisTemplate.opsForSet().add(key5,"数学");
redisTemplate.opsForSet().add(key5,"英语");

redisTemplate.opsForSet().add(key6,"语文");
redisTemplate.opsForSet().add(key6,"英语");

Set<String> intersect = redisTemplate.opsForSet().intersect(key5, key6);
```

#### 3、Hash操作

```java
redisTemplate.opsForHash().put(key3,"家庭住址","开封");
redisTemplate.opsForHash().put(key3,"大学","开封大学");

List<Object> values = redisTemplate.opsForHash().values(key3);
```

#### 4、List操作

```java
 redisTemplate.opsForList().leftPush(key1,"张三");
 redisTemplate.opsForList().leftPush(key1,"李四");
 redisTemplate.opsForList().leftPush(key1,"王五");
        
 Object o = redisTemplate.opsForList().rightPop(key1);
```

#### 5、Zset操作

```java
redisTemplate.opsForZSet().add(key6, "语文", 88);
redisTemplate.opsForZSet().add(key6, "数学", 99);
redisTemplate.opsForZSet().add(key6, "英语", 66);

ZSetOperations.TypedTuple<String> stringTypedTuple = redisTemplate.opsForZSet().popMax(key6);
```

#### 6、BitMap操作

```java
redisTemplate.opsForValue().setBit(key3,2,true);
redisTemplate.opsForValue().setBit(key3,144,true);
RedisCallback<Long> callback=connection -> {
	return connection.bitCount(key3.getBytes(),0,19);
};
Long totalCount = redisTemplate.execute(callback);
```

