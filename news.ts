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
app.use(libs.bodyParser.json());
app.use(libs.bodyParser.urlencoded({ extended: true }));

app.get("/items", async (request, response) => {
    try {
        if (request.query.key !== settings.key) {
            response.status(403).json({
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
        response.status(200).json({
            isSuccess: true,
            items: items.map(i=> i.url),
        });
    } catch (error) {
        response.status(500).json({
            isSuccess: false,
            errorMessage: error,
        });
    }
});

app.post("/items", async (request, response) => {
    try {
        if (request.query.key !== settings.key) {
            response.status(403).json({
                isSuccess: false,
                errorMessage: "a key is required",
            });
            return;
        }
        let url = request.body.url;

        let hiddenItem = await HiddenItem.create({
            createTime: Date.now(),
            url: url,
        });

        hiddenItem.save();

        response.status(200).json({
            isSuccess: true
        });
    } catch (error) {
        response.status(500).json({
            isSuccess: false,
            errorMessage: error,
        });
    }
});

let port = 9994;
app.listen(port, "localhost", () => {
    console.log(libs.colors.green(`api Server is listening: ${port}`));
});
