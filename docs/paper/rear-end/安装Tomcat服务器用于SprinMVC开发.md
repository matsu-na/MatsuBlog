# 安装Tomcat服务器用于SprinMVC开发

## 前言

SpringMVC与SpringBoot不同，SpringBoot中已经内部集成了Tomcat，所以在运行的时候不需要到Tomcat中去，SpringMVC就必须到Tomcat中去运行，不然你也不知道怎么去运行。

## 安装Tomcat

首先到[Tomcat官网](https://tomcat.apache.org/)下载Tomcat

![image-20240921194934848](imgs\image-20240921194934848.png)

这边是对应的Tomcat的几个大版本，选择什么并不重要，我这里是8.0版本，但是影响不大。其中操作完全一致。

![image-20240921195219771](imgs\image-20240921195219771.png)

如果是32位操作系统就选择上面的那个文件进行下载，不过现在的电脑基本上都是64位了。下载完成，将其解压后移动到自己想要安装的位置。

这样就算安装完成了。

## 在IDEA中配置Tomcat

每次需要将SpringMVC项目进行打包后的文件移动到Tomcat的运行安装包下面，这样就显得有点麻烦，不想开发了，所以这里将Tomcat配置到IDEA中去，从IDEA中进行启动。

打开已经完成的SpringMVC项目，在右上角编辑配置。

![image-20240921200026695](imgs\image-20240921200026695.png)

点击添加配置，选择Tomcat本地服务

![image-20240921200122302](imgs\image-20240921200122302.png)

选中添加后的Tomcat，点击配置，选择刚刚移动的Tomcat的主目录，全部点击完成。

![image-20240921200400848](imgs\image-20240921200400848.png)

在上方将配置内容切换到部署，点击添加工件。

![image-20240921200521359](imgs\image-20240921200521359.png)

在弹出的窗口中选择第二个，完成我们的配置。

![image-20240921200612882](imgs\image-20240921200612882.png)

点击运行，等待Tomcat操作，我们就可以在浏览器中看到我们编辑好的项目了。

![image-20240921200947142](imgs\image-20240921200947142.png)

![image-20240921201030969](imgs\image-20240921201030969.png)

## 补充

我们可以看到，在控制台的运行中，他红色的提示后面除了英文全是乱码，这个时候我们就需要打开Tomcat的文件夹，在conf文件下的`logging.properties`找到这段代码，将最后的编码改为GBK。

```properties
java.util.logging.ConsoleHandler.encoding = UTF-8
```

![image-20240921201516122](imgs\image-20240921201516122.png)

重启项目后可以看见控制台的信息我们也能看懂了，不再是乱码的形式。

![image-20240921201741364](imgs\image-20240921201741364.png)