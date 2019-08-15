import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } 
        return Asset.fromModule(image).downloadAsync();
    });
}

export function cacheFonts(fonts) {
    /*return fonts.map((font) => {
        return Font.loadAsync(font)
    });*/
    const assets = {};
    fonts.map((font) => {
        for (const key in font){
            assets[key] = font[key];
        }
    });
    return [Font.loadAsync(assets)];
}
