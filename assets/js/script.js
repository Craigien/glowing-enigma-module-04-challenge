// Global variables

var welcomeMessageEl = document.querySelector("#welcome");
var questionsFormEl = document.querySelector("#questions");
var highScoresEl = document.querySelector("#highscores");
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-button");

var questions = {
    0: ["Text1", "Answer1", "Answer2", "Answer3", "Answer4"],
    1: ["Text2", "Answer1", "Answer2", "Answer3", "Answer4"],
    2: ["Text3", "Answer1", "Answer2", "Answer3", "Answer4"],
    3: ["Text4", "Answer1", "Answer2", "Answer3", "Answer4"],
    4: ["Text5", "Answer1", "Answer2", "Answer3", "Answer4"]
};

var answers = ["answer1", "answer1", "answer1", "answer1", "answer1"];

var options = {
    1: document.querySelector("#option1"),
    2: document.querySelector("#option2"),
    3: document.querySelector("#option3"),
    4: document.querySelector("#option4")
};

var timer;
var timeLeft = 0;
var win = false;
var score;

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



    /*
    options[1].addEventListener("click", function()
    {
        return true;
    });

    options[2].addEventListener("click", function()
    {
        return false;
    });

    options[3].addEventListener("click", function()
    {
        return false;
    });

    options[4].addEventListener("click", function()
    {
        return false;
    });
    */
}

function clearQuestion()
{
    questionsFormEl.children[0].textContent = "";

    do
    {
        questionsFormEl.children[1].removeChild(questionsFormEl.children[1].firstChild)
    }
    while (questionsFormEl.children[1].firstChild);
}

function displayQuestions()
{
    for (var i = 0; i < 1; i++)
    {
        // Targets first div
        questionsFormEl.children[0].textContent = questions[i][0];

        for (var j = 1; j < 5; j++)
        {
            console.log(options[j]);

            var answer = options[j];

            answer.textContent = questions[i][j];
        }

        answerSelection();

        if (answerSelection)
        {
            // Add score
            score++;
            console.log(score);
            clearQuestion();
        }

        if (!answerSelection)
        {
            // Subtract time
            timeLeft--;
            console.log(score);
            clearQuestion();
        }
    }
}

function startQuiz()
{
    win = false;
    score = 0;
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    welcomeMessageEl.hidden = true;

    startTimer();
    displayQuestions();
}

startButtonEl.addEventListener("click", startQuiz);

// init();