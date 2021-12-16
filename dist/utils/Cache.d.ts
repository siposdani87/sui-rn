import { Asset } from 'expo-asset';
export declare function cacheImages(images: string[]): (Promise<boolean> | Promise<Asset>)[];
export declare function cacheFonts(fonts: string[]): Promise<void>[];
