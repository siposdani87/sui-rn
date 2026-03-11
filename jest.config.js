module.exports = {
    preset: 'jest-expo',
    testMatch: ['**/__tests__/**/*.test.ts?(x)'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?(-modules-core)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@siposdani87/.*|date-fns|@ungap)/)',
    ],
};
