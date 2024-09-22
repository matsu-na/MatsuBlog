# Spring&SpringBoot常用注解总结

就算是我，有时候也会搞忘个别注解的使用方法，放在这里方便查阅，从CSDN上面去找的解释不是看不懂，就是存在问题。

## 配置部分

### @SpringBootApplication

这个是在创建我们的`SpringBoot`项目时候，在项目的启动类上自动添加的一个注解，我们几乎不会主动去使用他。

`@SpringBootApplication` 是一个组合注解，它集成了多个 Spring 框架中的注解，包括 `@Configuration`、`@EnableAutoConfiguration` 和 `@ComponentScan`。这使得开发者在启动类上只需使用这一个注解，即可快速配置和启动 Spring Boot 应用。

根据 SpringBoot 官网，这三个注解的作用分别是：

- `@EnableAutoConfiguration`：启用 SpringBoot 的自动配置机制
- `@ComponentScan`：扫描被`@Component` (`@Repository`,`@Service`,`@Controller`)注解的 bean，注解默认会扫描该类所在的包下所有的类。
- `@Configuration`：允许在 Spring 上下文中注册额外的 bean 或导入其他配置类

### @MapperScan

`@MapperScan` 是 MyBatis-Spring-Boot-Starter 提供的一个注解，用于指定 MyBatis Mapper 接口所在的包路径。这个注解会告诉 MyBatis-Spring-Boot-Starter 自动扫描并注册这些 Mapper 接口，从而将它们与 MyBatis 的 SQL 会话（SqlSession）集成起来，实现数据访问层（DAO）的自动化配置。

`@MapperScan` 注解通常被用在 Spring Boot 的启动类或者配置类上，以指定 Mapper 接口所在的包路径，通过指定一个或多个包路径，MyBatis-Spring-Boot-Starter 会自动扫描这些路径下的所有 Mapper 接口，并将它们注册为 Spring 容器中的 Bean。

在使用 MyBatis-Spring-Boot-Starter 时，传统的 MyBatis 配置（如 mapper.xml 文件的路径配置）可以大大减少，因为大部分配置都可以通过自动扫描和自动配置来实现。

```java
@SpringBootApplication  
@MapperScan("com.example.mapper") // 指定 Mapper 接口所在的包路径  
public class MyApplication {  
  
    public static void main(String[] args) {  
        SpringApplication.run(MyApplication.class, args);  
    }  
}
```

### @Component

这是一个通用的注解，用于将类标记为Spring容器中的组件。当Spring扫描到带有`@Component`注解的类时，会自动将其注册为Spring应用上下文中的一个Bean。没有特定的角色约束，任何组件都可以使用`@Component`进行标注。

当没有更具体的注解（如`@Repository`、`@Service`、`@Controller`）可用时，或者当组件不属于任何特定层（如DAO、Service、Controller）时，可以使用`@Component`。

### @Repository

专门用于标注数据访问组件，即DAO（Data Access Object）层。它主要用于封装对数据库的访问操作。

`@Repository`注解不仅具有`@Component`的功能，还会使被标注的类具备一些额外的特性，如异常翻译。Spring会将原生访问数据库的异常（如SQLException）转换为Spring的持久层异常（如DataAccessException）。

用于标注数据访问层的类，如JPA的Repository、MyBatis的Mapper等。

### @Service

专门用于标注服务层组件。服务层是业务逻辑的核心，它负责处理业务逻辑，并调用数据访问层来持久化数据。`@Service`注解同样具有`@Component`的功能，但它更清晰地表明了这个类属于服务层。用于标注服务层的类，这些类包含了业务逻辑的处理方法。

### @Controller

专门用于标注控制器组件，即MVC（Model-View-Controller）架构中的控制器部分。控制器负责处理外部请求，并调用服务层来处理业务逻辑，最后返回视图或数据给客户端。

`@Controller`注解不仅具有`@Component`的功能，Spring还会为`@Controller`注解的类提供额外的支持，如自动检测`@RequestMapping`注解，并将请求映射到相应的方法上。用于标注处理HTTP请求的控制器类。

