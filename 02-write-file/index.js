const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);

function writeToStream(data) {
    writeStream.write(data);
}

stdin.setEncoding('utf8');

stdout.write('Введите текст (для завершения введите "exit" или Ctrl + C):\n');

stdin.on('data', (data) => {
    if (data.trim().toLowerCase() === 'exit') {
        process.exit();
    }
    writeToStream(data);
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', () => stdout.write('Спасибо, текст записан. Всего хорошего!'));
