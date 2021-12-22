/// <reference types="react" />
import { StatusBarStyle } from 'expo-status-bar';
export default function BaseView(props: {
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
    children: any;
}): JSX.Element;
