# vitepress搭建并部署网站

## 准备工作

主要为pnpm和node之间的版本确定，其中如果需要部署到GithubPages为前提的情况下，请将node切换为20，目前github工作流使用的node版本已经修改为20。当然其中有配置是可以进行修改的，但是太多了我也看不懂。

![image-20240920201013657](imgs\vitepress搭建并部署网站\image-20240920201013657.png)

## 创建项目

首先，新建文件夹，打开对应的cmd窗口

```shell
pnpm add -D vitepress
```

初始化vitpress

```shell
pnpm vitepress init
```

初始化的配置可以参考我下面这个图。

- 第一项是说明在哪里进行初始化的

- Theme选择第二项
- TypeScript个人觉得没有什么加的必要
- 其他的都按照默认走就可以，可以在配置中修改

![image-20240920203818232](imgs\vitepress搭建并部署网站\image-20240920203818232.png)

## 配置项目

之后将cmd窗口关闭，将初始化好的文件夹拖入IDE中，这里使用的是WebStorm，当然以VSCode打开也是没有问题的。

初始化完毕的文件结构是这样的。

![image-20240920204517563](imgs\vitepress搭建并部署网站\image-20240920204517563.png)

在软件内部或者cmd窗口中输入下面这段脚本让整个项目运行起来。

```shell
pnpm run docs:dev
```

可以看到运行起来的页面是这样的

![image-20240920205140990](imgs\vitepress搭建并部署网站\image-20240920205140990.png)

### 主页美化

首先将我们的文件定位到 `index.md` 中。

关于主页之间的大部分美化都是在`index.md`文件中的。

![image-20240920205259632](imgs\vitepress搭建并部署网站\image-20240920205259632.png)

在hero中，不难看出前三个属性对应的是我们的网站首页的三行大字，将其修改后就能直接在页面中显示。action中的内容则是三行大字下的按钮，其中也有很多样式可以进行选择，这里比较常用的就是brand、alt两种，text则是修改按钮上显示的文字，link则是修改链接的地址。

下面是修改之后的展示内容。

![image-20240920205912867](imgs\vitepress搭建并部署网站\image-20240920205912867.png)

features控制的则是标题下方的小方块中间的字，修改后会改变显示内容。需要注意的是这里不代表只能有三个在这里，需要增加减少按照格式进行即可。

![image-20240920211007180](imgs\vitepress搭建并部署网站\image-20240920211007180.png)

