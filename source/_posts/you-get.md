title: you-get视频下载器单文件版
date: 2017-07-10 13:59:59
tags: 技术
categories: you-get
---
![](http://7xr8tf.com1.z0.glb.clouddn.com/blog/20170710/143801301.png)

You-Get是一个基于 `Python 3` 的下载工具。使用 You-Get 可以很轻松的下载到网络上的视频、图片及音乐，值得幸运的是官方也提供了基于Windows系统的EXE可执行文件，本次下载器就是基于Windows版本制作的，特点是使用极其简单，方便，不用安装环境，一键运行就能下载使用，而且下载后会将合并完成的 `.flv`文件一键无损的转换为 `.mp4`文件。

<!--more-->

![](http://7xr8tf.com1.z0.glb.clouddn.com/blog/20170710/143720951.gif)

>项目主页：https://github.com/soimort/you-get
You-Get 主页：https://you-get.org/
You-Get 原版中文说明：https://github.com/soimort/you-get/wiki/中文说明/
**作者：soimort**

在windows下直接运行可执行文件是不能下载的，他是一个命令行工具，需要在DOS下使用，对于很多人来说，直接就增加了使用成本，直接放弃了，而对于这个问题，个人想到最简单的办法就是使用批处理直接调运you-get.exe文件下载视频网址（默认下载格式为 `高清`），然后将下载的文件保存在桌面的视频下载文件夹，并根据下载的文件自动重命名视频文件，等视频下载后(下载的视频一般为分段文件，在下载好之后会自动合并)，用 `FFmpeg`转换为MP4格式，由于是无损转换，速度极快，几秒之内就能完成，非常方便。

等.MP4文件转换完成后，自动删除.flv文件，并自动清空当前网址视频下载信息，初始化下载界面，如果你关闭you-get视频下载工具，软件会知道删除TEMP下解压的相关文件，不留任何垃圾文件。

说完了思路，来看看具体如何实现，以下是个人编辑的一个批处理源代码（调运文件为you-get.exe，FFmpeg.exe）：

``` bat
@echo off
::标题
title 极速视频下载简化版
::窗口大小
mode con cols=80 lines=28  
::颜色
color 0a
:ok
echo.
echo.
echo.
echo.
echo.
set /p name=请输入网址：
echo.
echo.
echo.
echo.
::调运you-get.exe下载，并转换成mp4文件，转换完成后转到开始下载页面。
cd %temp%
you-get.exe -o C:\Users\Administrator\Desktop\视频下载 %name%
cd C:\Users\Administrator\Desktop\视频下载  
for /r .\ %%i in (*.flv)do %temp%\ffmpeg.exe -i "%%i" -c:v copy -an "%%~dpni.mp4
@del /f /s /q *.flv
timeout /t 1
cls
goto ok
```

上面这个代码是you-get下载视频的源代码，通过这个代码，可以调运you-get进行视频下载和转换视频文件，但在退出之后无法删除you-get释放的残留问题，因此采用AU3来解决垃圾清除的问题，默认you-get会将相关文件解压到 `temp`临时文件夹内,因为要制作单文件下载器，所以在此使用AU3脚本工具，可以实现将you-get、FFmpeg、清除脚本打包成一个文件，最后执行清除指令，源码如下：
``` au3
#Region ;**** 参数创建于 ACNWrapper_GUI ****
#PRE_Icon=..\3.ico
#PRE_UseUpx=n
#PRE_UseX64=n
#PRE_Res_Description=极速视频下载器
#PRE_Res_Fileversion=1.0.0.0
#PRE_Res_LegalCopyright=孤独剑
#PRE_Res_requestedExecutionLevel=None
#EndRegion ;**** 参数创建于 ACNWrapper_GUI ****
RunWait(@TempDir&"\yg.exe")
FileDelete(@TempDir&"\yg.exe")
FileDelete(@TempDir&"\you-get.exe")
FileDelete(@TempDir&"\ffmpeg.exe")
FileDelete(@TempDir&"\get.exe")
Run(@ComSpec & ' /c cd.. & ping 127.0.0.1 -n 2&rd /q/s "' & @ScriptDir & '"', @ScriptDir, @SW_HIDE)
Exit
```

说明：其中Run命令为清空tmpe文件夹下的缓存文件，调试的时候请在文件夹内使用，防止文件全部删除！

![](http://7xr8tf.com1.z0.glb.clouddn.com/blog/20170710/144233165.png)

通过以上步骤，就可以轻松制作一个专属自己的视频下载器了！