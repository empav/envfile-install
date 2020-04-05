#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const packageJson = require(path.join(process.cwd(), "package.json"));
const childProcess = require("child_process");
const encodingFile = "utf-8";

// Read env deps
const deps = packageJson.envDependencies || {};

let envFile = {};
try {
  // Read file .env syncronously
  envFile = fs
    .readFileSync(path.join(process.cwd(), ".env"), encodingFile)
    // Split on \n
    .split("\n")
    // Turning it into an object { key: value }
    .reduce((acc, curr) => {
      // Splitting on =
      const [key, value] = curr.split("=");
      acc[key] = value;
      return acc;
    }, {});
} catch {}

// Replacing placeholders defined in package.json env deps either with .env props or process.env vars
const packages = Object.keys(deps)
  .map((key) =>
    deps[key].replace(
      /\${([0-9a-zA-Z_]*)}/g,
      (_, x) => envFile[x] || process.env[x]
    )
  )
  .join(" ");

try {
  // Launching a child process to intall env deps
  childProcess.execSync(`npm install --no-save ${packages}`, {
    stdio: [0, 1, 2],
  });
} catch (e) {}
