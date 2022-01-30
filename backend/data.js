const request = require('request-promise');
const cheerio = require('cheerio');

async function get_boss_data(){

    let url = "https://mmotimer.com/bdo/?server=eu"

    const response = await request(url);

    let $ = cheerio.load(response);

    //Get the next bosses spawning and push into an array.
    let current_boss = [];
    for(var i = 1; i < 4; i++){
        current_boss.push($("body > main > div.default-box.text-center > div:nth-child(2) > div:nth-child(2) > div > div:nth-child("+i+") > div.next-boss-title").text());
    }
    //Remove the first element in the array as its always an empty string.
    current_boss.shift();

    //Get the next boss timer.
    let timer = $("body > main > div.default-box.text-center > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div.next-boss-timer.countdown").text();

    //Get boss icons.
    let first_icon = "https://mmotimer.com"+ $("body > main > div.default-box.text-center > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > img").attr("src");
    let second_icon = "https://mmotimer.com"+ $("body > main > div.default-box.text-center > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) > img").attr("src");

    //Put the current_boss array and the int timer inside another array to return.
    let return_array = [];
    return_array.push(current_boss);
    return_array.push(timer);
    return_array.push(first_icon.replace("..", ""));
    return_array.push(second_icon.replace("..", ""));
    return return_array;
}

get_boss_data();

module.exports = {
    get_boss_data
}