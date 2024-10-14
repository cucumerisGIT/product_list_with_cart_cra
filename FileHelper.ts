import * as fs from 'fs';
import * as path from 'path';

// Path of the folder to watch
const folderToWatch: string = './src/components';

let renamedFile: string | null = null;

/**
 * Watch for folder creation in the specified directory
 */
fs.watch(folderToWatch, (eventType: 'rename' | 'change', foldername: string | Buffer | null) => {
    // If a Buffer is passed, convert it to a string
    if (foldername && Buffer.isBuffer(foldername)) {
        foldername = foldername.toString('utf8');
    }
    
    if (foldername && typeof foldername === 'string' && eventType === 'rename') {
        const newFolderPath: string = path.join(folderToWatch, foldername);

        // Check if the newly detected change is a directory
        if (fs.existsSync(newFolderPath) && fs.lstatSync(newFolderPath).isDirectory()) {
            if (renamedFile) {
                renameFiles(renamedFile as string, foldername);
                renamedFile = null;
            } else {
                createTemplateFiles(newFolderPath, foldername);
            }
        } else {
            renamedFile = foldername;
        }
    }
});

/**
 * Function to create template files inside the new folder
 * @param folderPath - Path of the new folder
 */
function createTemplateFiles(folderPath: string, foldername: string): void {
    const templateFiles: string[] = [`${foldername}.tsx`, `${foldername}.module.scss`];
    const templateContent: string[] = [
        `import React from 'react';\nimport styles from './${foldername}.module.css'\n\ninterface ${foldername}Props {\n\n}\n\nconst ${foldername}: React.FC<${foldername}Props> = ({\n\n}) => {\n\treturn (null);\n}\n\nexport default ${foldername};`,
        `@import '../../utils/css/Variables';`
    ]

    for (let i: number = 0; i < templateFiles.length; i++) {
        const filePath: string = path.join(folderPath, templateFiles[i]);
        try {
            fs.writeFileSync(filePath, templateContent[i].toString(), 'utf8');
        } catch(err) {
            console.error(`Error creating file ${foldername}: ${err}`);
        } finally {
            console.log(`File ${filePath}.`);
        }
    }
}

function renameFiles(oldFolderName: string, newFolderName: string): void {
    const newPath: string = path.join(folderToWatch, newFolderName);

    fs.readdir(newPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${newPath}: ${err}`);
            return;
        }
        
        files.forEach((file) => {
            const filePath = path.join(newPath, file);
            fs.renameSync(filePath, filePath.replace(oldFolderName, newFolderName));
        })

        console.log(`All file in ${newPath} renamed.`);
    });
}