当然，这里配置好后会觉得右边非常的空旷，这个时候我们可以打开[iconfont](https://www.iconfont.cn/)进入查找一个免费的矢量图导出，然后放到我们的项目当中。

这里建议将全部的图片在根目录下创建一个public文件，将图片放到当中方便管理。

在hero下的tagline下方添加配置

```md
  image: 
    src: /background.png
    alt: 背景图
```

![image-20240920214447635](imgs\vitepress搭建并部署网站\image-20240920214447635.png)

再次打开网页就变成了现在这个样子，到现在我们的网站首页就已经美化完毕。

### 页面导航栏美化

在配置`index.md`中，我们能够做的配置已经修改完毕，接下来我们将目光重新锁定到`.vitepress/config.mjs`文件中。

![image-20240920211250308](imgs\vitepress搭建并部署网站\image-20240920211250308.png)



首先是title和description属性。title可以直接将左上角的标题进行修改。description是网站的描述，但是看过之后似乎没有地方受到影响，也就无所谓了。之后是想要给页面标签栏添加icon，在title的同级添加属性

```
head: [['link', {rel: 'icon', href: '/logo.png'}]]
```

接下的配置将进入下面的`themeConfig`属性，都需要配置到与nav平级的地方。

然后是与页面左上角的标题一起的icon，为其添加属性

```
logo: 图片位置
```

![image-20240920215342185](imgs\vitepress搭建并部署网站\image-20240920215342185.png)

这里的`nav`一眼就知道是配置导航栏的，一个标签直接使用link导航，如果有下级标签请使用items属性，将他们全部放到当中去。注意这里的link是可以配置https网站的，可以链接到站外。

![image-20240920215933947](imgs\vitepress搭建并部署网站\image-20240920215933947.png)

![image-20240920215715948](imgs\vitepress搭建并部署网站\image-20240920215715948.png)

这里是一个非常重要的地方，首先需要了解vitepress的工作原理，简单来说就是在vitepress编译的时候，会将全部的md文件转化为html，而文件路径就是对应的路由地址，如果/下面没有任何东西，他会自动选择`index.md`作为页面导航，因此在每个页面的文件下建议都有一个`index.md`文件。

![image-20240920221430621](imgs\vitepress搭建并部署网站\image-20240920221430621.png)

虽然个人认为不是最规范的，但是使用起来确实没啥毛病，也方便文件的管理。

接下来就是我们的社交链接，这里如果是国外的大型网站基本上直接输入名字就可以看见了，但国内是基本没有的，但是我们也有解决方案，通过iconfont网站上直接进行搜索就可以，将svg代码进行传递即可，下面会给一个模板。

![image-20240920220159826](imgs\vitepress搭建并部署网站\image-20240920220159826.png)

```
socialLinks: [
            {
                icon: {
                    svg:`<svg></svg>`
                }, link: 'https://space.bilibili.com'
            },
            {icon: 'github', link: 'https://github.com/'},
        ],
```

导航栏这里也配置完毕了，已经完成一大半恭喜恭喜！接下来我们进入一些更加细节的配置

### 配置页底

在`themeConfig`属性下，`nav`同级的位置添加版权信息。

```
      footer: {
            copyright: 'Copyright © 2022-present Matsu'
        }
```

![image-20240920220929640](imgs\vitepress搭建并部署网站\image-20240920220929640.png)

这个配置非常简单，可以根据自身情况选择是否添加。

### 为页面添加搜索框

将下面这段代码复制到与`nav`平级的位置即可，可以参考页面进行定制。

```
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            }
        },
```

### 修改三栏配置

三栏配置和两栏配置其实本质上的区别不大，如果是三栏，那么导航栏的items就会变少，而相反，两栏是items会增多。

![image-20240920221646340](imgs\vitepress搭建并部署网站\image-20240920221646340.png)

如果想要关闭绿色区域部分，只需要进行将`themeConfig`属性下的`sidebar`设置为false即可。

```
sidebar: false
```

如果想红色区域在左边，只需要进行将`themeConfig`属性下的`aside`设置为left即可。

```
aside: 'left'
```

针对于红色部分，如果我们想要修改页面导航的名称，只需要在`themeConfig`属性下添加属性。

```
outlineTitle: '文章目录',
outline: [2, 6]
```

对于`outline`属性进行说明，这个是md文档的几级标题会显示在文档目录中，现在这个设置的意义就是，一级标题不在目录中显示，二级到六级标题会显示在文档目录之中。

后面的配置都是我个人喜好，也可以根据自身喜好进行定制。

[VitePress参考文档](https://vitepress.dev/zh/guide/what-is-vitepress)

## 部署到Github Pages

别问为什么不放到gitee pages上面去，访问速度还快一点。

![image-20240920222927343](imgs\vitepress搭建并部署网站\image-20240920222927343.png)

问题是我也得能用啊，感觉是因为不赚钱（小声bb

`接下来的操作都需要使用到git，未安装git请先查阅相关教程！！！`

首先在github上面创建一个public仓库，名字都是随便的。看不懂也没必要看懂，你只需要输入一个仓库名，然后确保你的仓库是public的就可以点绿色的按钮了。

![image-20240920223142050](imgs\vitepress搭建并部署网站\image-20240920223142050.png)

- 执行初始化仓库

```bash
git init
```

- 添加gitignore文件

```text
node_modules
.DS_Store
dist
dist-ssr
cache
.cache
.temp
*.local
```

- 添加本地所有文件到git仓库

```bash
git add .
```

- 第一次提交

```bash
git commit -m "first commit"
```

- 将远程仓库添加到本地

```bash
git remote add origin git@github.com:MatsuzawaTensho/demo.git
```

- 推送项目到github

```bash
git push -u origin master
```

- 选择github actions

![image-20240920224144137](imgs\vitepress搭建并部署网站\image-20240920224144137.png)

- 设置工作流

![image-20240920224351860](imgs\vitepress搭建并部署网站\image-20240920224351860.png)

- 重命名并设置deploy脚本

脚本文件：参考的vitepress官方文档：https://vitepress.dev/guide/deploy#github-pages

这里直接给大家提供一个模板，参考注释，应该修改的地方直接修改。

```yml
name: Deploy VitePress site to Pages

on:
  push:
  # 主分支的名称，修改了的话这里也要改
    branches: [master]

# 设置tokenn访问权限
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - name: Setup pnpm
        uses: pnpm/action-setup@v2 # 安装pnpm并添加到环境变量
        with:
          version: 8.6.12 # 指定需要的 pnpm 版本
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm # 设置缓存
      - name: Setup Pages
        uses: actions/configure-pages@v3  # 在工作流程自动配置GithubPages
      - name: Install dependencies
        run: pnpm install # 安装依赖
      - name: Build with VitePress
        run: |
          pnpm run docs:build # 启动项目
          touch .nojekyll  # 通知githubpages不要使用Jekyll处理这个站点，不知道为啥不生效，就手动搞了
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2  # 上传构建产物
        with:
          path: .vitepress/dist # 指定上传的路径，当前是根目录，如果是docs需要加docs/的前缀

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }} # 从后续的输出中获取部署后的页面URL
    needs: build    # 在build后面完成
    runs-on: ubuntu-latest  # 运行在最新版本的ubuntu系统上
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment  # 指定id
        uses: actions/deploy-pages@v2 # 将之前的构建产物部署到github pages中
```

不要忘记修改名称，之后记得点击绿色按钮进行提交。

![image-20240920224804928](imgs\vitepress搭建并部署网站\image-20240920224804928.png)



- 之后等待部署完毕就可以访问了，如果出现了css样式丢失的情况，原因是因为没有.nojekyll这个文件，不然一些css会被忽略。在根目录下创建这个文件再push就好了。

![image-20240920225109784](imgs\vitepress搭建并部署网站\image-20240920225109784.png)

## 补充

### 样式修改不正确

想要修改样式，在`theme/style.css`文件最后进行添加，如果不生效可以加上!important，分享一段我自己使用的样式代码。

```css
/*md渲染部分*/
.VPDoc .container {
    margin: 0 auto !important;
}

@media (min-width: 960px) {
    .VPDoc:not(.has-sidebar) .content {
        max-width: 1400px !important;
    }
}

.VPDoc.has-aside .content-container {
    max-width: 1488px !important;
}

@media (min-width: 960px) {
    .VPDoc:not(.has-sidebar) .container {
        display: flex;
        justify-content: center;
        max-width: 1562px !important;
    }
}
.aside-container {
    position: fixed;
    top: 20px;
    width: 224px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
}

/*首页修改*/

.VPHome .container{
    //宽高扩大1.1
    width: 1400px !important;
    margin: 40px auto 10px;
}


.VPFeature:hover {
    border: 1px solid #3a5ccc;
}
    /*尾部修改*/
.VPFooter{
    height: 50px !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex;
    align-items: center;
    border-top:1px solid #eee ;
}
.VPFooter .container{
    line-height: 50px;
}

a{
    text-decoration: none !important;
}
```

### 自定义域名

在github pages的下面有一个Custom domain，将自己的域名通过C类域名解析到另一个地址，在这里进行保存，记得勾选上下面的HTTPS，不然在浏览器访问的时候会报不安全。

![image-20240920225621345](imgs\vitepress搭建并部署网站\image-20240920225621345.png)

### 结语

总体来说不难，但是需要修改的东西很多，非常需要耐心，还是挺好玩的。
