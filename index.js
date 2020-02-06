#!/usr/bin/env node

const a = process.argv.slice(2);
const _dir = process.cwd();
const path = require("path");
const chalk = require("chalk");
const Bundler = require("parcel-bundler");

const child_process = require("child_process");
const fs = require("fs");

const args = {};
for (let i = 0; i < a.length; i++) {
  if (a[i].substring(0, 4) === "out=") {
    args["out"] = a[i].substring(4);
  } else if (a[i].substring(0, 6) === "entry=") {
    args["entry"] = a[i].substring(6);
  } else if (a[i].substring(0, 9) === "cacheDir=") {
    args["cacheDir"] = a[i].substring(9);
  } else {
    args[a[i]] = true;
  }
}

let config = {
  inspect: args.inspect ? true : false,
  scopeHoist: args.scopeHoist ? true : false,
  outDir: path.resolve(_dir, args.out ? args.out : "./build"),
  entry: path.resolve(_dir, args.entry ? args.entry : "./src/index.js"),
  cacheDir: path.resolve(_dir, args.cacheDir ? args.cacheDir : "./.cache"),
  minify: args.minify ? true : false,
  cache: args.cache === false ? false : true,
  bundleNodeModules: args.bundleNodeModules ? true : false
};

const outSplit = config.entry.split("/");
let outFile = outSplit[outSplit.length - 1];
const fileExtensionSplit = outFile ? outFile.split(".") : [".js"];
const fileExtension = fileExtensionSplit[fileExtensionSplit.length - 1];
outFile = outFile.replace(`.${fileExtension}`, ".js");
const outFileFullPath = `${config.outDir}/${outFile}`;

if (fs.existsSync(outFileFullPath)) {
  fs.unlinkSync(outFileFullPath);
}
console.log(`Entry: ${chalk.blue(config.entry)}`);

const options = {
  scopeHoist: config.scopeHoist,
  outDir: config.outDir,
  watch: true,
  minify: false,
  sourceMaps: false,
  target: "node",
  cache: config.cache,
  cacheDir: config.cacheDir,
  bundleNodeModules: config.bundleNodeModules,
  logLevel: 0
};

let child;
const ora = require("ora");
let spinner = ora("Building...");
(async () => {
  const bundler = new Bundler([config.entry], options);
  bundler.on("buildStart", () => {
    if (child) {
      child.kill();
    }
    spinner.start();
  });
  bundler.on("buildEnd", () => {
    let commands = [];
    spinner.stop();
    if (config.inspect) {
      commands = ["--inspect", outFileFullPath];
    } else {
      commands = [outFileFullPath];
    }

    child = child_process.spawn("node", commands, {
      stdio: "inherit",
      shell: false
    });
    child.on("exit", function(e, code) {
      child.kill();
    });
  });
  await bundler.bundle();
})();
