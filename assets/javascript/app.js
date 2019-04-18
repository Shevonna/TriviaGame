var htmlContent = $('#game');
var startTime = 10;

var questions = [{
    question: "What is 2 + 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "four",

},
{
    question: "What is 2 - 2 + 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "two",
 
},
{
    question: "What is 2 x 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "four",

},
{
    question: "What is 2 to the 2nd power?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "four",

},
{
    question: "What is 4 + 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "six",

},
{
    question: "What is 4 - 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "two",

},
{
    question: "What is 4 x 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "eight",

},
{
    question: "What is 4 / 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "two",

},
{
    question: "What is 6 + 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "eight",

},
{
    question: "What is 6 - 2?",
    answerOptions: ["two", "four", "six", "eight"],
    answer: "four",

}];

var preguntas = {
    questions: questions,
    currentPregunta: 0,
    time: startTime,
    correct: 0,
    incorrect: 0,
  
    
    countdown: function () {
        preguntas.time--;
        $('#secondsLeft').html(preguntas.time);

        if (preguntas.time === 0) {
            preguntas.outOfTime();
        }
    },
    
    questionTime: function () {
        timer = setInterval(preguntas.countdown, 1000);
        htmlContent.html('<h2>' + questions[this.currentPregunta].question + '</h2>');
        for (var i = 0; i < questions[this.currentPregunta].answerOptions.length; i++) {
            htmlContent.append('<button class="choices" id="button"' + 'data-name="' + questions[this.currentPregunta].answerOptions[i] + '">' + questions[this.currentPregunta].answerOptions[i] + '</button>');
        }
    },

    nextQuestion: function () {
        preguntas.time = startTime;
        $('#secondsLeft').html(preguntas.time);
        preguntas.currentPregunta++;
        preguntas.questionTime();
    },
 
    outOfTime: function () {
        clearInterval(timer);
        $('#secondsLeft').html(preguntas.time);
        htmlContent.html("<h2>you took too long!</h2>");
        htmlContent.append('<h2>The answer is: ' + questions[this.currentPregunta].answer);

        if (preguntas.currentPregunta === questions.length - 1) {
            setTimeout(preguntas.result, 1 * 1000);
        } else {
            setTimeout(preguntas.nextQuestion, 1 * 1000);
        }
    },

    selected: function (e) {
        clearInterval(timer);
        
        if ($(e.target).data("name") === questions[this.currentPregunta].answer) {
            this.correctlySelected();
        } else {
            this.incorrectlySelected();
        }
    },
    
    correctlySelected: function () {
        preguntas.correct++;
        clearInterval(timer);
        htmlContent.html('<h2>' + questions[preguntas.currentPregunta].answer + ' is correct!</h2>');
        if (preguntas.currentPregunta === questions.length - 1) {
            setTimeout(preguntas.result, 1 * 1000);
        } else {
            setTimeout(preguntas.nextQuestion, 1 * 1000);
        }
    },

    incorrectlySelected: function () {
        preguntas.incorrect++;
        clearInterval(timer);
        htmlContent.html('<h2>Wrong!</h2>');
        htmlContent.append('<h2>The correct answer is: ' + questions[preguntas.currentPregunta].answer + '</h2>');
        if (preguntas.currentPregunta === questions.length - 1) {
            setTimeout(preguntas.result, 1 * 1000);
        } else {
            setTimeout(preguntas.nextQuestion, 1 * 1000);
        }
    },

     result: function () {
        clearInterval(timer);
        htmlContent.html('<h2>SCORE:</h2>');
        $('#secondsLeft').html(preguntas.time);
        htmlContent.append('<h2>Correct: ' + preguntas.correct + '</h2>');
        htmlContent.append('<h2>Incorrect: ' + preguntas.incorrect + '</h2>');
        htmlContent.append('<h2>Unanswered: ' + (questions.length - (preguntas.incorrect + preguntas.correct)) + '</h2>');
        htmlContent.append('<br><button id="replay">replay?</button>');
    },

    reset: function () {
        this.currentPregunta = 0;
        this.time = timer;
        this.correct = 0;
        this.incorrect = 0;
        this.questionTime();
    }
};

$(document).on('click', '#start', function (e) {
    $('#clock').prepend('<h2>Time Remaining: <span id="secondsLeft">10</span> seconds</h2>');
    preguntas.questionTime();
});
$(document).on('click', '#replay', function (e) {
    preguntas.reset();
});