### @RestController

这个逐渐通常被使用在前后端分离的项目当中。

`@RestController` 是一个类级别的注解，它组合了 `@Controller` 和 `@ResponseBody` 两个注解的功能。当一个类被 `@RestController` 注解标记时，它表明该类中的所有方法都会返回响应体（即 HTTP 响应体），并且方法的返回值将直接作为 HTTP 响应的正文返回，而不是渲染为视图页面。

```java
@RestController  
public class MyRestController {  
  
    @GetMapping("/hello")  
    public String sayHello() {  
        return "Hello, World!";  
    }  
}
```

- 当使用 `@RestController` 注解的类返回对象时，Spring Boot 会自动将对象序列化为 JSON 或 XML 等格式（取决于配置的 `HttpMessageConverter`），并设置正确的 `Content-Type` 头部，使客户端能够正确地解析响应数据。
- `@RestController` 使得开发者可以更加便捷地创建 RESTful API，而无需在每个方法上都添加 `@ResponseBody` 注解。
- `@RestController` 完美集成了 Spring MVC 的请求映射和响应处理机制，使得开发者可以轻松地实现 RESTful 风格的 Web 服务。

### @Configuration

- 当某个类被 `@Configuration` 注解标注时，表示这个类是 Spring 的一个配置类。这个类将用于定义和管理 Spring 应用中的 Bean 的创建和配置。

- `@Configuration` 注解能够替代 Spring 的 XML 配置文件（如 applicationContext.xml），使得配置更加灵活和方便。

- 被 `@Configuration` 注解的类会被自动注册到 Spring 的 IoC（控制反转）容器中，并进行实例化。

### @Bean

- 置类中通常包含一些使用 `@Bean` 注解的方法，这些方法用于定义和组装 Bean。每个 `@Bean` 方法都会返回一个对象，该对象会被 Spring IoC 容器管理。

- 配置类可以通过依赖注入的方式引入其他 Bean，从而实现 Bean 之间的依赖关系管理。

- 配置类中的方法可以使用条件注解（如 `@ConditionalOnClass`、`@ConditionalOnProperty` 等）来根据条件创建和注册 Bean。

```java
@Configuration  
public class AppConfig {  
  
    @Bean  
    public MyBean myBean() {  
        return new MyBean();  
    }  
  
    @Bean  
    public AnotherBean anotherBean(MyBean myBean) {  
        // 依赖注入 MyBean  
        return new AnotherBean(myBean);  
    }  
}
```

### @ControllerAdvice和@ExceptionHandler

`@ControllerAdvice`用于定义全局的控制器增强器。这个注解可以被应用在任何类上，但它通常与 `@Component` 一起使用，以便 Spring 容器能够发现并注册这个类作为 Spring MVC 架构的一部分。

用于处理控制器（Controller）中抛出的异常。当控制器中的方法执行过程中抛出异常时，Spring MVC 会查找与异常类型相匹配的 `@ExceptionHandler` 方法，并调用该方法来处理异常。这样，开发者就可以将异常处理逻辑与业务逻辑分离，使控制器代码更加简洁和清晰。

```java
@ControllerAdvice  
public class GlobalExceptionHandler {  
  
    @ExceptionHandler(value = Exception.class)  
    public ResponseEntity<Object> handleException(Exception e) {  
        // 这里可以记录日志、发送报警等  
          
        // 创建一个统一的错误响应体  
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());  
          
        // 返回错误响应  
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);  
    }  
  
    // 可以为不同类型的异常定义不同的处理方法  
    @ExceptionHandler(value = MyCustomException.class)  
    public ResponseEntity<Object> handleMyCustomException(MyCustomException e) {  
        // 处理自定义异常  
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST.value(), e.getMessage());  
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);  
    }  
  
    // 辅助类，用于封装错误信息  
    public static class ApiError {  
        private int status;  
        private String message;  
  
        // 构造函数、getter和setter省略  
    }  
}
```

## 请求部分

这些请求注解都是需要放在方法的上方，当然也可以放在类的上面，起到一个拼接的作用，将两个路径合在一起就是我们请求当前方法的请求路径。

 **种常见的请求类型:**

