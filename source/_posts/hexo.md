title: hexo博客同步部署上传
date: 2017-04-03 15:09:20
tags: 技术
categories: hexo
---
![](http://upload-images.jianshu.io/upload_images/811360-31e968ac19f8fe3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最近打算用`HEXO`写作博客，但是还是回到了之前的那个问题，如何解决不同PC端的写作问题，网上搜了很多，大部分都是用git上传到空间，在不同PC写作的时候下载下来，但是实现步骤当真是繁琐到不可思议，看了一会，就没有兴趣了，网上搜了很久，无意中看到一篇文章，解决了燃眉之急，不同于文章中所述，我只是用`NoodeJS`的`shelljs`模块在部署后加载了hexo b命令，实现了同步部署和备份功能，比起原文的中的繁琐设置和操作，更加的简单易用，实现了用`hexo d一个命令同步部署和备份source文件夹`到你的git仓库里面，当在不同PC写作，用`git clone  仓库地址`下载即可,废话不多或，直接上干货。

![](http://upload-images.jianshu.io/upload_images/811360-136f1c0598e572fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.首先安装hexo，然后安装备份插件：

if version is 3.x.x, you should install as follow:
```
npm install hexo-git-backup --save
```

[作者-Github](https://github.com/coneycode/hexo-git-backup)

2.安装后打开hexo主目录的`_config.yml文件`，在最下面添加如下设置：
```
backup:
    type: git
    repository:
       github: git@github.com:XXX/blog.git   (此处为你自己的仓库地址)
```

3.安装`shelljs`模块，实现自动部署，在命令中键入以下命令：
```
npm install --save shelljs
```

4.在`.gitignore`文件中添加如下内容
```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
node_modules/
themes/
scaffolds/
.gitignore
package.json
_config.yml
gihub.txt
npm-install/
scripts/
```
### 编写自动备份脚本

待到模块安装完成，在 Hexo 根目录的 `scripts文件夹`下新建一个 `js文件`，文件名随意取。

### 如果没有 scripts 目录，请新建一个。

然后在脚本中，写入以下内容：
```
try {
	hexo.on('deployAfter', function() {//当deploy完成后执行备份
		run();
	});
} catch (e) {
	console.log("产生了一个错误<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
	if (!which('git')) {
		echo('Sorry, this script requires git');
		exit(1);
	} else {
		echo("==================Auto Backup Begin==============================");
		if (exec('hexo b').code !== 0) {
			echo('Error: Git add failed');
			exit(1);
		}
		echo("==================Auto Backup Complete============================")
		echo("==================Auto Backup Complete============================")
	}
}
```

现在你可以试试，命令中键入以下命令：
```
hexo clean && hexo g && hexo d
```

>即可实现hexo博客文章的`部署和同步上传功能`，只需要敲一次命令就能完成两功能.