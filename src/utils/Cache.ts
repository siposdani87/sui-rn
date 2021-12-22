import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export interface Fonts {
    [x: string]: any;
}

export function cacheImages(
    images: (string | number)[],
): (Promise<boolean> | Promise<Asset>)[] {
    return images.map((image) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        }
        return Asset.fromModule(image).downloadAsync();
    });
}

export function cacheFonts(fonts: Fonts): Promise<void>[] {
    return fonts.map((font: string | Record<string, Font.FontSource>) => {
        return Font.loadAsync(font);
    });
}
