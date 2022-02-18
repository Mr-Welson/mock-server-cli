const fs = require('fs-extra');
const path = require('path');

class Creator {
  constructor(name, targetDir) {
    // super();
    this.name = name;
    this.targetDir = targetDir;
  }

  getTplPath() {
    return path.resolve(__dirname, '../template');
  }

  async create(options, tplDir) {
    const sourceDir = path.join(this.getTplPath(), tplDir);
    try {
      await fs.copy(sourceDir, this.targetDir);
      console.log('success!');
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Creator;
