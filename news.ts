import * as libs from "./libs";
import * as settings from "./settings";

import Schema = libs.mongoose.Schema;

interface HiddenItemDocument extends libs.mongoose.Document {
    createTime: number;
    url: string;
}

libs.mongoose.connect(settings.mongodb.url, settings.mongodb.options);
libs.mongoose.connection.on("error", console.error.bind(console, "connection error:"));

let HiddenItem = libs.mongoose.model<HiddenItemDocument>("HiddenItem", new libs.mongoose.Schema({
    createTime: Number,
    url: String,
}));

let app = libs.express();

app.get("/items", async (request, response) => {
    try {
        if (request.query.key !== settings.key) {
            response.json(403, {
                isSuccess: false,
                errorMessage: "a key is required",
            });
            return;
        }
        let date = Date.now() - 7 * 24 * 3600 * 1000;
        let items = await HiddenItem.find({
            createTime: {
                $gt: date
            }
        }).select("url").exec();
        response.json(200, {
            isSuccess: true,
            items: items.map(i=> i.url),
        });
    } catch (error) {
        response.json(500, {
            isSuccess: false,
            errorMessage: error,
        });
    }
});

let port = 9994;
app.listen(port, "localhost", () => {
    console.log(libs.colors.green(`api Server is listening: ${port}`));
});
