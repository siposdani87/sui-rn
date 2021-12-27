import { Asset } from 'expo-asset';
export interface Fonts {
    [x: string]: any;
}
export declare function cacheImages(images: (string | number)[]): (Promise<boolean> | Promise<Asset>)[];
export declare function cacheFonts(fonts: Fonts): Promise<void>[];
