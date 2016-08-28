import * as libs from "./libs";
import * as news from "./news";

const app = libs.express();
app.use(libs.bodyParser.json());
app.use(libs.bodyParser.urlencoded({ extended: true }));
const upload = libs.multer({ dest: "uploads/" });

news.bind(app, "get", "/items", news.getHistory);
news.bind(app, "post", "/items", news.saveHistory);
news.bind(app, "post", "/sources", news.saveRawSources);
news.bind(app, "post", "/logs", news.errorReport, upload);

const port = 9994;
app.listen(port, "0.0.0.0", () => {
    libs.green(`api Server is listening: ${port}`);
});