$(document).on('click', '.choices', function (e) {
    preguntas.selected(e);
});







// var htmlContent = $("#game")
// var startTime = 10;



// var preguntas = {
//     questions: questions,
//     currentPregunta: 0,
//     time: startTime,
//     correct: 0,
//     incorrect: 0,
   

//     countdown: function () {
//         preguntas.time--;
//         $('#timeLeft').html(preguntas.time);

//         if (preguntas.time === 0) {
//             preguntas.timesUp();
//         }
//     },
    
//     questionTime: function () {
//         timer = setInterval(preguntas.time, 1000);
//         htmlContent.html("<h2>" + questions[this.currentPreguntauestion].question + "</h2>");
//         for (var i = 0; i < questions[this.currentPreguntauestion].answerOptions.length; i++) {
//             htmlContent.append("<button class='choices' id='button'" + questions[this.currentPreguntauestion].answerOptions[i] + '>' + questions[this.currentPreguntauestion].answerOptions[i] + "</button>");
//         }
//     },
    
//     nextPregunta: function () {
//         preguntas.counter = startTime;
//         $("#timeLeft").html(preguntas.time);
//         preguntas.currentPregunta++;
//         preguntas.questionTime();
//     },
    
//     timesUp: function () {
//         clearInterval(timer);
//         $('#timeLeft').html(preguntas.time);
//         htmlContent.html("<h2>Times UP!!</h>");
//         htmlContent.append('<h3>The answer is: ' + questions[this.currentPregunta].answer);
//         htmlContent.append('<img src="' + questions[this.currentPregunta].pic + '" />');
//             if (preguntas.currentPregunta === questions.length - 1) {
//                 setTimeout(preguntas.result, 1 * 1000);}
//             else {
//             setTimeout(preguntas.nextPregunta, 1 * 1000);
//             }
//     },
  
//     clicked: function (x) {
//         clearInterval(timer);
        
//         if ($(x.target).data("name") === questions[this.currentPreguntauestion].answer) {
//             this.rightAnswer();
//         } else {
//             this.wrongAnswer();
//         }
//     },
    
//     rightAnswer: function () {
//         preguntas.correct++;
//         clearInterval(timer);
//         htmlContent.html('<h2>' + questions[preguntas.currentPregunta].answer + ' is correct!<h2>');
//         htmlContent.append('<img src="' + questions[preguntas.currentPregunta].pic + '" />');
//             if (preguntas.currentPregunta === questions.length - 1) {
//              setTimeout(preguntas.result, 1 * 1000);}
//             else {
//             setTimeout(preguntas.nextPregunta, 1 * 1000);
//             }
//         },
    
//     wrongAnswer: function () {
//         preguntas.incorrect++;
//         clearInterval(timer);
//         htmlContent.html('<h2>Incorrect</h2>');
//         htmlContent.append('<h3>The correct answer is: ' + questions[preguntas.currentPregunta].answer + '</h3>');
//         htmlContent.append('<img src="' + questions[preguntas.currentPregunta].pic + '" />');
//             if (preguntas.currentPregunta === questions.length - 1) {
//                 setTimeout(preguntas.result, 1 * 1000);
//             } else {
//                 setTimeout(preguntas.nextPregunta, 1 * 1000);
//             }
//         },

//      result: function () {
//         clearInterval(timer);
//         htmlContent.html('<h2>SCORE:</h2>');
//         $('#secondsLeft').html(preguntas.time);
//         htmlContent.append('<h3>Correct: ' + preguntas.correct + '</h3>');
//         htmlContent.append('<h3>Incorrect: ' + preguntas.incorrect + '</h3>');
//         htmlContent.append('<br><button id="again">Play Again?</button>');
//     },
    
//     reset: function () {
//         this.currentPreguntauestion = 0;
//         this.time = timer;
//         this.correct = 0;
//         this.incorrect = 0;
//         this.questionTime();
//     }
// };

// $(document).on('click', '#start', function (x) {
//     $('#clock').prepend('<h2>Time Remaining: <span id="secondsLeft">20</span> seconds</h2>');
//     preguntas.questionTime();
// });
// $(document).on('click', '#again', function (x) {
//     preguntas.reset();
// });
// $(document).on('click', '.choices', function (x) {
//     preguntas.clicked(x);
// });

