$(document).ready(() => {
    function get_boss_data(){
        var settings = {
            "url": "https://bdo-boss-alerter.herokuapp.com/boss_data_eu",
            "method": "GET",
            "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
            //Filter response array to remove empty strings.
            let filtered = response[0].filter(function(el) {
                return el != "";
            });
            //If array has 2 bosses do this.
           if(filtered.length == 2){
               $(".img1").attr("src", response[2]);
               $(".img2").attr("src", response[3]);
               $(".boss_name").text("The bosses " + response[0][0] + " and " + response[0][1] + " will spawn in:")
               $(".timer").text(response[1])
           }
           else {
                $(".boss_name").text("The boss " + response[0][0] + " will spawn in:")
                $(".timer").text(response[1])
                $(".img1").attr("src", response[2]);
                $(".img2").attr("src", "");
           }
        });
    };

    setInterval(get_boss_data, 1200);
    setInterval(() => {
        //If timer is lower than 15 minutes and if the Play Audio switch is toggled play audio.
        if(parseInt($(".timer").text().replaceAll(":", "")) < 1500 && $("#cb").is(":checked")){
            document.getElementById("boss_sound").play();
        }
    },60000);
});