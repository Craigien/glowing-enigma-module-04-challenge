// Global variables

var welcomeMessageEl = document.querySelector("#welcome");
var questionsFormEl = document.querySelector("#questions");
var questionsContainerEl = document.querySelector("#questions-container");
var highScoresEl = document.querySelector("#highscores");
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector("#start-button");

var questions = {
    0: ["Text1", "Option1", "Option2", "Option3", "Option4"],
    1: ["Text2", "Option1", "Option2", "Option3", "Option4"],
    2: ["Text3", "Option1", "Option2", "Option3", "Option4"],
    3: ["Text4", "Option1", "Option2", "Option3", "Option4"],
    4: ["Text5", "Option1", "Option2", "Option3", "Option4"]
};

var answers = ["Option1", "Option1", "Option1", "Option1", "Option1"];

var options = {
    1: document.querySelector("#option1"),
    2: document.querySelector("#option2"),
    3: document.querySelector("#option3"),
    4: document.querySelector("#option4")
};

var timer;
var timeLeft = 0;
// var win = false;
var score;

// Tracks which question user is on
var questionCount;

function quizComplete()
{
    // Message congradulations on completing the quiz

    // timeLeft = 0;

    // Input initials

    // Add initials and score to local storage
}

function noTimeLeft()
{
    // Message sorry you ran out of time

    quizComplete();
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
                // quizComplete;
            }
        }
        */
        if (timeLeft << 0)
        {
            timeLeft = 0;
        }

        if (timeLeft <<= 0)
        {
            clearInterval(timer);
            noTimeLeft();
        }
    }, 1000);
}

function answerSelection()
{
    // Check answer

    // Correct answer for current question
    var correctAnswer = answers[questionCount];

    options[1].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][1] === correctAnswer)
            {
                score++;
                // Display correct prompt
            }
            else
            {
                timeLeft -= 20;
                // Display incorrect prompt
            }

            console.log("Clicked: 1");
    
            questionCount++;

            clearQuestion();

            displayQuestions();
        });

        options[2].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][2] === correctAnswer)
            {
                score++;
                // Display correct prompt
            }
            else
            {
                timeLeft -= 20;
                // Display incorrect prompt
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
                score++;
                // Display correct prompt
            }
            else
            {
                timeLeft -= 20;
                // Display incorrect prompt
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
                score++;
                // Display correct prompt
            }
            else
            {
                timeLeft -= 20;
                // Display incorrect prompt
            }

            console.log("Clicked: 4");

            questionCount++;

            clearQuestion();

            displayQuestions();
        });
}

function clearQuestion()
{
    questionsContainerEl.children[0].textContent = "";
    
    for (var i = 1; i < Object.keys(questions).length; i++)
    {
        options[i].textContent = "";
    }
}

function displayQuestions()
{
    if (questionCount >= Object.keys(questions).length)
    {
        console.log(questionCount);
        console.log("Quiz complete");
        clearQuestion();

        // quizComplete();
        return;
    }

    else
    {
        console.log(questionCount);

        // Targets first div
        questionsContainerEl.children[0].textContent = questions[questionCount][0];

        for (var j = 1; j < Object.keys(options).length + 1; j++)
        {
            console.log(options[j]);

            var answer = options[j];

            answer.textContent = questions[questionCount][j];
        }
    }

    return;
    
    /*
    // Object.keys(questions).length
    for (var i = 0; i < 1; i++)
    {
        // Targets first div
        questionsContainerEl.children[0].textContent = questions[i][0];

        for (var j = 1; j < Object.keys(options).length + 1; j++)
        {
            console.log(options[j]);

            var answer = options[j];

            answer.textContent = questions[i][j];
        }

        // Need to wait for user click before iterating outside for loop

        answerSelection();
    }
    */
}

function startQuiz()
{
    // win = false;
    score = 0;
    timeLeft = 300;
    timerEl.textContent = timeLeft;
    welcomeMessageEl.hidden = true;

    questionCount = 0;

    startTimer();
    displayQuestions();
    answerSelection();
}

startButtonEl.addEventListener("click", startQuiz);

/*
    var flag;
    
    options[1].addEventListener("click", function()
    {
        flag = true;

        console.log("Clicked");

        if (flag)
        {
            // Add score
            score++;
            console.log("Score: " + score);
            // clearQuestion();
        }

        
        if (!flag)
        {
            // Subtract time
            timeLeft--;
            console.log("Score: " + score);
            // clearQuestion();
        }
        

        return true;
    });
    */

// Wait for user click to continue

        // var waitFlag = true;
        
        // var continueFlag = answerSelection();





        /*
        var selection = 0;

        options[1].addEventListener("click", function()
        {
            console.log("Clicked: 1");
    
            selection = 1;

            
            score++;

            clearQuestion();
            

            // return;
        });

        options[2].addEventListener("click", function()
        {
            console.log("Clicked: 2");
    
            selection = 2;

            // return;
        });

        options[3].addEventListener("click", function()
        {
            console.log("Clicked: 3");
    
            selection = 3;

            // return;
        });

        options[4].addEventListener("click", function()
        {
            console.log("Clicked: 4");
    
            selection = 4;

            // return;
        });
        */
        
/*
        if (selection === 1)
        {
            score++;
            console.log("Score: " + score);
            clearQuestion();
        }
        if (selection !== 1)
        {
            timeLeft--;
            console.log("Score: " + score);
            clearQuestion();
        }
*/

        /*
        do
        {
            if (continueFlag)
            {
                waitFlag = false;
            }
        }
        while (waitFlag);
        */