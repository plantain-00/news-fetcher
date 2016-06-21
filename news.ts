import * as libs from "./libs";

interface HiddenItem {
    createTime: number;
    url: string;
}

const key: string = process.env.NEWS_FETCHER_KEY;
let items: HiddenItem[] = [];

const app = libs.express();
app.use(libs.bodyParser.json());
app.use(libs.bodyParser.urlencoded({ extended: true }));

function assert(condition: any, statusCode: number, errorMessage: string) {
    if (!condition) {
        throw [statusCode, errorMessage];
    }
}

app.get("/items", async (request, response) => {
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
});

app.post("/items", async (request, response) => {
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
});

const port = 9994;
app.listen(port, "0.0.0.0", () => {
    libs.green(`api Server is listening: ${port}`);
});
