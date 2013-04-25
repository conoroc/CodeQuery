var questions = [
    { "text": "what is the capital of Italy", "answers": ["Rome", "Italy", "Paris", "Dublin"], "correct": "Paris" },
    { "text": "what is the capital of Germany", "answers": ["Rome", "Italy", "Paris", "Berlin"], "correct": "Paris" },
    { "text": "what is the capital of Germany", "answers": ["Rome", "Italy", "Paris", "Berlin"], "correct": "Paris" }
];




var quiz2_function = (function (){
    var ques_content = $('#quiz2').html();
    $('#content').html(ques_content);
    var qthree = $('#quiz3').html();
    var next_slide = (function () {
        $('#content').html(qthree);
        entry_function();
    });

    var correct = 2;
    var score = 0;
    var display_question = (function () {
        var question = questions[score];

        $("#question").text(question.text);

        $("#answers").empty();
        for (var i in question.answers) {
            var answer = question.answers[i];
            $("#answers").append("<li>" + answer + "</li>");
        }

        $("#answers li").on("click", validate_answer);      
    });

    var validate_answer = (function () {

        if ($(this).text().toLowerCase() == questions[score].correct.toLowerCase()) {
            audio.play();
            score += 10;
            correct++;
            display_score();
            if (questions.length > correct) {
                display_question();
                countdown = max_countdown;
            } else {
                $("#question").text("you are great");
                $("#answers").empty();
                next_slide();
            }
        } else {
            display_error();
        }
        alert("hi");

    });

    var display_error = (function () {
        $("#question").text("you suck");
        $("#answers").empty();
    });

    var display_score = (function () {
        $("#score").text(score);
    });



     
     
    display_question(); 
    display_score();


});




