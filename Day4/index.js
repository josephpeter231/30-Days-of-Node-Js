const path = require('path');

function resolvePath(relativePath) {
    const currentWorkingDirectory = process.cwd();
    const absolutePath = path.resolve(currentWorkingDirectory, relativePath);
    console.log('Resolved Path:', absolutePath);
}

resolvePath('../project/folder/file.txt');
resolvePath('nonexistent-folder/file.txt');

