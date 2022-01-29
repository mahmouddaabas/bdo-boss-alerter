$(document).ready(() => {
    function get_boss_data(){
        var settings = {
            "url": "https://bdo-boss-alerter.herokuapp.com/boss_data_eu",
            "method": "GET",
            "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
           if(response.length == 3){
               $(".boss_name").text("The bosses " + response[0] + " and " + response[1] + " will spawn in:")
               $(".timer").text(response[2])
           }
           else {
                $(".boss_name").text("The boss " + response[0] + " will spawn in:")
                $(".timer").text(response[1])
           }
        });
    }

    setInterval(get_boss_data, 1200);
    setInterval(() => {
        //If timer is lower than 15 minutes and if the Play Audio switch is toggled play audio.
        if(parseInt($(".timer").text().replaceAll(":", "")) < 1500 && $("#cb").is(":checked")){
            document.getElementById("boss_sound").play();
        }
    },60000);
});