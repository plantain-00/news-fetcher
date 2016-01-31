export let key = "";
export let mongodb: { url: string; options?: { user: string; pass: string; } };

try {
    const secret = require("./secret");
    secret.load();
} catch (error) {
    console.log(error);
}
