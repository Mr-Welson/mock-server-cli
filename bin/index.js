#! /usr/bin/env node

const program = require('commander');
const packageJson = require('../package');

function checkNodeVersion() {}

program
  .name('ms')
  .version(packageJson.version, '-v, --version')
  .usage('<command> [options]')
  .description('mock-server-cli is a mock-api service based Koa2 and mock.js');

program
  .command('create <project-name>')
  .description('创建一个带有 package.json 文件的新项目')
  // .option('-p, --port', '服务启动的端口')
  .option('-f, --force', '如果目标文件夹已存在, 会先清空然后创建新项目')
  // .option('-i, --install', '是否需要自动安装依赖包')
  .action((name, options) => {
    require('../lib/create')(name, options);
  });

program
  .command('init <project-name>')
  .description('只下载 mock-server 相关的文件, 没有 package.json')
  // .option('-p, --port', '服务启动的端口')
  .option('-f, --force', '如果目标文件夹已存在, 会先清空然后创建新项目')
  .action((name) => {
    const options = program.opts();
    require('../lib/init')(name, options);
  });

program.parse(process.argv);
