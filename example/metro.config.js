// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// TODO: Fix for startup error: Invariant Violation: Module RCTDeviceEventEmitter is not a registered callable module
config.transformer = {
    ...config.transform,
    getTransformOptions: async () => ({
        transform: {
            // this defeats the RCTDeviceEventEmitter is not a registered callable module
            inlineRequires: true,
        },
    }),
};

module.exports = config;
