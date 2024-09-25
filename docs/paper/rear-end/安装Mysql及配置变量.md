# 安装Mysql及配置变量

给重装过电脑的人使用。

## 下载MySQL

这里不使用主动安装程序，因为我看他是32位，有点膈应，所以这里通过官方的zip下载，[点击跳转](https://dev.mysql.com/downloads/mysql/)。

![image-20240925085550882](imgs\image-20240925085550882.png)

点击上方的`Archives`进行版本选择，截至本文档日期，最好的版本是8.0.24，所以选择这个版本，根据实际情况进行选择下载即可。

![image-20240925085629031](imgs\image-20240925085629031.png)

下载完成后将其解压并移动到想要安装的位置。

## 配置环境变量

在环境变量中，新建一个系统变量，命名为`MYSQL_HOME`，变量值设置为我们安装的路径，这里一定不要写错了。

![image-20240925090110136](imgs\image-20240925090110136.png)

找到我们的系统变量中的Path变量，双击进行修改，在最后一行进行双击，这里直接将这个复制下来进行粘贴就完事了。

```txt
%MYSQL_HOME%\bin
```

![image-20240925090224274](imgs\image-20240925090224274.png)

接下来在我们mysql的安装路径下新建一个`my.ini`，记得要显示文件拓展名，不然你创建的就是一个文本文件。

![image-20240925090634006](imgs\image-20240925090634006.png)

右键用编辑器打开，将下面这段内容添加到其中，并且根据相关的注释进行修改。

```ini
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录   ----------是你的文件路径-------------
basedir=E:\\mysql-8.0.24-winx64
# 设置mysql数据库的数据的存放目录  ---------是你的文件路径data文件夹自行创建
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
datadir=E:\\Mysql DB
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。
max_connect_errors=10
# 服务端使用的字符集默认为utf8mb4
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
```



## 启动Mysql



以管理员身份运行CMD，将其定为到我们mysql的安装路径下的bin目录中，运行下面这段代码。

**一定要用管理员身份，不然会报错**

```shell
mysqld --initialize --console
```

![image-20240925092055280](imgs\image-20240925092055280.png)

运行完成后，初始密码就会在控制台显示出来，例如我的密码就是冒号后面的这一部分，一定不要关闭CMD，这个东西只会在这里显示一次，可以保存下来，后面会用到`root@localhost: ;%o<Fevc5_lO`。

接下来继续运行下面这两行命令，看到例图所示效果即为成功。

```shell
mysqld install
```

```shell
net start mysql
```

![image-20240925092217566](imgs\image-20240925092217566.png)

之后可以使用用户CMD窗口运行，输入

```shell
mysql -u root -p
```

会提示你输入密码，这个时候我们就需要将刚才生成的初始化密码输入进去。能够进去就成功了。

![image-20240925092322150](imgs\image-20240925092322150.png)

## 修改初始密码

但是初始密码不好记，我们使用到的时候也不能随时随地的配置，所以在里面运行下面这条Sql语句。有Query OK字样代表成功。

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

![image-20240925092409764](imgs\image-20240925092409764.png)

我们可以通过退出数据库重新登陆的方式进行验证。

![image-20240925092456720](imgs\image-20240925092456720.png)



## 卸载Mysql

虽然是绿色版，但是在安装时会将注册表进行写入，删除时候要卸载服务和注册表。

注册表位置`\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\services\eventlog\Application\MySQLD Service`