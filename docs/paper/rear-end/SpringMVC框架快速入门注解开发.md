# SpringMVC框架快速入门注解开发

## 前言

SpringMVC框架已经是很久之前使用的框架了，对于现在的环境来说，最常用的是SpringBoot，不过学好SpringMVC也能够让我们在SpringBoot项目中能够更加熟练的开发，因为本质上都是差不多的东西。

先了解一下优缺点再进入我们的快速入门：

SpringMVC的优缺点

- 优点：

  - MVC模式：SpringMVC为MVC模型提供极佳的支持。MVC模式可以提高代码的复用性、灵活性和可扩展性，同时也有利于维护Web应用程序。

  - 灵活的配置：Spring MVC采用了灵活的配置方法，可以通过XML配置或注解的方式实现。

  - 易于测试：SpringMVC中的Controller类是POJO（纯Java对象），它们的测试很容易，可以用JUnit等测试框架进行测试。

  - 兼容OpenAPI：SpringMVC可以与其他框架集成，例如OpenAPI（Swagger），可以为API文档和开发者交互提供支持。

- 缺点：

  - 学习曲线：与其他框架相比，SpringMVC的学习曲线较陡峭，需要花费一定的时间学习和理解SpringMVC的工作原理和机制。

  - 配置繁琐：配置SpringMVC的过程相对繁琐，需要配置多个文件和注解。

## 创建一个SpringMVC项目

首先打开你的idea创建项目的界面

![image-20240921111708319](imgs\image-20240921111708319.png)

之后在生成器旁边选择Maven，这里如果没有本地的Maven的话需要到官网进行下载，在工件位置选择webapp，为你的项目起一个名字，其他的属性可以不用进行修改，直接点击创建即可。

如果你的电脑没有安装maven，请参考我的另一篇文章[给电脑安装Maven仓库并配置阿里云镜像](给电脑安装Maven仓库并配置阿里云仓库.md)。

等待创建完毕就能够看到项目的目录结构了，之后再main目录下新建一个文件夹，并且命名为`java`。

![image-20240921204313406](imgs\image-20240921204313406.png)



### 修改pom.xml

于src目录同级的位置下存在一个`pom.xml`文件，在这个文件中，修改dependencies内的内容，将其修改为下面这段代码，之后右上角会有一个M标识，点击刷新即可。

```xml
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.10.RELEASE</version>
        </dependency>
```

如果右上角不存在刷新按钮，请单击鼠标右键，选择Maven->重新加载项目

![image-20240921204527955](imgs\image-20240921204527955.png)

等待全部的红色字样都变为白色说明jar包下载成功，这个时候我们再进行下一步操作。

### 创建基础的包和类

创建一个`controller`包，用来统一管理所有的请求，分发给不同的service层处理需求。我在这里创建了一个`DemoController`文件，并且写入了一个请求save。

- @RequestMapping是映射请求地址，需要通过括号内部的参数进行访问。如图我就需要访问`localhost/save`这个地址来请求我这个方法。
- @Controller是需要在每一个controller类都需要添加的。

```java
    @RequestMapping("save")
    @ResponseBody
    public String save() {
        System.out.println("running");
        return "{'success':'SpringMVC'}";
    }
```

![image-20240921205942390](imgs\image-20240921205942390.png)

接下来又在config文件中编写了一个`SpringMvcConfig`类，用来统一Spring当中的配置，

- @Configuration的意思是告诉Spring这是一个配置类
- @ComponentScan是包扫描器，告诉Spring要扫描这个包下面的全部文件。将controller的bean添加到容器当中使用。

![image-20240921210411114](imgs\image-20240921210411114.png)

然后又新建一个文件`ServletcontainersInitconfig`这个文件需要继承`AbstractDispatcherServletInitializer`这个类，然后重写他的三个抽象方法。

- createServletApplicationContext：加载springmvc容器配置
- getServletMappings：设置哪些请求归属于springmvc处理
- createRootApplicationContext：加载spring容器配置

之后为createServletApplicationContext添加内容，修改getServletMappings的返回值。

```java
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(SpringMvcConfig.class);
        return ctx;
    }
```

```java
return new String[]{"/"};
```

![image-20240921211430533](imgs\image-20240921211430533.png)

### 最后准备

接下来我们删除webapp/WEB-INF下的文件。

![image-20240921212147394](imgs\image-20240921212147394.png)

在`pom.xml`文件最后的build标签内添加下面这段代码，重新刷新maven就好了。

```xml
<plugins>
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
            <port>80</port>
            <path>/</path>
        </configuration>
    </plugin>
</plugins>
```

在右上角的编辑配置中，添加一个maven，将插件的内容填到当中去，注意不要输错命令，如果下载过Tomcat，在这里添加Tomcat的配置，不添加上面的这段配置也可以，注意上方也需要修改一部分，所以这里直接使用maven插件的方式运行。

![image-20240921214137735](imgs\image-20240921214137735.png)

![image-20240921214112126](imgs\image-20240921214112126.png)



这样我们一个初始的Springmvc框架就已经完成搭建了。直接启动，通过浏览器打开就可以看到我们刚刚写的内容了。

![image-20240921213707115](imgs\image-20240921213707115.png)

## 补充

这篇文章是搭建的一个基础框架，其中很多的注解都没有涉及到，需要了解其他注解的使用方法，结合使用才能更好的产出优秀的后端。

其他的内容就可以通过写的那个请求仿照完成。
