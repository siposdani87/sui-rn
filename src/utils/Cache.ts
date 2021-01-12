import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export function cacheImages(images): (Promise<Asset> | Promise<boolean>)[] {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        }
        return Asset.fromModule(image).downloadAsync();
    });
}

export function cacheFonts(fonts): Promise<void>[] {
    return fonts.map((font) => {
        return Font.loadAsync(font);
    });
}
