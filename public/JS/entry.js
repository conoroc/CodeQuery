/**
 * Created with JetBrains RubyMine.
 * User: Conor
 * Date: 14/04/13
 * Time: 2:17 AM
 * To change this template use File | Settings | File Templates.
 */


var entry_function = function () {
    alert("gg");
    var entry_ans = "alert('try again');";

    var audio = $("#cheers")[0];
    var score = 0;

    var check_entry = (function () {
        alert("gg");
        var typed = $("#entryform").val();
        if (typed == entry_ans) {
            score += 10;
            audio.play();
            var name = prompt("Please enter your name");
            var JSONObject=  {
                player: {
                    name: name,
                    score: score
                }
            }
            alert(JSONObject.player.score);



            $.ajax({
                url: "http://localhost:3000/players" ,
                type: "POST" ,
                data: JSONObject
//                        complete: function() {
//                            $.get(url, show_content)
//                        }

            })

        }
        else {
            alert("try again");
        }


    });

    $("#check").on("click", check_entry);
};