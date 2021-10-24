import { convert_notebooks } from './convert_notebooks';
import { ncp } from 'ncp';
import * as fs from 'fs';
import * as util from 'util';

async function existsDir(dir: string): Promise<boolean> {
    try {
        return (await fs.promises.stat(dir)).isDirectory();
    }
    catch (err) {
        return false;
    }
}

async function build_notebook() {
    try {
        if (await existsDir('blog/notebook')) {
            await fs.promises.rm('blog/notebook', { recursive: true, force: true });
        }
        await fs.promises.mkdir('blog/notebook');
        if (await existsDir('notebook/imgs')) {
            await util.promisify(ncp)('notebook/imgs', 'blog/notebook/imgs');
        }
        await convert_notebooks();
    } catch (e) {
        console.log(e);
    }
}

build_notebook();
