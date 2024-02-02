const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error reading file: ${err.code} - ${err.path} not found`);
            } else {
                console.error(`Error reading file: ${err.message}`);
            }
        } else {
            console.log('File Content:');
            console.log(data);
        }
    });
}
readFileContent('C:/Users/josep/30 Days of Node JS/Day1/Textfile.txt');

