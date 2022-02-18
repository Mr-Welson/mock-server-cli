const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const Creator = require('./Creator');

// 命令执行的目录
const cwd = process.cwd();

async function create(projectName, options) {
  const targetDir = path.join(cwd, projectName);

  // 判断目录文件是否存在
  if (fs.existsSync(targetDir)) {
    if (!options.force) {
      // 存在且不强制创建
      const result = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continue',
          message: `Target directory ${chalk.cyan(
            targetDir
          )} already exists. whether continue ?`,
        },
      ]);
      if (!result.continue) {
        console.log('文件夹已存在, 停止创建项目');
        return;
      }
    }
    await fs.remove(targetDir);
  }

  const creator = new Creator(projectName, targetDir);
  const tplDir = 'subproject';
  await creator.create(options, tplDir);
}

const asyncCreate = (...args) => {
  return create(...args).catch((err) => {
    console.log('Error: ', err);
    process.exit(1);
  });
};

module.exports = asyncCreate;