- **GET**：请求从服务器获取特定资源。举个例子：`GET /users`（获取所有学生）
- **POST**：在服务器上创建一个新的资源。举个例子：`POST /users`（创建学生）
- **PUT**：更新服务器上的资源（客户端提供更新后的整个资源）。举个例子：`PUT /users/12`（更新编号为 12 的学生）
- **DELETE**：从服务器删除特定的资源。举个例子：`DELETE /users/12`（删除编号为 12 的学生）
- **PATCH**：更新服务器上的资源（客户端提供更改的属性，可以看做作是部分更新），使用的比较少，这里就不举例子了。

### @RequestMapping()

- 这是一个通用的注解，用于将HTTP请求映射到特定的处理器类或方法上。它可以处理所有类型的HTTP请求（GET、POST、PUT、DELETE等）。**：它有许多属性，如`value`（或`path`）用于指定请求的URL路径，`method`用于指定HTTP方法类型（如GET、POST），其中可以不写，这是以一个非必须参数。`params`用于指定请求必须包含的参数，`headers`用于指定请求必须包含的HTTP头信息，等等。
- **示例**：`@RequestMapping(value = "/users", method = RequestMethod.GET)`

### @GetMapping()

- 等价于`@RequestMapping(method = RequestMethod.GET)`，与`@RequestMapping`类似，但通常只关注与GET请求相关的属性，如`value`（或`path`）用于指定请求的URL路径。
- **示例**：`@GetMapping("/users")`

### @PostMapping()

- 等价于`@RequestMapping(method = RequestMethod.POST)`，与`@GetMapping`类似，但专注于POST请求。通常用在表单提交、不适合向用户展示的数据情况下。
- **示例**：`@PostMapping("/users")`

### @PutMapping()

- 等价于`@RequestMapping(method = RequestMethod.PUT)`，与`@GetMapping`和`@PostMapping`类似，但专注于PUT请求，通常使用插入、修改数据操作。
- **示例**：`@PutMapping("/users/{id}")`

### @DeleteMapping()

- 等价于`@RequestMapping(method = RequestMethod.DELETE)`，与前面的注解类似，但专注于DELETE请求。通常使用在删除业务。
- **示例**：`@DeleteMapping("/users/{id}")`

### @PatchMapping()

- 等价于`@RequestMapping(method = RequestMethod.PATCH)`，与前面的注解类似，但专注于PATCH请求。通常使用在修改业务流程中。
- **示例**：`@PatchMapping("/users/{id}")`

一般实际项目中，我们都是 PUT 不够用了之后才用 PATCH 请求去更新数据。

其中如果使用了`@RequestMapping`后，这个路径下的全部请求类型都将被这个请求所拦截，其他的几个请求方式的请求路径可以相同，前提是不同的请求方法，两个一样的`@RequestMapping`是不被允许的。

## 参数部分

### @PathVariable

`@PathVariable` 用于将 URL 模板变量值绑定到控制器处理方法的参数上。这通常用于 RESTful Web 服务中，当你需要根据 URL 的不同部分来访问不同的资源时。它通常与 `@RequestMapping`（或其派生注解如 `@GetMapping`、`@PostMapping` 等）一起使用，并且 URL 模板中定义的变量名必须与 `@PathVariable` 注解的 `value` 或 `name` 属性值相匹配。

```java
@GetMapping("/users/{userId}")  
public String getUser(@PathVariable("userId") String userId) {  
    // ... 根据 userId 获取用户信息  
    return "User info for " + userId;  
}
```

### @RequestParam

`@RequestParam` 用于将请求参数（即查询字符串中的参数）绑定到控制器处理方法的参数上。这在你需要处理表单数据或 URL 查询参数时非常有用。它也可以与 `@RequestMapping`（或其派生注解）一起使用，并且请求参数名必须与 `@RequestParam` 注解的 `value` 或 `name` 属性值相匹配（如果省略，则默认使用参数名）。

这里的请求参数是请求链接后的param，即`?`后面的部分，属性和属性之间使用`&`连接，属性和值使用`=`连接。

