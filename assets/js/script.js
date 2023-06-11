// Global variables

var welcomeMessageEl = document.querySelector("#welcome");

var questionsContainerEl = document.querySelector("#questions-container");
var questionTextEl = document.querySelector("#question");

var highscoreEl = document.querySelector("#highscore");
var highscoreButtonEl = document.querySelector("#highscore-button");
var initialsEl = document.querySelector("#initials");
var scoresEl = document.querySelector("#scores");
var quizesCompletedEl = document.querySelector("#quizes-completed");
var clearHighscoreEl = document.querySelector("#clear-highscore");
var returnHighscoreEl = document.querySelector("#return-highscore");


var initialsAndScoreEl = document.querySelector("#initials-and-score");
var initialsFormEl = document.querySelector("#initials-form");
var initialsInputEl = document.querySelector("#initials-input");

var timerEl = document.querySelector("#time-left");

var startButtonEl = document.querySelector("#start-button");

// Object holding questions and answer options
var questions = {
    0: ["Question 1: Which method allows you to select an element from HTML?", "A) document.querySelector()", "B) document.element()", "C) document.value()", "D) HTML.element()"],
    1: ["Question 2: DOM stands for", "A) Document Object Mobile", "B) Documented Operations Model", "C) Document Object Model", "D) None of the above"],
    2: ["Question 3: Which method allows you to set the attributes of an HTML element?", "A) .setAttr()", "B) .setAttribute()", "C) .getAttribute()", "D) .selectAttribute()"],
    3: ["Question 4: Which function allows you to clear a time interval?", "A) clearInterval()", "B) stopInterval()", "C) clearTime()", "D) setInterval()"],
    4: ["Question 5: Which method allows you to add data to local storage?", "A) .localStorage()", "B) localStorage.addItem()", "C) localStorage.appendItem()", "D) localStorage.setItem()"]
};

// Array holding correct answers
var answers = ["A) document.querySelector()", "C) Document Object Model", "B) .setAttribute()", "A) clearInterval()", "D) localStorage.setItem()"];

var options = {
    1: document.querySelector("#option1"),
    2: document.querySelector("#option2"),
    3: document.querySelector("#option3"),
    4: document.querySelector("#option4")
};

var timer;
var timeLeft = 0;
var score;
// Tracks which question user is on
var questionCount;
// Tracks the correct answer to the current question
var correctAnswer;

// Hides the form and creates an event listener for the start quiz button
function init()
{
    initialsAndScoreEl.hidden = true;

    highscoreEl.hidden = true;

    // Runs start quiz function when user clicks start quiz button
    startButtonEl.addEventListener("click", startQuiz);

    highscoreButtonEl.addEventListener("click", viewHighscore);
}

function viewHighscore()
{
    var quizResults = JSON.parse(localStorage.getItem("Initials and Score"));

    if (quizResults === null)
    {
        // Message no scores recorded
        window.alert("No quiz scores recorded");

        return;
    }

    else
    {
        highscoreEl.hidden = false;
        highscoreButtonEl.hidden = true;
        console.log(quizResults.quizesTaken);
        initialsEl.textContent = "Initials: " + quizResults.initials;
        scoresEl.textContent = "Last quiz score: " + quizResults.score + "%";
        quizesCompletedEl.textContent = "Quiz taken: " + quizResults.quizesTaken + " times";

        clearHighscoreEl.addEventListener("click", function()
        {
            // Delete local storage

            localStorage.removeItem("Initials and Score");

            highscoreEl.hidden = true;
            highscoreButtonEl.hidden = false;

            return;
        });

        returnHighscoreEl.addEventListener("click", function()
        {
            highscoreEl.hidden = true;
            highscoreButtonEl.hidden = false;

            return;
        })
    }
}

// Get quizes count
function getQuizCount()
{
    // var lastQuiz = JSON.parse(localStorage.getItem("Initials and Score"));

    var lastQuiz = JSON.parse(localStorage.getItem("Quiz Count"));
    
    if (lastQuiz === null)
    {
        return 0;
    }

    else
    {
        // return parseInt(lastQuiz.quizesTaken);
        return parseInt(lastQuiz.quizCount);
    }
}

