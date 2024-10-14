"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
// Path of the folder to watch
var folderToWatch = './src/components';
var renamedFile = null;
/**
 * Watch for folder creation in the specified directory
 */
fs.watch(folderToWatch, function (eventType, foldername) {
    // If a Buffer is passed, convert it to a string
    if (foldername && Buffer.isBuffer(foldername)) {
        foldername = foldername.toString('utf8');
    }
    if (foldername && typeof foldername === 'string' && eventType === 'rename') {
        var newFolderPath = path.join(folderToWatch, foldername);
        // Check if the newly detected change is a directory
        if (fs.existsSync(newFolderPath) && fs.lstatSync(newFolderPath).isDirectory()) {
            if (renamedFile) {
                renameFiles(renamedFile, foldername);
                renamedFile = null;
            }
            else {
                createTemplateFiles(newFolderPath, foldername);
            }
        }
        else {
            renamedFile = foldername;
        }
    }
});
/**
 * Function to create template files inside the new folder
 * @param folderPath - Path of the new folder
 */
function createTemplateFiles(folderPath, foldername) {
    var templateFiles = ["".concat(foldername, ".tsx"), "".concat(foldername, ".module.scss")];
    var templateContent = [
        "import React from 'react';\nimport styles from './".concat(foldername, ".module.css'\n\ninterface ").concat(foldername, "Props {\n\n}\n\nconst ").concat(foldername, ": React.FC<").concat(foldername, "Props> = ({\n\n}) => {\n\treturn (null);\n}\n\nexport default ").concat(foldername, ";"),
        "@import '/src/utils/css/Variables';"
    ];
    for (var i = 0; i < templateFiles.length; i++) {
        var filePath = path.join(folderPath, templateFiles[i]);
        try {
            fs.writeFileSync(filePath, templateContent[i].toString(), 'utf8');
        }
        catch (err) {
            console.error("Error creating file ".concat(foldername, ": ").concat(err));
        }
        finally {
            console.log("File ".concat(filePath, "."));
        }
    }
}
function renameFiles(oldFolderName, newFolderName) {
    var newPath = path.join(folderToWatch, newFolderName);
    fs.readdir(newPath, function (err, files) {
        if (err) {
            console.error("Error reading directory ".concat(newPath, ": ").concat(err));
            return;
        }
        files.forEach(function (file) {
            var filePath = path.join(newPath, file);
            fs.renameSync(filePath, filePath.replace(oldFolderName, newFolderName));
        });
        console.log("All file in ".concat(newPath, " renamed."));
    });
}
