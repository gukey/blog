var spawn = require('child_process').spawn;

hexo.on('new', function(data){
  spawn('Notepad.exe', [data.path]);
});

