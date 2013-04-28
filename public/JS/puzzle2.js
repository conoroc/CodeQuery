var progress = 0;
var score = 0;



$(function () {


    var urls = [
        { "step": "quiz1.html"},
        { "step": "quiz2.html"},
        { "step": "quiz3.html"},
        { "step": "http://localhost:3000/players"}
    ];


    var show_score = (function () {
        $("#showscore").text(score);
    });


    var load_success = (function (response) {
        $("#content").fadeOut(
            500,
            function () {
                $("#content")
                    .html(response)
                    .fadeIn(500);

                puzzle();
                quiz2_function();
                entry_function();
            }
        );
    });


    var help_box = (function () {
        $(".help").hide();
        $("#helpme").click(function () {
            score -= 2;
            show_score();
            $(".help").slideDown(
                500
            );
        });
    });



    var next_slide = (function () {
        $.get(urls[progress].step, load_success);
        progress++;
    });



    var puzzle = (function () {
        audio = $("#yee")[0];
        help_box();
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

                    score += 10;
                    show_score();

                    if (correct == 2) {

                        next_slide();
                    }
                }
            });
        });

    });
    puzzle();


    var questions = [
        { "text": "Variables that start with two '@' symbols are what kind of variables in Ruby", "answers": ["Local variable", "Global variable", "Instance variable", "Class variable"], "correct": "Instance variable" },
        { "text": "What syntax do you use to append to an array", "answers": ["<<", ">>", "+", "++"], "correct": "<<" },
        { "text": "How do you clear the database in Rails", "answers": ["rake db:clear", "rake db:migrate", "db:clear", "rake db:reset"], "correct": "rake db:reset" }
    ];

    var q_correct = 0;
    var quiz2_function = (function () {
        audio = $("#yee")[0];
        var display_question = (function () {
            var question = questions[q_correct];

            $("#question").text(question.text);

            $("#answers").empty();
            for (var i in question.answers) {
                var answer = question.answers[i];
                $("#answers").append("<li>" + answer + "</li>");
            }

            $("#answers li").on("click", validate_answer);
        });

        var validate_answer = (function () {

            if ($(this).text().toLowerCase() == questions[q_correct].correct.toLowerCase()) {
                audio.play();
                score += 10;
                show_score();
                q_correct++;

                if (questions.length > q_correct +1) {
                    display_question();

                } else {
                    $("#question").text("you are great");
                    $("#answers").empty();
                    next_slide();
                }
            } else {
                display_error();
            }


        });

        var display_error = (function () {
            $("#question").text("you suck");
            $("#answers").empty();
        });

        display_question();

    });


    var entry_function = function () {
        audio2 =$("#cheers")[0];
        var entry_ans = "$('h1').hide();";



        var check_entry = (function () {

            var typed = $("#entryform").val();
            if (typed == entry_ans) {
                score += 10;
                show_score();
                $("#entryform").animate({
                        backgroundColor: "olive"
                    }, 2000, function() {
                    audio2.play();

                    var name = prompt("Please enter your name");
                    var JSONObject = {
                        player: {
                            name: name,
                            score: score
                        }
                    }

                    $.ajax({
                        url: "http://localhost:3000/players",
                        type: "POST",
                        data: JSONObject,
                       complete: next_slide()
                    })
                    });
            }
        });


        $("#entryform").on("keyup", check_entry);
        $("#check").on("click", check_entry);
    };
});

