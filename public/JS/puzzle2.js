
var progress = 0;
var score = 0;

$(function () {

     var start = (function (){
// Set and play intro sound
         audio4 =$("#gong")[0];
         audio4.play();

// Animate out start div
             $("#start").animate({
                 top:'600px',
                 opacity:'0.2'

             },1000);

// Fadeout all and fade in main.html
         var load_start = (function (response) {
             $("#constant").fadeOut(
                 700,
                 function () {
                     $("#constant")
                         .html(response)
                         .fadeIn(700);
// Run quiz functions
                     puzzle();
                     quiz2_function();
                     entry_function();
                 }
             );
         });
// Get main game HTML
         $.get("main.html", load_start);
     });

// Animate background to green on correct answer
    var correct_anim = (function() {
          $("#content").animate({
        backgroundColor: "#57AF57"
    }, 500)
    });

// Run start on intro div click
    $("#start").on('click', start);

// Sets urls for different stages of progress
    var urls = [
        { "step": "quiz1.html"},
        { "step": "quiz2.html"},
        { "step": "quiz3.html"}
    ];

// Reload the score
    var show_score = (function () {
        $("#showscore").text(score);
    });

// Load new content on successful AJAX response
    var load_success = (function (response) {
        $("#content").fadeOut(
            500,
            function () {
                $("#content")
                    .html(response)
                    .fadeIn(500);
                $("#content").css('backgroundColor', '#EAEAEA')
                puzzle();
                quiz2_function();
                entry_function();
            }
        );
    });

// Show help button and hide the hint div
// On button click reduce score and show the hint and remove the button
    var help_box = (function () {
        $("#helpme").fadeIn(500);
      $(".help").hide();
        $("#helpme").click(function () {
            score -= 2;
            show_score();
            $(".help").slideDown(
                500
            );
            if ($(".help:visible")) {
                $("#helpme").fadeOut(500)
            }
        });
    });

// Get the next HTML content
    var next_slide = (function () {
        $.get(urls[progress].step,{ "_": $.now()}, load_success);
        progress++;
    });

// Display the puzzle pieces in random order
// *** Please note this function was taken from stackoverflow.com and was not written by me ***
    var random = (function (){
        $.fn.randomize = function(selector){
            (selector ? this.find(selector) : this).parent().each(function(){
                $(this).children(selector).sort(function(){
                    return Math.random() - 0.5;
                }).detach().appendTo(this);
            });
            return this;
        };

// Call randomize on the puzzle pieces
        $('div.piece').randomize();
    });

// Puzzle sections function
    var puzzle = (function () {
        random();
        audio = $("#yee")[0];
        help_box();
        var correct = 0;

// Makes the puzzle pieces draggable
        $(".piece").draggable({ revert: "invalid" });

// Makes each target div gap droppable  and sets it to accept piece with matching id
        $(".holder").each(function () {
            $(this).droppable({
                accept: "#i" + $(this).attr('id').substring(1),
                drop: function () {

// Sets the pic url for filling in the gap, which has a name matching the id
                    var picurl = "Pics/i" + $(this).attr('id').substring(1) + ".png";
// Hides the piece
                    $("#i" + $(this).attr('id').substring(1)).hide();
// Shows image
                    $(this).css('background-image', 'url("' + picurl + '")');
                    audio.play();
                    correct++;
                    score += 10;
                    show_score();

// Checks for all pieces in place to continue
                    if (correct == 3) {
                        correct_anim();
                        next_slide();
                    }
                }
            });
        });
    });
    puzzle();

// Sets the questions,answers and hints
    var questions = [
        { "text": "Variables that start with two '@' symbols are what kind of variables in Ruby", "answers": ["Local variable", "Global variable", "Instance variable", "Class variable"],"hint": "In this instance you're correct", "correct": "Instance variable" },
        { "text": "What syntax do you use to append to an array", "answers": ["<<", ">>", "+", "++"], "hint": "You're putting into the array from the end", "correct": "<<" },
        { "text": "How do you clear the database in Rails", "answers": ["rake db:clear", "rake db:migrate", "db:clear", "rake db:reset"],"hint": "Use rake", "correct": "rake db:reset" },
        { "text": "How do you clear the database in Rails", "answers": ["rake db:clear", "rake db:migrate", "db:clear", "rake db:reset"],"hint": "You can use the 'hide' method", "correct": "rake db:reset" }
    ];

    var q_correct = 0;
    var quiz2_function = (function () {
// Sets audio
        audio3 = $("#buzz")[0];
        audio = $("#yee")[0];

        var display_question = (function () {
            $("#helpme").fadeIn(500);
// Replaces the hint text with the current hint
            $(".replace").text(questions[q_correct].hint);
// Sets the correct answer
            var question = questions[q_correct];
// Puts current question text in place
            $("#question").text(question.text);
// Emptys answers
            $("#answers").empty();
// For each answer in current question answers array it gets placed in a li tag
            for (var i in question.answers) {
                var answer = question.answers[i];
                $("#answers").append("<li>" + answer + "</li>");
            }
            $("#content").fadeIn(500);
// When an answers is clicked the validate function is called
            $("#answers li").on("click", validate_answer);
        });

        var validate_answer = (function () {
// If the clicked li text equals the current questions correct value it continues
            if ($(this).text().toLowerCase() == questions[q_correct].correct.toLowerCase()) {
                correct_anim();
                audio.play();
                score += 10;
                show_score();
                q_correct++;
                $(".help").fadeOut(500);
                $("#content").fadeOut(500);

// If more questions
                if (questions.length > q_correct +1) {
                    var replace = (function (){
// Delay so div fades out before changed
                        setTimeout(function(){
                            display_question();
                            $("#content").css('backgroundColor', '#EAEAEA')
                        }, 1000);
                    });
                    replace();
                } else {
// If no more questions go to next section
                    next_slide();
                }
            } else {
// If answer is wrong
                score-=2;
                show_score();
                $("#content").animate({
                    backgroundColor: "red"
                }, 500);
                audio3.play();
            }
        });
        display_question();
    });

// Text entry section function
    var entry_function = function () {
        audio2 =$("#cheers")[0];

// Set answer
        var entry_ans = "$('h1').hide();";

// Function to check the answer input, called on keyup
        var check_entry = (function () {

            var typed = $("#entryform").val();
            if (typed == entry_ans) {
// Unbind the keyup so check entry is not called during name entry
                $("#entryform").unbind("keyup", check_entry);
                score += 10;
                show_score();
                $("#content").animate({
                        backgroundColor: "#57AF57"
                    }, 2000, function() {
                    audio2.play();
// Enter name
                    var name = prompt("Please enter your name");

// Put name and score into JSON object
                    var JSONObject = {
                        player: {
                            name: name,
                            score: score
                        }
                    };

// End of game load function, loads the players table
                    var load_end = (function (response) {
                        $("#content").fadeOut(
                            500,
                            function () {
                                $("#content")
                                    .html(response)
                                    .fadeIn(1000);
                                $("#content").css('backgroundColor', '#EAEAEA')
                            }
                        );
                    });

// Gets the players table
                    var end =(function () {
                        $.get("http://localhost:3000/players",{ "_": $.now()}, load_end);
// Removes the help button so it cant be clicked after quiz over
                        $("#helpme").fadeOut(500);
                        $('#content').fadeOut(500);
                    });

// Enters name and score in players table via AJAX via players controller in rails
                    $.ajax({
                        url: "http://localhost:3000/players",
                        type: "POST",
                        data: JSONObject,
                        complete: end()
                    });

// Makes sure table is reloaded with new entry showing
                  $('#content').load("http://localhost:3000/players");
                    });
            }
        });

// Checks input entry on each keyup
        $("#entryform").bind("keyup", check_entry);
    };
});