```java
@GetMapping("/users")  
public String listUsers(@RequestParam(value = "name", required = false) String name) {  
    // ... 根据 name 过滤用户列表（如果提供了 name）  
    return "User list";  
}
```

### @RequestBody

简单来说，`@RequestBody` 就是用来把 HTTP 请求体中的数据“翻译”成 Java 对象，然后让控制器能够更加方便地处理这些数据。它让 Spring MVC 的开发者能够以更加面向对象的方式来编写 Web 应用，而不是直接处理原始的 HTTP 请求和响应。

- 确保你的请求体内容与你的 Java 对象结构相匹配，否则 HTTP 消息转换器可能无法正确地将请求体转换为 Java 对象。
- 在使用 `@RequestBody` 时，通常不需要在请求中包含额外的查询字符串参数（即 URL 中的 `?key=value` 部分），因为所有需要的数据都应该包含在请求体中。
- 如果你的方法需要同时接收请求体和查询字符串参数，你可以同时使用 `@RequestBody` 和 `@RequestParam`（或 `@PathVariable`，但这通常用于 URL 模板变量）。

```java
@PostMapping("/users")  
public ResponseEntity<User> createUser(@RequestBody User user) {  
    // ... 处理用户数据，例如保存到数据库  
    return ResponseEntity.ok(user); // 或者返回其他适当的 HTTP 响应  
}
```

**注意**：一个请求方法只可以有一个`@RequestBody`，但是可以有多个`@RequestParam`和`@PathVariable`。 如果你的方法必须要用两个 `@RequestBody`来接受数据的话，大概率是你的数据库设计或者系统设计出问题了！

## 开发篇

###  @Autowired

`@Autowired` 是 Spring 框架中的一个注解，用于自动装配 Spring 容器中的 bean。这个注解可以应用于构造函数、字段、setter 方法等，以指示 Spring 容器在创建 bean 时自动注入依赖的 bean。

通过 `@Autowired` 注解，Spring 容器能够自动地将依赖的 bean 注入到被注解的字段、构造函数或 setter 方法中，从而实现了依赖的自动装配，无需显式地编写代码来查找和获取依赖的 bean，提高了代码的可读性和可维护性。`@Autowired` 注解可以与 `@Qualifier` 注解一起使用，以指定要注入的 bean 的名称，从而提供了更灵活的依赖注入方式。

下面是常见的两种注入方式：

```java
@Component  
public class MyBean {  
    @Autowired  
    private DependencyBean dependencyBean;  

    // 使用 dependencyBean ...  
}
```

```java
@Component  
public class MyBean {  
    private DependencyBean dependencyBean;  

    @Autowired  
    public void setDependencyBean(DependencyBean dependencyBean) {  
        this.dependencyBean = dependencyBean;  
    }  

    // 使用 dependencyBean ...  
}
```

### @Resource

在 Spring 框架中，`@Resource` 注解同样用于依赖注入，但它更接近于 JSR-250 规范中的 `@Resource`，而不是 Spring 特有的 `@Autowired`。`@Resource` 默认按照名称（name）进行装配，如果找不到同名的bean，则按照类型（type）进行装配。如果既没有指定名称，又找不到同类型的bean，则会抛出异常。

```java
@Component  
public class MyService {  
  
    @Resource(name = "myBean")  
    private MyBean myBean;  
  
    // 使用 myBean 进行操作  
}
```

 与 `@Autowired` 的比较

- `@Autowired` 是 Spring 特有的注解，主要用于自动装配 bean，默认按照类型进行装配。
- `@Resource` 既可以按照名称装配，也可以按照类型装配（如果未指定名称）。它来自 JSR-250 规范，因此可以在 Java EE 和 Spring 中使用。
- `@Autowired` 提供了更多的灵活性，比如可以通过 `@Qualifier` 注解来指定具体的 bean 名称，但 `@Resource` 直接通过 `name` 属性实现这一点。
- 在 Spring 框架中，`@Autowired` 是更常用的注解，因为它提供了更简洁的语法和更灵活的装配方式。然而，在某些情况下，`@Resource` 的按名称装配特性可能更加有用。

