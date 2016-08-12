import * as libs from "./libs";

export interface HiddenItem {
    createTime: number;
    url: string;
}

const key: string = process.env.NEWS_FETCHER_KEY;
export let items: HiddenItem[] = [];

function assert(condition: any, statusCode: number, errorMessage: string) {
    if (!condition) {
        throw [statusCode, errorMessage];
    }
}

export async function getHistory(request: libs.express.Request, response: libs.express.Response) {
    try {
        assert(request.query.key === key, 403, "a key is required");
        const date = Date.now() - 7 * 24 * 3600 * 1000;
        items = items.filter(item => item.createTime > date);
        response.status(200).json({
            isSuccess: true,
            items: items.map(i => i.url),
        });
    } catch (error) {
        response.status(error[0]).json({
            isSuccess: false,
            errorMessage: error[1],
        });
    }
}

export async function saveHistory(request: libs.express.Request, response: libs.express.Response) {
    try {
        assert(request.query.key === key, 403, "a key is required");
        items.push({
            createTime: Date.now(),
            url: request.body.url,
        });

        response.status(200).json({
            isSuccess: true,
        });
    } catch (error) {
        response.status(error[0]).json({
            isSuccess: false,
            errorMessage: error[1],
        });
    }
}
