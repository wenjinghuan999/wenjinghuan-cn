import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Client, IScpOptions, ScpClient } from 'node-scp';
import SSHConfig from 'ssh-config';
import packageJson from '../package.json';

async function existsFile(file: string): Promise<boolean> {
    try {
        return (await fs.promises.stat(file)).isFile();
    }
    catch (err) {
        return false;
    }
}

async function findHost(): Promise<string> {
    if (packageJson.homepage === undefined) {
        throw 'Config "homepage" in your package.json!';
    }
    return packageJson.homepage;
}

async function getOptions(): Promise<IScpOptions> {
    const configFile = path.join(os.homedir(), '.ssh', 'config');
    const hostname = await findHost();
    if (existsFile(configFile)) {
        const configFileContent = await fs.promises.readFile(configFile);
        const config = SSHConfig.parse(configFileContent.toString());
        const section = config.find({ Host: hostname });
        if (!section) {
            throw (`Host "${hostname}" does not exist in "${configFile}".`);
        }
        let options: IScpOptions = {};
        for (const line of section.config) {
            switch (line.param) {
            case 'HostName':
                options.host = line.value;
                break;
            case 'Port':
                options.port = line.value;
                break;
            case 'User':
                options.username = line.value;
                break;
            case 'Password':
                options.password = line.value;
                break;
            case 'IdentityFile':
                options.privateKey = line.value;
                break;
            }
        }
        return options;
    } else {
        throw ('SSH config does not exist! Create "~/.ssh/config" and add host "${hostname}".');
    }
}

async function connect(): Promise<ScpClient> {
    const options = await getOptions();
    console.dir(options);
    if (typeof(options.privateKey) === 'string') {
        let file = options.privateKey;
        file = file.replace(/^~/, os.homedir());
        console.log(`Reading private key from ${file}`);
        options.privateKey = await fs.promises.readFile(file);
    }
    console.log('Connected.');
    const client = await Client(options);
    return client;
}

async function emptyDir(client: ScpClient, remotePath: string) {
    const exists = await client.exists(remotePath);
    if (exists) {
        const files = await client.list(remotePath);
        for (const file of files) {
            console.log(`Removing ${file.name}`);
            if (file.type === 'd') {
                await client.rmdir(remotePath + file.name)
            } else {
                await client.unlink(remotePath + file.name)
            }
        }
    }
}

async function deploy() {
    let client: ScpClient | null = null;
    try {
        console.log('Connecting...');
        client = await connect();
        console.log('Emptying remote dir...');
        await emptyDir(client, './web/');
        console.log('Uploading...');
        await client.uploadDir('./dist/', './web/');
        const files = await client.list('./web/');
        for (const file of files) {
            console.log(`Uploaded ${file.name}`);
        }
        console.log('Finished.');
        client.close();
    } catch (err) {
        console.log(err);
    } finally {
        if (client) {
            client.close();
        }
    }
}

deploy();
