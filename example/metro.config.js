// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the parent library for changes
config.watchFolders = [libraryRoot];

// Ensure Metro resolves all dependencies from the example app's node_modules
// This prevents duplicate React instances from the library's devDependencies
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
  ],
  // Block the library root's node_modules so Metro doesn't resolve
  // react/react-native from there (which would cause duplicate instances)
  blockList: [
    new RegExp(path.resolve(libraryRoot, 'node_modules').replace(/[/\\]/g, '[/\\\\]') + '/.*'),
  ],
};

module.exports = config;
