#!/usr/bin/env node

const Runner = require('./runner');
const runner = new Runner();

// Helper function to allow 'collectFiles()' to be executed
const run = async () => {
    // Executes 'collectFiles()' on 'runner' and returns from the current path using 'process.cwd'
    await runner.collectFiles(process.cwd());
    runner.runTests();
};

run();