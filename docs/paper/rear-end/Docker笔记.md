# Docker笔记

## 安装yum工具报错

### 错误信息

运行的指令：

```shell
sudo yum install -y yum-utils
```

报错信息：`Cannot find a valid baseurl for repo: base/7/x86_64`

### 解决方案

[点击下载文件](http://mirrors.aliyun.com/repo/Centos-7.repo)

将下载的文件更名为`CentOS-Base.repo`后上传至`/etc/yum.repos.d/`目录

如果无法上传就使用root账户进行连接，不然权限不够是不允许上传的。

清理yum缓存

```shell
yum clean all
yum makecache
```

再次安装软件则正常，问题解决了

## 基础指令

```shell
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql:8.0.24
```

`docker run`：创建一个并运行一个容器，-d是让容器在后台运行

`--name mysql`：给容器起个名字，必须唯一

`-p 3306:3306`：设置端口映射

`-e KEY=VALUE`：是设置环境变量

`mysql:8.0.24`：指定运行的镜像的名字【镜像名字】:【版本号】

## Docker基础

### 常见命令

| **命令**       | **说明**                       |
| :------------- | :----------------------------- |
| docker pull    | 拉取镜像                       |
| docker push    | 推送镜像到DockerRegistry       |
| docker images  | 查看本地镜像                   |
| docker rmi     | 删除本地镜像                   |
| docker run     | 创建并运行容器（不能重复创建） |
| docker stop    | 停止指定容器                   |
| docker start   | 启动指定容器                   |
| docker restart | 重新启动容器                   |
| docker rm      | 删除指定容器                   |
| docker ps      | 查看容器                       |
| docker logs    | 查看容器运行日志               |
| docker exec    | 进入容器                       |
| docker save    | 保存镜像到本地压缩文件         |
| docker load    | 加载本地压缩文件到镜像         |
| docker inspect | 查看容器详细信息               |

### 添加别名

```shell
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"
```
这条命令太长了，输入当然也不想输入，这个时候我们就可以开始偷懒了，在root权限下输入

```shell
vi ~/.bashrc
```

添加行

```txt
alias dps='docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"'

```

刷新资源

```shell
 source ~/.bashrc
```

之后就可以使用`dps`执行命令。

### 数据卷

这个东西是一个虚拟目录，是容器内部与宿主机目录之间映射的桥梁。

| **命令**              | **说明**             |
| :-------------------- | :------------------- |
| docker volume create  | 创建数据卷           |
| docker volume ls      | 查看所有数据卷       |
| docker volume rm      | 删除指定数据卷       |
| docker volume inspect | 查看某个数据卷的详情 |
| docker volume prune   | 清除数据卷           |

查看某一个容器的数据卷详情

```shell
docker inspect 容器名
```

## 自定义镜像



