### @Value

`@Value` 是 Spring 框架中用于属性注入的一个注解，它可以将配置文件中的值或计算后的结果注入到 Spring Bean 的字段中。

- 注入单个属性

```java
@Component  
public class MyBean {  
    @Value("${my.property}")  
    private String myProperty;  
    // getter 和 setter 方法  
}
```

- 如果配置文件中不存在对应的属性值，可以在 `@Value` 注解中指定一个默认值

```java
@Component  
public class MyBean {  
    @Value("${my.property:defaultValue}")  
    private String myProperty;  
    // getter 和 setter 方法  
}
```

- 注入集合类型

```java
@Component  
public class MyBean {  
    @Value("#{'${my.list}'.split(',')}")  
    private List<String> myList;  
    // getter 和 setter 方法  
}
```

- 注入环境变量

```java
@Component  
public class MyBean {  
    @Value("${JAVA_HOME}")  
    private String javaHome;  
    // getter 和 setter 方法  
}
```

- 注入类路径下的资源文件

```java
@Component  
public class MyBean {  
    @Value("classpath:myFile.txt")  
    private Resource myResource;  
    // getter 和 setter 方法  
}
```

确保配置文件的名称和位置正确，Spring Boot 默认会加载 `application.properties` 或 `application.yml` 文件。

如果使用了自定义的配置文件，可以通过 `@PropertySource` 注解指定其位置（但在 Spring Boot 应用中通常不需要）。

`@Value` 注解中的占位符名称必须与配置文件中的属性名称完全匹配（包括大小写）。如果遇到无法解析占位符的错误，请检查配置文件是否存在、占位符名称是否正确、配置文件是否已被 Spring Boot 正确加载。

### @ConfigurationProperties

允许 Spring 自动将配置文件（如 application.properties 或 application.yml）中的键值对映射到 Bean 的属性上，减少了手动读取配置的工作。绑定过程会进行类型检查，确保配置值与 Java Bean 属性类型匹配，增加了安全性。
可以结合使用 @Valid 或 @Validated 注解来实现配置绑定对象的校验。

```java
@Component  
@ConfigurationProperties(prefix = "app.datasource")  
public class DataSourceConfig {  
    private String url;  
    private String username;  
    private String password;  
    // Getter and Setter methods...  
}
```

通过 Spring 容器自动装配配置属性类的实例，并在需要的地方使用它。

```java
@Autowired  
private DataSourceConfig dataSourceConfig;  

public void doSomething() {  
    String url = dataSourceConfig.getUrl();  
    // 使用 url 进行数据库操作  
}
```

### @Valid和@Validated

`@Valid` 是 Hibernate Validation 提供的注解，属于 JSR-303 Bean Validation 规范的一部分。`@Valid` 可以用在方法、字段、构造器、方法参数等多个位置上。

```java
@PostMapping("/user")  
public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {  
    if (result.hasErrors()) {  
        // 处理验证错误  
        return ResponseEntity.badRequest().body(result.getAllErrors());  
    }  
    // 用户创建逻辑  
    return ResponseEntity.ok().build();  
}
```

`@Validated` 是 Spring 提供的注解，作为 JSR-303 的一个补充，提供了分组校验的功能。它表示启用 Spring 的校验机制。`@Validated` 可以用在接口、类、方法、方法参数等位置，但不能直接用于字段。

```java
public interface UserCreationGroup {}
```

```java
public class User {  
    @NotNull(groups = UserCreationGroup.class, message = "Name cannot be null when creating a user")  
    private String name;  
    // 其他字段和验证...  
}  
  
@PostMapping("/user")  
public ResponseEntity<?> createUser(@Validated(UserCreationGroup.class) @RequestBody User user) {  
    // 这里Spring会自动根据UserCreationGroup组来验证User对象  
    // 如果验证通过，则继续执行后续逻辑  
    // 如果验证失败，则默认会抛出异常，你可以通过全局异常处理器来处理这个异常  
    // 用户创建逻辑...  
    return ResponseEntity.ok().build();  
}
```

