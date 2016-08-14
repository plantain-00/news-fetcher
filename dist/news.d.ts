/// <reference types="express" />
import * as libs from "./libs";
export interface HiddenItem {
    createTime: number;
    url: string;
}
export declare let items: HiddenItem[];
export declare function getHistory(request: libs.express.Request, response: libs.express.Response): Promise<void>;
export declare function saveHistory(request: libs.express.Request, response: libs.express.Response): Promise<void>;
