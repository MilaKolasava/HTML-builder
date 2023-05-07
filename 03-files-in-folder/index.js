const fs = require('fs/promises');
const path = require('path');

async function listFiles(dir) {
    const files = await fs.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile()) {
            const ext = path.extname(file).substring(1);
            const name = path.parse(file).name;
            const size = stats.size;
            console.log(`${name} - ${ext} - ${size} bytes`);
        }
    }
}

listFiles('./03-files-in-folder/secret-folder');