一些常用的校验规则：

- `@NotEmpty` 被注释的字符串的不能为 null 也不能为空

- `@NotBlank` 被注释的字符串非 null，并且必须包含一个非空白字符

- `@Null` 被注释的元素必须为 null

- `@NotNull` 被注释的元素必须不为 null

- `@AssertTrue` 被注释的元素必须为 true

- `@AssertFalse` 被注释的元素必须为 false

- `@Pattern(regex=,flag=)`被注释的元素必须符合指定的正则表达式

- `@Email` 被注释的元素必须是 Email 格式。

- `@Min(value)`被注释的元素必须是一个数字，其值必须大于等于指定的最小值

- `@Max(value)`被注释的元素必须是一个数字，其值必须小于等于指定的最大值

- `@DecimalMin(value)`被注释的元素必须是一个数字，其值必须大于等于指定的最小值

- `@DecimalMax(value)` 被注释的元素必须是一个数字，其值必须小于等于指定的最大值

- `@Size(max=, min=)`被注释的元素的大小必须在指定的范围内

- `@Digits(integer, fraction)`被注释的元素必须是一个数字，其值必须在可接受的范围内

- `@Past`被注释的元素必须是一个过去的日期

- `@Future` 被注释的元素必须是一个将来的日期

### @Entity

被 `@Entity` 注解的类的实例可以被 JPA 框架（如 Hibernate）映射到数据库中的表，并进行持久化操作。`@Entity` 注解用于将一个 Java 类声明为 JPA 实体类。这个类将被视为数据库中的一个表，类的属性对应表中的列。通过 `@Entity` 注解，JPA 能够理解这个类与数据库表之间的映射关系，从而允许开发者通过操作 Java 对象来间接操作数据库。

```java
@Entity  
public class User {  
    @Id  
    private Long id;  
    private String username;  
    private String password;  
    // 其他属性和方法  
  
    // getter 和 setter 方法  
}
```

**注意**

- JPA 要求实体类必须有一个无参构造器，以便在运行时进行实例化。

- 每个实体类都必须有一个被 `@Id` 注解标记的属性作为主键。
- 除了 `@Entity` 和 `@Id` 之外，JPA 还提供了其他注解（如 `@Table`、`@Column`、`@OneToMany` 等）来进一步定义实体类与数据库表之间的映射关系。

### @Transactional

`@Transactional` 可以应用于接口定义、接口中的方法、类定义或类中的公共方法上。当应用于类级别时，表示该类中的所有公共方法都将启用事务管理（除非它们被标记为 `@Transactional(propagation = Propagation.NOT_SUPPORTED)` 等，表示不支持事务）。当应用于方法级别时，它仅影响该方法的事务行为。

`@Transactional` 注解有多个属性，用于定制事务的行为，包括但不限于：

- `propagation`：定义事务的传播行为，比如 `Propagation.REQUIRED`（默认值，如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务）、`Propagation.REQUIRES_NEW`（创建一个新的事务，并暂停当前事务（如果存在））。
- `isolation`：定义事务的隔离级别，比如 `Isolation.DEFAULT`（使用底层数据库的默认隔离级别）、`Isolation.READ_COMMITTED` 等。
- `timeout`：定义事务的超时时间，以秒为单位，默认为底层事务系统的默认超时时间。
- `readOnly`：标记事务是否为只读事务，默认为 `false`。只读事务用于读取数据的操作，可以提高性能，因为它允许数据库引擎对这类事务进行优化。
- `rollbackFor`：指定哪些异常会导致事务回滚，默认为 `RuntimeException` 和 `Error`。
- `noRollbackFor`：指定哪些异常不会导致事务回滚。

**注意**

- Spring 的 `@Transactional` 是通过代理机制实现的，因此它只适用于由 Spring 容器管理的 bean 之间的方法调用。如果在一个类内部的方法调用中使用了 `@Transactional`，那么它不会生效，因为这不是通过代理对象调用的。

- 默认情况下，只有运行时异常（`RuntimeException`）和错误（`Error`）会导致事务回滚。如果希望其他类型的异常也能触发回滚，可以通过 `rollbackFor` 属性指定。

