const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const matter = require('gray-matter');

const from_dir = 'notebook/';
const to_dir = 'blog/notebook/';

async function exec_worker(command, out_prefix) {
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

async function convert_one_file(filename, index) {
    const fullname = path.join(from_dir, filename);
    const command = `jupyter nbconvert ${fullname} --to markdown --output-dir ${to_dir}`;
    const target_file = path.join(to_dir, path.basename(filename, '.ipynb') + '.md');

    console.log(`[${index}] Converting "${filename}"...`);
    console.log(`Command: ${command}`);
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
        console.log(`[${index}] New matter: ${JSON.stringify(file.data)}`);
        fs.promises.writeFile(target_file, file.stringify());
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

module.exports = convert_notebooks;