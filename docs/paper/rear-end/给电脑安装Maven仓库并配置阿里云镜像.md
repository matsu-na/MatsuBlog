# 给电脑安装Maven仓库并配置阿里云镜像

## Maven工作原理

![image-20240921113429517](imgs\image-20240921113429517.png)

这个的意思就是maven会将你需要用到的jar包全部下载到本地maven仓库，并进行一个统一的存储和管理，当在你的配置文件中使用到一个jar包，但是在你的仓库中是没有这个jar包的，maven就会到镜像服务器中去查询这个jar包，在镜像服务器中查询到了这个jar包，他就会下载下来并且保存到本地仓库，这样就不会导致每次使用到这个jar包的时候都需要进行下载，而是直接使用仓库中的jar包。如果没有找到对应的jar包，他就会前往中央仓库进行下载，几乎全部的jar包都被保存在这个地方。

## 下载Maven

浏览器直接搜索maven就可以看到，也可以点击这个蓝色的[maven](https://maven.apache.org/)进行跳转。

![image-20240921114144060](imgs\image-20240921114144060.png)

在侧边栏中找到Download进行跳转

![image-20240921114319447](imgs\image-20240921114319447.png)

在跳转后的页面中点击红色方框的内容进行下载，这里Maven的版本的影响并不大，所以打开不管是什么版本都可以直接下载。

![image-20240921114607434](imgs\image-20240921114607434.png)

下载完成后解压，将文件移动到你想要安装的地址就安装完成，接下来我们需要对Maven进行一些配置，使其能够在我们的项目中正常工作。

## Maven配置

### 配置环境变量（非必须）

右键此电脑–>属性–>高级系统设置–>环境变量

![image-20240921115253531](imgs\image-20240921115253531.png)

点击新建，变量名填写`MAVEN_HOME`，变量值选择浏览目录，找到刚刚解压好的maven地址，点击保存。

![image-20240921115724687](imgs\image-20240921115724687.png)

接下里找到系统变量里面的Path变量进行双击打开，点击新建一个环境变量，填写

```txt
%MAVEN_HOME%\bin
```

之后再点击确定关闭到全部的窗口。

![image-20240921120059085](imgs\image-20240921120059085.png)

使用`win+R`打开命令行窗口，输入代码进行验证是否出现信息，出现信息说明配置成功。

```shell
mvn -v
```

![image-20240921120348429](imgs\image-20240921120348429.png)

### 配置本地仓库地址

- 我喜欢直接在maven的目录之下新建一个`repository`文件夹直接当作我的仓库

![image-20240921120801999](imgs\image-20240921120801999.png)

然后找到conf文件下的`settings.xml`，右键使用编辑器打开，这里建议使用VsCode，如果没有安装的可以使用记事本打开。

![image-20240921120729405](imgs\image-20240921120729405.png)

使用`Ctrl+F`使用快捷查找，输入

```txt
<localRepository>/path/to/local/repo</localRepository>
```

在下方添加一行，将标签的内容修改为你的仓库地址，为了防止出现错误，建议使用绝对路径。

```txt
<localRepository>E:\apache-maven-3.9.5\repository</localRepository>
```

![image-20240921121208462](imgs\image-20240921121208462.png)

之后将搜索的内容修改为

```txt
<id>maven-default-http-blocker</id>
```

在他相同的位置添加配置，注意这里的配置一定要添加到mirrors标签内部，不要写错位置了。

```xml
    <mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
    </mirror>
```

![image-20240921121458345](imgs\image-20240921121458345.png)

之后就是保存关闭了。

注意：这里只是配置了最基础的两个选项，但是已经足够使用了，如果想要配置更加详细，可以参考官方文档。

## 在IDEA中配置Maven

从此处打开idea设置

![image-20240921122454483](imgs\image-20240921122454483.png)

在搜索框的位置输入maven，将图中框选位置的maven进行修改，要勾选重写后才能选择路径。之后点击应用和确定，完成我们的配置。

![image-20240921122625182](imgs\image-20240921122625182.png)

## 总结

- 配置总是容易写在外面，用vscode打开有颜色提示，尽量还是使用有颜色提示的编辑器去编辑`settings.xml`吧。
- 下载maven的时候不要点错了，其他包有些不一样。
