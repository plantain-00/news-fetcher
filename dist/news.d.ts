/// <reference types="express" />
/// <reference types="multer" />
import * as libs from "./libs";
export interface HiddenItem {
    createTime: number;
    url: string;
}
export declare let items: HiddenItem[];
export declare function bind(app: libs.express.Application, method: string, path: string, handler: (request: libs.express.Request, response: libs.express.Response) => Promise<void>, upload?: libs.multer.Instance): Promise<void>;
export declare function getHistory(request: libs.express.Request, response: libs.express.Response): Promise<void>;
export declare function saveHistory(request: libs.express.Request, response: libs.express.Response): Promise<void>;
export declare function saveRawSources(request: libs.express.Request, response: libs.express.Response): Promise<void>;
export declare function errorReport(request: libs.express.Request, response: libs.express.Response): Promise<void>;
