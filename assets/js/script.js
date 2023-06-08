// Global variables

var welcomeMessageEl = document.querySelector("#welcome");
var questionsEl = document.querySelector("#questions");
var highScoresEl = document.querySelector("#highscores");
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-button");

var questions = {
    0: ["Text", "Answer1", "Answer2", "Answer3", "Answer4"],
    1: ["Text", "Answer1", "Answer2", "Answer3", "Answer4"],
    2: ["Text", "Answer1", "Answer2", "Answer3", "Answer4"],
    3: ["Text", "Answer1", "Answer2", "Answer3", "Answer4"],
    4: ["Text", "Answer1", "Answer2", "Answer3", "Answer4"]
}

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
        /*
        if (timeLeft >= 0)
        {
            if (complete && timeLeft > 0)
            {
                clearInterval(timer);
                // finishedQuiz();
            }
        }
        */
        if (timeLeft === 0)
        {
            clearInterval(timer);
            // noTimeLeft();
        }
    }, 1000);
}

function answerSelection()
{
    // Check answer
}

function clearQuestion()
{
    questionsEl.children[0].textContent = "";

    do
    {
        questionsEl.children[1].removeChild(questionsEl.children[1].firstChild)
    }
    while (questionsEl.children[1].firstChild);
}

function displayQuestions()
{
    for (var i = 0; i < 1; i++)
    {
        questionsEl.children[0].textContent = questions[i][0];

        for (var j = 1; j < 5; j++)
        {
            var answer0 = document.createElement("li");
            answer0.textContent = questions[i][j];

            questionsEl.children[1].append(answer0.textContent);
        }

        answerSelection();

        if (answerSelection == true)
        {
            // Add score
            clearQuestion();
        }
    }
}

function startQuiz()
{
    win = false;
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    startTimer();
    displayQuestions();
}

startButtonEl.addEventListener("click", startQuiz);

init();