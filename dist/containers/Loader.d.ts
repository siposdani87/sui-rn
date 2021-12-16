/// <reference types="react" />
import { HttpService } from '../services';
export default function Loader(props: {
    httpService: HttpService;
    backgroundColor: string;
    color: string;
}): JSX.Element | null;
