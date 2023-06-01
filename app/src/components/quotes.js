const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const totalPages = 10;
const delayBetweenRequests = 2000;

async function scrapeQuotes() {
    try {
        const quotes = [];
        for (let page = 1; page <= totalPages; page++) {
            const url = `https://www.azquotes.com/top_quotes.html?p=${page}`;
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const listItems = $(".list-quotes li");

            listItems.each((idx, el) => {
                const quote = { title: "", author: "" };
                quote.title = $(el).find("div.wrap-block > p > a.title").text();
                quote.author = $(el).find("div.wrap-block > div.author > a").text();
                quotes.push(quote);
            });

            if (page < totalPages) {
                await delay(delayBetweenRequests);
            }
        }

        console.log(quotes);

        const writeFilePromise = new Promise((resolve, reject) => {
            fs.writeFile("quotes.json", JSON.stringify(quotes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                resolve();
            });
        });

        await writeFilePromise;
        console.log("Successfully written data to file");
    } catch (err) {
        console.error(err);
    }
}

scrapeQuotes();