title: hexo new 后同步打开文章编辑器
date: 2017-07-10 12:11:23
tags: 技术
categories: HEXO
---

HEXO用久了，每次写文章是很让人痛苦的事情，你需要在一大堆文章中找你刚新建的文件，少了无所谓，多了就很痛苦了，于是网上搜了下HEXO同步打开新建markdown文章的设置，但是很多都不是很管用，你在你的 `scripts`下js文件设置的参数无效，在github偶然看到一个朋友分享的方案，简单直接，可以实现新建markdown文件的时候自动打开新建文件，本文就是以这种方式编辑的。

![](http://7xr8tf.com1.z0.glb.clouddn.com/blog/20170710/122810026.png)

<!--more-->

1、首先确认自己的 `HEXO版本`,输入： **`hexo version`**,以下是我的版本！

![](http://7xr8tf.com1.z0.glb.clouddn.com/blog/20170710/121915835.png)

2、安装 **`shelljs`**模块，实现自动部署加载JS脚本，键入以下命令：
```
npm install --save shelljs
```

**编写自动备份脚本**

3、待到模块安装完成，在 Hexo 根目录的 `scripts文件夹`下新建一个 `js文件`，文件名随意取。然后在脚本中，写入以下内容：
```
var spawn = require('child_process').spawn;

hexo.on('new', function(data){
  spawn('Notepad.exe', [data.path]);
});

```

因为我用的编辑器为加强版的 **Notepad2**，在Windows目录下，可以直接通过文件名打开，如果编辑器在其他位置，那么路径一般为： `C:\Program Files\XXX\XXX.exe`,自己根据实际情况设置。

4、现在你可以试试，键入命令： **hexo n test**  ，会自动打开新建的 `markdown文件。`