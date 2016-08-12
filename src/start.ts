import * as libs from "./libs";
import * as news from "./news";

const app = libs.express();
app.use(libs.bodyParser.json());
app.use(libs.bodyParser.urlencoded({ extended: true }));

app.get("/items", news.getHistory);

app.post("/items", news.saveHistory);

const port = 9994;
app.listen(port, "0.0.0.0", () => {
    libs.green(`api Server is listening: ${port}`);
});
