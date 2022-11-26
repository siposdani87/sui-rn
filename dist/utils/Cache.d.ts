import { Asset } from 'expo-asset';
interface Fonts {
    [x: string]: any;
}
type Images = (string | number)[];
export declare function cacheImages(images: Images): (Promise<boolean> | Promise<Asset>)[];
export declare function cacheFonts(fonts: Fonts): Promise<void>[];
export {};