// Clear the timer and save initials and score to local storage
function saveResults()
{
    clearInterval(timer);

    timerEl.textContent = "";

    // Make form visible
    initialsAndScoreEl.hidden = false;

    // Add initials and score to local storage
    initialsFormEl.addEventListener("submit", function(event)
    {
        event.preventDefault();

        var quizCount = getQuizCount();

        // Increment number of times user has taken the quiz
        quizCount++;

        var initialsAndScore = {
            initials: initialsInputEl.value.trim(),
            score: score,
            // quizesTaken: quizCount
        };

        localStorage.setItem("Initials and Score", JSON.stringify(initialsAndScore));

        localStorage.setItem("Quiz Count", JSON.stringify(quizCount));

        initialsAndScoreEl.hidden = true;

        welcomeMessageEl.hidden = false;

        location.reload();
    });
}

// User completed quiz
function quizComplete()
{
    // Message congradulations on completing the quiz

    clearQuestion();

    window.alert("Quiz complete");

    // quizOver = true;

    saveResults();
}

// User ran out of time
function noTimeLeft()
{
    window.alert("Sorry, you ran out of time");

    quizComplete();
}

// Timer that runs during the quiz
function startTimer()
{
    timer = setInterval(function()
    {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left";
       
        if (timeLeft <= 0)
        {
            clearInterval(timer);
            timeLeft = 0;
            noTimeLeft();
        }
    }, 1000);
}

// Event listeners to listen for clicks on multiple choice answer options
function answerSelection()
{
    // Check answer

    // console.log("Question count: " + questionCount);

    options[1].addEventListener("click", function()
        {
            console.log("Question " + questions[questionCount][0] + " answer " + questions[questionCount][1]);

            // See if first option is correct answer
            if (questions[questionCount][1] === correctAnswer)
            {
                score += 20;
                console.log("score: " + score);
                // Display correct prompt
                window.alert("Correct!");

                // Can do this with setInterval and add text to p element and then remove after interval reaches 3 seconds
            }
            else
            {
                timeLeft -= 20;

                // Display incorrect prompt
                window.alert("Incorrect");
            }

            console.log("Clicked: 1");

            console.log("Question count: " + questionCount);
    
            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[2].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][2] === correctAnswer)
            {
                score += 20;
                console.log("score: " + score);

                // Display correct prompt
                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                // Display incorrect prompt
                window.alert("Incorrect");
            }

            console.log("Clicked: 2");
    
            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[3].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][3] === correctAnswer)
            {
                score += 20;
                console.log("score: " + score);

                // Display correct prompt
                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                // Display incorrect prompt
                window.alert("Incorrect");
            }

            console.log("Clicked: 3");

            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[4].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][4] === correctAnswer)
            {
                score += 20;
                console.log("score: " + score);

                // Display correct prompt
                window.alert("Correct!");
            }
            else
            {
                timeLeft -= 20;

                // Display incorrect prompt
                window.alert("Incorrect");
            }

            console.log("Clicked: 4");

            questionCount++;

            clearQuestion();

            displayQuestions();
        });
}

// Removes text of current question
function clearQuestion()
{
    questionTextEl.textContent = "";
    
    for (var i = 1; i < Object.keys(questions).length; i++)
    {
        options[i].textContent = "";
    }
}

// Displays next question and ends quiz when all questions are answered
function displayQuestions()
{
    // Correct answer for current question
    correctAnswer = answers[questionCount];

    if (questionCount >= Object.keys(questions).length)
    {
        console.log("Quiz complete");
        console.log("Score " + score);
        // clearQuestion();
        quizComplete();
        return;
    }

    else
    {
        // Targets first div
        questionTextEl.textContent = questions[questionCount][0];

        for (var i = 1; i < Object.keys(options).length + 1; i++)
        {
            console.log(options[i]);

            var answer = options[i];

            answer.textContent = questions[questionCount][i];
        }

        return;
    }
}

// Starts quiz
function startQuiz()
{
    score = 0;
    timeLeft = 120;
    timerEl.textContent = timeLeft + " seconds left";
    welcomeMessageEl.hidden = true;
    questionCount = 0;

    startTimer();
    displayQuestions();
    answerSelection();
}

init();

/* Current issues

After initial quiz, second quiz is skipping questions
    Question count is incrementing twice on second play
    Fixed with reloading page after form submission

*/

/* To do
    Highscore
        Do I want to save multiple scores and show all or just show last score

        for loop to remove highscores using quizcount stored in local storage

    Add messages

    Comments
*/