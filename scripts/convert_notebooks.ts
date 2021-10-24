import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import matter from 'gray-matter';

const from_dir = 'notebook/';
const to_dir = 'blog/notebook/';
const source_dir = 'https://github.com/wenjinghuan999/wenjinghuan-cn/blob/main/notebook/';

async function exec_worker(command: string, out_prefix: string) {
    return new Promise((resolve, reject) => {
        try {
            const proc = child_process.exec(command);
            proc.stdout.on('data', (stdout) => {
                stdout.trimEnd().split('\n').forEach(line => {
                    console.log(`${out_prefix} ${line}`);
                });
            })
            proc.stderr.on('data', (stderr) => {
                stderr.trimEnd().split('\n').forEach(line => {
                    console.error(`${out_prefix} ${line}`);
                });
            })
            proc.on('close', (code) => {
                resolve(code);
            })
        } catch (e) {
            reject(e);
        }
    });
}

async function convert_one_file(filename: string, index: number) {
    const fullname = path.join(from_dir, filename);
    const command = `jupyter nbconvert ${fullname} --to markdown --output-dir ${to_dir}`;
    const target_file = path.join(to_dir, path.basename(filename, '.ipynb') + '.md');

    console.log(`[${index}] Converting "${filename}"...`);
    console.log(`[${index}] Command: ${command}`);
    try {
        const code = await exec_worker(command, `[${index}]`);
        console.log(`[${index}] Finished converting to "${target_file}". Returned ${code}.`);
    } catch (e) {
        console.error(`[${index}] ${e}`);
        return;
    }

    console.log(`[${index}] Injecting front matter to "${target_file}"...`);
    try {
        const file = matter(await fs.promises.readFile(target_file));
        console.log(`[${index}] Original matter: ${JSON.stringify(file.data)}`);
        if (file.data['tag'] === undefined) {
            file.data['tag'] = ['Notebook'];
        } else if (Array.isArray(file.data['tag'])) {
            file.data['tag'].push('Notebook');
        } else {
            file.data['tag'] = [file.data['tag'], 'Notebook'];
        }
        file.data['editLink'] = false;
        console.log(`[${index}] New matter: ${JSON.stringify(file.data)}`);
        file.content += `
:::slot content-bottom
<div class="page-meta">
    <div class="edit-link">
        <a href="${source_dir}${filename}" target="_blank" rel="noopener noreferrer">查看原始Notebook</a>
    </div>
</div>
:::
`
        fs.promises.writeFile(target_file, file.stringify(''));
    } catch (e) {
        console.error(`[${index}] ${e}`);
        return;
    }

    console.log(`[${index}] Done converting ${filename}.`);
}

async function convert_notebooks() {
    try {
        const filenames = await fs.promises.readdir(from_dir);
        filenames.forEach((filename, index) => {
            if (path.extname(filename) === '.ipynb') {
                convert_one_file(filename, index);
            }
        })
    } catch (e) {
        console.error(e);
    }
}

export { convert_notebooks }