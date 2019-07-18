/* eslint-disable no-console */

/**
 * The script which is able to link and unlink the folders.
 * It is used mainly to add absolute imports
 */

/**
 * Add or change folders here
 */

const namespace = '@app';
const namespaceDir = `./node_modules/${namespace}`;
const folders = [
  {
    target: '../../app/core',
    destination: `${namespaceDir}/core`,
  },
  {
    target: '../../app/features',
    destination: `${namespaceDir}/features`,
  },
];

/**
 * Main script
 */

const fs = require('fs');

if (
  process.argv[2] === 'link' ||
  process.env.npm_lifecycle_event === 'postinstall'
) {
  console.log('=========================================');
  checkCreateDir(namespaceDir);
  console.log('Linking folders:');
  for (const { target, destination } of folders) {
    resetLink(target, destination);
  }
  console.log('=========================================');
} else if (
  process.argv[2] === 'unlink' ||
  process.env.npm_lifecycle_event === 'preinstall'
) {
  console.log('=========================================');
  console.log('Unlinking folders:');
  for (const { destination } of folders) {
    removeLink(destination);
  }
  checkRemoveDir(namespaceDir);
  console.log('=========================================');
}

/**
 * Utils
 */

function checkCreateDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`📁 Making dir: ${dir}`);
    fs.mkdirSync(dir);
  }
}

function checkRemoveDir(dir) {
  if (fs.existsSync(dir)) {
    console.log(`❌  Removing dir: ${dir}`);
    fs.rmdirSync(dir);
  }
}

function checkLinkSync(destination) {
  try {
    return Boolean(fs.readlinkSync(destination));
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    }
    throw e;
  }
}

function resetLink(target, destination) {
  console.log(`🔗  ${target} ==> ${destination}`);
  try {
    if (!checkLinkSync(destination)) {
      fs.symlinkSync(target, destination, 'junction');
    } else {
      console.log(`File ${destination} already exists.`);
    }
  } catch (e) {
    throw e;
  }
}

function removeLink(destination) {
  console.log(`❌  Removing link: ${destination}`);
  try {
    if (fs.readlinkSync(destination)) {
      fs.unlinkSync(destination);
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('No link yet');
      return;
    }
    throw e;
  }
}
