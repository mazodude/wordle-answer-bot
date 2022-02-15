const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nytimes.com/games/wordle/index.html');
    // await page.screenshot({ path: 'wordle.png' });

    await page.waitForTimeout( 1000 );
    let data = await page.evaluate(() => {
        return localStorage.getItem('nyt-wordle-state');
    }).then((data)=>{
        return data;
    });

    if (data) {
        const json = JSON.parse(data);
        const answer = json.solution;

        if (answer) {
            console.log(answer);
        }
    }

    await browser.close();
})();