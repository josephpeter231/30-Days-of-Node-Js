const { exec } = require('child_process');

function executeCommand(command) {
    const isWindows = process.platform === 'win32';

    if (isWindows && command.startsWith('ls')) {
        command = 'dir /B';
    }
    exec(command, { shell: isWindows ? 'cmd.exe' : '/bin/bash' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }

        console.log(`Command Output:\n${stdout.trim()}`);
    });
}

// Test Cases
executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');
