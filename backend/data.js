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

    //Check if array has 1 or 2 bosses.
    /*if(current_boss.length == 3){
        console.log(`The next bosses ${current_boss[1]} and ${current_boss[2]} are spawning in: ${timer}`)
    }
    else {
        console.log(`The next boss ${current_boss[1]} is spawning in: ${timer}`)
    }*/

    //Convert timer to int.
    //let timer_clean = timer.replaceAll(":", "");
    //let timer_int = parseInt(timer_clean);

    //Put the current_boss array and the int timer inside another array to return.
    let return_array = [];
    return_array.push(current_boss);
    return_array.push(timer);
    return return_array;
}

module.exports = {
    get_boss_data
}