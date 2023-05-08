const fs = require('fs/promises');
const path = require('path');

const sourceFilename = './04-copy-directory/files';
const destinationFilename = './04-copy-directory/files-copy';

async function createDestinationDirectory() {
    try {
        await fs.access(destinationFilename);
    } catch {
        await fs.mkdir(destinationFilename);
    }
}

async function copyDir(sourceFilename, destinationFilename) {
    try {
        await fs.mkdir(destinationFilename, { recursive: true });

        const files = await fs.readdir(sourceFilename);

        for (const file of files) {

            const sourcePath = path.join(sourceFilename, file);
            const destinationPath = path.join(destinationFilename, file);

            const stats = await fs.stat(sourcePath);

            if (stats.isDirectory()) {
                await copyDir(sourcePath, destinationPath);
            } else {
                await fs.copyFile(sourcePath, destinationPath);
            }
        }
        console.log(`Папка ${sourceFilename} успешно скопирована в ${destinationFilename}`);
    } catch (err) {
        console.error(`Не удалось скопировать папку ${sourceFilename}: ${err}`);
    }
}

async function main() {
    await createDestinationDirectory();
    await copyDir(sourceFilename, destinationFilename);
}

main();