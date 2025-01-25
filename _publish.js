import {exec} from "child_process";
import {promises as fs} from "fs";
import path from "path";
import {fileURLToPath} from "url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPackageJsonPath = path.resolve(__dirname, "package.json");

async function getWorkspaces() {
    try {
        const data = await fs.readFile(rootPackageJsonPath, "utf8");
        const packageJson = JSON.parse(data);
        return packageJson.workspaces || [];
    } catch (err) {
        console.error("Failed to read package.json:", err);
        return [];
    }
}

function publishPackage(packagePath) {
    return new Promise((resolve, reject) => {
        exec("npm publish --access public", {cwd: packagePath}, (err, stdout, stderr) => {
            if (err) {
                console.error(`Failed to publish ${packagePath}:`, err);
                reject(err);
            } else {
                console.log(`Published ${packagePath}: ${stdout}`);
                resolve(stdout);
            }
        });
    });
}

async function publishPackages() {
    const workspaces = await getWorkspaces();

    for (const workspace of workspaces) {
        const packagePath = path.resolve(__dirname, workspace);

        try {
            const stat = await fs.stat(packagePath);

            if (stat.isDirectory()) {
                console.log(`Publishing ${workspace}`);
                await publishPackage(packagePath);
            }
        } catch (err) {
            console.error(`Failed to access ${workspace}:`, err);
        }
    }
}

publishPackages();
