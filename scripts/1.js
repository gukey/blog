//��װnpm install --save shelljs ģ�飬����ģ�鰲װ��ɣ��� Hexo ��Ŀ¼�� scripts �ļ������½�һ��js�ļ����ļ�������ȡ�����û�� scripts Ŀ¼�����½�һ����
require('shelljs/global');

try {
	hexo.on('deployAfter', function() {//��deploy��ɺ�ִ�б���
		run();
	});
} catch (e) {
	console.log("������һ������<(��3��)> !����������Ϊ��" + e.toString());
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