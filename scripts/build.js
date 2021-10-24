const convert_notebooks = require('./convert_notebooks.js');
const ncp = require('ncp');
const fs = require('fs');

async function build_notebook() {
    try {
        const stat = await fs.promises.stat('blog/notebook');
        if (stat.isDirectory()) {
            await fs.promises.rm('blog/notebook', { recursive: true, force: true });
        }
    } catch (e) {
        console.log(e);
    }
    await fs.promises.mkdir('blog/notebook');
    ncp('notebook/imgs', 'blog/notebook/imgs');
    await convert_notebooks();
}

build_notebook();