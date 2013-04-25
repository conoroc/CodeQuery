
var score = 0;
var show_score = (function () {
    $("#showscore").text(score);
});
$(function () {


    $(".help").hide();
    $("#helpme").click(function () {
        score -= 2;
        show_score();
        $(".help").slideDown(
            500
        );
    });


    audio = $("#cheers")[0];
    var qtwo = $('#quiz8').html();
    var next_slide = (function () {
        $('#content').html(qtwo);
        puzzle();
    });
    var stage = 0;
    var puzzle = (function () {


        var correct = 0;
        $(".piece").draggable({ revert: "invalid" });
        $(".holder").each(function () {
            $(this).droppable({
                accept: "#i" + $(this).attr('id').substring(1),
                drop: function () {

                    var picurl = "Pics/i" + $(this).attr('id').substring(1) + ".png";
                    $("#i" + $(this).attr('id').substring(1)).hide();
                    $(this).css('background-image', 'url("' + picurl + '")');
                    audio.play();
                    correct++;
                    stage++;
                    score += 10;
                    show_score();
                    var JSONObject=  {
                        player: {
                            name: "Conor",
                           score: score
                        }
                    }
                    alert(JSONObject.player.score);
                    alert(stage);
                    if ((stage == 4) && (correct == 2))  {
                        quiz2_function();
                        return false;
                    }


                    if (correct == 2) {
                        next_slide();
                    }



                }
            });
        });

    });
   puzzle();
});

