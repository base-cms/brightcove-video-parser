const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const { spawn } = require('child_process');
const { src, watch, parallel } = require('gulp');

const { log } = console;

let node;
const server = async () => {
  if (node) node.kill();
  node = await spawn('node', ['src/index.js'], { stdio: 'inherit' });
  node.on('close', (code, signal) => {
    const exited = [];
    if (code) exited.push(`code ${code}`);
    if (signal) exited.push(`signal ${signal}`);
    log(`Process exited with ${exited.join(' ')}`);
  });
};

const lint = () => src(['src/**/*.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());


const serve = () => watch(['src/**/*.js'], { queue: false, ignoreInitial: false }, parallel(lint, server));

exports.lint = lint;
exports.serve = serve;
exports.default = serve;
