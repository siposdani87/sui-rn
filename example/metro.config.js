// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch the parent library for changes
config.watchFolders = [
  path.resolve(__dirname, '..'),
];

// Ensure Metro resolves dependencies from the example app's node_modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
  ],
};

module.exports = config;
