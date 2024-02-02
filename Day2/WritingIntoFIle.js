const fs = require('fs');

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}


writeToFile('test-files/output1.txt', 'This is the day2 for Learning to Code in Node JS');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');

