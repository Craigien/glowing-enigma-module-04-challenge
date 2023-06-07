// Global variables

var welcomeMessageEl = document.querySelector("#welcome");
var questionsEl = document.querySelector("#questions");
var highScoresEl = document.querySelector("#highscores");
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-button");

var timer;
var timeLeft = 0;
var win = false;

function init()
{
    

}

function startTimer()
{
    timer = setInterval(function()
    {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft >= 0)
        {
            if (complete && timeLeft > 0)
            {
                clearInterval(timer);
                finishedQuiz();
            }
        }

        if (timeLeft === 0)
        {
            clearInterval(timer);
            noTimeLeft();
        }
    }, 1000);
}

function startQuiz()
{
    win = false;
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    startTimer();
}

startButtonEl.addEventListener("click", startQuiz);

init();