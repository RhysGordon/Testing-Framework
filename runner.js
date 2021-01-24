// Require in 'fs' module from node standard library
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('../testme/render');

// Ignore certain folders
const forbiddenDirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        // Iterate through the 'testFiles' 
        for (let file of this.testFiles) {
            // Indicate the name of the file about to be tested
            console.log(chalk.gray(`----- ${file.shortName}`))

            global.render = render;
            const beforeEaches = [];
            // Set the global 'forEach' function
            global.beforeEach = (fn) => {
                // Store reference to function passed to 'beforeEach'
                beforeEaches.push(fn);
            }
            // Set the global 'it' function
            global.it = async (description, fn) => {
                // Look at all different 'beforeEaches' that have been loaded
                beforeEaches.forEach(func => func());
                // Call the function from the 'it' statement
                try {
                    await fn();
                    console.log(chalk.green(`\tOK - ${description}`))
                } catch (error) {
                    // Every new line inside of the error message - Replace the new line character with new line and 2 tabs
                    const message = error.message.replace(/\n/g, '\n\t\t');
                    console.log(chalk.red(`\tX - ${description}`));
                    console.log(chalk.red('\t', message));
                }
            }
            // Execute the file
            try{
                require(file.name) 
            } catch (error) {
                console.log(chalk.red('X - Error Loading File', file.name));
                console.log(chalk.red(error));
            }
        }
    }

    // Check all files and folders in project directory and find required files - 'targetPath' is the path that will be checked for test files
    async collectFiles(targetPath) {
        // Checks the 'targetPath' directory - returns promise which resolves with names of all different files and folders inside
        const files = await fs.promises.readdir(targetPath)

        // Iterate over each 'file' inside of 'files'
        for (let file of files) {
            // Show absolute file name - directory name and file name
            const filePath = path.join(targetPath, file);

            // Execute 'lstat' on 'filePath'
            const stats = await fs.promises.lstat(filePath);

            // Check if 'stats' is a file AND includes 'test.js' in file name
            if (stats.isFile() && file.includes('.test.js')) {
                // If 'stats' is a file and includes 'test.js' - Add to 'testFiles' as an object with 'name' property
                this.testFiles.push({ name: filePath, shortName: file });

            // Check if 'stats' is a directory AND isn't in the forbiddenDirs array
            } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
                // Check the files inside of the directory
                const childFiles = await fs.promises.readdir(filePath);

                // Take each element from 'childFiles' array and add individually to 'files' array
                files.push(...childFiles.map(f => path.join(file, f)))
            }
        }
    }
}

module.exports = Runner;