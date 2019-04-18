var htmlContent = $("#game")
var startTime = 10;

var questions = [{
    question: "What is 2 + 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "4",
    pic: "assets/images/math4"
},
{
    question: "What is 2 - 2 + 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "2",
    pic: "assets/images/math2"
},
{
    question: "What is 2 x 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "4",
    pic: "assets/images/math4"
},
{
    question: "What is 2 to the 2nd power?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "4",
    pic: "assets/images/math4"
},
{
    question: "What is 4 + 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "6",
    pic: "assets/images/math6"
},
{
    question: "What is 4 - 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "2",
    pic: "assets/images/math2"
},
{
    question: "What is 4 x 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "8",
    pic: "assets/images/math8"
},
{
    question: "What is 4 / 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "2",
    pic: "assets/images/math2"
},
{
    question: "What is 6 + 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "8",
    pic: "assets/images/math8"
},
{
    question: "What is 6 - 2?",
    answerOptions: ["2", "4", "6", "8"],
    answer: "4",
    pic: "assets/images/math4"
}];

var preguntas = {
    questions: questions,
    currentPregunta: 0,
    time: startTime,
    correct: 0,
    incorrect: 0,
   

    countdown: function () {
        trivia.time--;
        $('#timeLeft').html(trivia.time);

        if (trivia.time === 0) {
            trivia.timesUp();
        }
    },
    
    questionTime: function () {
        timer = setInterval(trivia.time, 1000);
        htmlContent.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answerOptions.length; i++) {
            htmlContent.append("<button class='choices' id='button'" + questions[this.currentQuestion].answerOptions[i] + '>' + questions[this.currentQuestion].answerOptions[i] + "</button>");
        }
    },
    
    nextPregunta: function () {
        trivia.counter = timerValue;
        $("#timeLeft").html(trivia.time);
        trivia.currentPregunta++;
        trivia.questionTime();
    },
    
    timesUp: function () {
        clearInterval(timer);
        $('#timeLeft').html(trivia.time);
        htmlContent.html("<h2>Times UP!!</h>");
        htmlContent.append('<h3>The answer is: ' + questions[this.currentPregunta].answer);
        htmlContent.append('<img src="' + questions[this.currentPregunta].pic + '" />');
            if (trivia.currentPregunta === questions.length - 1) {
                setTimeout(trivia.result, 1 * 1000);}
            else {
            setTimeout(trivia.nextPregunta, 1 * 1000);
            }
    },
  
    clicked: function (x) {
        clearInterval(timer);
        
        if ($(x.target).data("name") === questions[this.currentQuestion].answer) {
            this.rightAnswer();
        } else {
            this.wrongAnswer();
        }
    },
    
    rightAnswer: function () {
        trivia.correct++;
        clearInterval(timer);
        htmlContent.html('<h2>' + questions[trivia.currentPregunta].answer + ' is correct!<h2>');
        htmlContent.append('<img src="' + questions[trivia.currentPregunta].pic + '" />');
            if (trivia.currentPregunta === questions.length - 1) {
             setTimeout(trivia.result, 1 * 1000);}
            else {
            setTimeout(trivia.nextPregunta, 1 * 1000);
            }
        },
    
    wrongAnswer: function () {
        trivia.incorrect++;
        clearInterval(timer);
        htmlContent.html('<h2>Incorrect</h2>');
        htmlContent.append('<h3>The correct answer is: ' + questions[trivia.currentPregunta].answer + '</h3>');
        htmlContent.append('<img src="' + questions[trivia.currentPregunta].pic + '" />');
            if (trivia.currentPregunta === questions.length - 1) {
                setTimeout(trivia.result, 1 * 1000);
            } else {
                setTimeout(trivia.nextPregunta, 1 * 1000);
            }
        },

     result: function () {
        clearInterval(timer);
        htmlContent.html('<h2>SCORE:</h2>');
        $('#secondsLeft').html(trivia.time);
        htmlContent.append('<h3>Correct: ' + trivia.correct + '</h3>');
        htmlContent.append('<h3>Incorrect: ' + trivia.incorrect + '</h3>');
        htmlContent.append('<br><button id="again">Play Again?</button>');
    },
    
    reset: function () {
        this.currentQuestion = 0;
        this.time = timer;
        this.correct = 0;
        this.incorrect = 0;
        this.questionDisplay();
    }
};

$(document).on('click', '#start', function (x) {
    $('#timerDisplay').prepend('<h2>Time Remaining: <span id="secondsLeft">20</span> seconds</h2>');
    trivia.questionTime();
});
$(document).on('click', '#again', function (x) {
    trivia.reset();
});
$(document).on('click', '.choices', function (x) {
    trivia.clicked(x);
});