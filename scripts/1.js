//安装npm install --save shelljs 模块，待到模块安装完成，在 Hexo 根目录的 scripts 文件夹下新建一个js文件，文件名随意取。如果没有 scripts 目录，请新建一个。
require('shelljs/global');

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