- 将事务标记为只读可以优化数据库性能，因为它允许数据库引擎避免不必要的锁和日志记录操作。但是，如果事务中包含了修改数据的操作，则不应将其标记为只读。

### @JsonIgnoreProperties

`@JsonIgnoreProperties` 是 Jackson 库中的一个类注解，用于在 JSON 序列化和反序列化过程中忽略一些属性。这个注解可以应用于类级别或字段级别，但更常见的是应用于类级别，以指定要忽略的属性列表或行为。

在类定义上方使用 `@JsonIgnoreProperties` 注解，并可以指定一个或多个要忽略的属性名，或者使用其属性（如 `ignoreUnknown`）来控制未知字段的处理。

```java
@JsonIgnoreProperties({"name", "age"})  
public class User {  
    private String name;  
    private int age;  
    // 其他字段和方法  
}
```

当 `ignoreUnknown` 设置为 `true` 时，Jackson 在反序列化时会忽略那些类中不存在的字段。这有助于处理来自外部系统的 JSON 数据，这些数据可能包含一些额外的、不被当前类定义的字段。

```java
@JsonIgnoreProperties(ignoreUnknown = true)  
public class Request {  
    private String deviceName;  
    // 其他字段和方法  
}
```

### @JsonFormat

`@JsonFormat` 是 Java 中用于指定日期和时间格式的注解，它通常与 Jackson 库一起使用，在 JSON 序列化和反序列化时控制日期和时间的格式。

```java
import com.fasterxml.jackson.annotation.JsonFormat;  
  
public class Example {  
  
    // 指定日期和时间格式为年-月-日 小时:分钟:秒  
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")  
    private LocalDateTime dateTime;  
  
    // 自定义日期格式  
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")  
    private Date customDate;  
  
    // 指定时区  
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")  
    private Date dateWithTimezone;  
  
    // ... 省略getter和setter方法  
}
```

- `@JsonFormat` 注解不是 Spring 自带的注解，而是 Jackson 的注解。因此，在使用前需要确保项目中已经引入了 Jackson 的相关依赖。对于 Spring Boot 项目，通常不需要手动添加依赖，因为 Spring Boot 的 `spring-boot-starter-web` 起步依赖已经包含了 Jackson 的相关依赖。

- `@JsonFormat` 注解主要在 JSON 序列化和反序列化时生效。如果直接在代码中打印或使用日期对象，其格式将不受此注解影响。

## 测试部分

### @SpringbootTest

`@SpringBootTest` 是 Spring Boot 提供的一个用于测试的注解，其主要用途是在测试过程中方便地创建一个应用上下文。这个注解告诉 Spring Boot 去寻找一个主配置类（比如带有 `@SpringBootApplication` 的类），并使用它来启动 Spring 应用上下文。

```java
@SpringBootTest  
public class MyIntegrationTest {  
  
    @Autowired  
    private MyService myService;  
  
    @Test  
    public void testMyService() {  
        String result = myService.performOperation();  
        assertThat(result).isEqualTo("expectedResult");  
    }  
}
```

### @RunWith

`@RunWith` 是 JUnit 测试框架中的一个注解，用于指定测试类运行时要使用的测试运行器（Test Runner）。测试运行器负责管理测试的执行，并提供各种扩展和定制选项。通过 `@RunWith` 注解，可以指定一个自定义的测试运行器来运行测试类，从而实现更灵活和高度可定制的测试执行。它允许将其他测试框架或库（如 Spring）的测试支持集成到 JUnit 测试中。

```java
@RunWith(SpringRunner.class)  
@SpringBootTest  
public class MySpringIntegrationTest {  
  
    // 在这里编写测试方法，可以注入 Spring 管理的 Bean 并进行测试  
}
```

## 总结

- 内容很多背不下来，忘记用法可以回来查，都用的不多了就说明一点都不重要。
- 还有一个AOP的用法没有在这个文章当中写，因为使用方法还是比较复杂的，所以我想留到下一篇文章去写，喵~
