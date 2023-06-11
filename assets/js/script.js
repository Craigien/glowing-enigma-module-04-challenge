// Global variables

// Contains welcome message
var welcomeMessageEl = document.querySelector("#welcome");

// Variables for questions and score
var questionsContainerEl = document.querySelector("#questions-container");
var questionTextEl = document.querySelector("#question");
var currentScoreEl = document.querySelector("#current-score");

// Variables for scores
var highscoresEl = document.querySelector("#highscore");
var highscoreDisplayEl = document.querySelector("#highscores-display");
var highscoreButtonEl = document.querySelector("#highscore-button");
var clearHighscoreEl = document.querySelector("#clear-highscore");
var returnHighscoreEl = document.querySelector("#return-highscore");

// Variables for score form and initials input
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var initialsFormEl = document.querySelector("#initials-form");
var initialsInputEl = document.querySelector("#initials-input");

// Variable to display timer
var timerEl = document.querySelector("#time-left");

// Variable for start button
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

// Object to create variables for answer option elements
var options = {
    1: document.querySelector("#option1"),
    2: document.querySelector("#option2"),
    3: document.querySelector("#option3"),
    4: document.querySelector("#option4")
};

// Variables for timer
var timer;
var timeLeft = 0;
// Variable to keep track of score
var score;
// Tracks which question user is on
var questionCount;
// Tracks the correct answer to the current question
var correctAnswer;

// Hides the form and creates an event listener for the start quiz button
function init()
{
    initialsAndScoreEl.hidden = true;

    highscoresEl.hidden = true;

    // Runs start quiz function when user clicks start quiz button
    startButtonEl.addEventListener("click", startQuiz);

    highscoreButtonEl.addEventListener("click", viewHighscore);
}

// Shows user highscores
function viewHighscore()
{
    var quizCount = JSON.parse(localStorage.getItem("Quiz Count"));

    // Runs if no scores are recorded
    if (quizCount === null)
    {
        // Informs user that there are no scores recorded
        window.alert("No quiz scores recorded");

        return;
    }


    else
    {
        startButtonEl.hidden = true;
        highscoresEl.hidden = false;
        highscoreButtonEl.hidden = true;

        for (var i = 1; i < quizCount + 1; i++)
        {
            var quizResults = JSON.parse(localStorage.getItem("Initials and Score " + i));

            var initialsScoreDisplayEl = document.createElement("div");
            initialsScoreDisplayEl.textContent = "Initials: " + quizResults.initials + " - Score: " + quizResults.score + "%";
            highscoreDisplayEl.appendChild(initialsScoreDisplayEl);
        }

        
        console.log(quizCount);

        clearHighscoreEl.addEventListener("click", function()
        {
            // Delete local storage

            for (var i = 1; i < quizCount + 1; i++)
            {
                localStorage.removeItem("Initials and Score " + i);
            }

            localStorage.removeItem("Quiz Count");

            highscoresEl.hidden = true;
            highscoreButtonEl.hidden = false;
            startButtonEl.hidden = false;

            return;
        });

        returnHighscoreEl.addEventListener("click", function()
        {
            highscoresEl.hidden = true;
            highscoreButtonEl.hidden = false;
            startButtonEl.hidden = false;

            location.reload();

            return;
        });
    }
}

// Get quizes count
function getQuizCount()
{
    // var lastQuiz = JSON.parse(localStorage.getItem("Initials and Score"));

    var quizCount = JSON.parse(localStorage.getItem("Quiz Count"));
    
    if (quizCount === null)
    {
        return 0;
    }

    else
    {
        return parseInt(quizCount);
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
            score: score
        };

        // Add initials and score to local storage
        localStorage.setItem("Initials and Score " + quizCount, JSON.stringify(initialsAndScore));

        // Add quiz attempt number to local storage
        localStorage.setItem("Quiz Count", JSON.stringify(quizCount));

        initialsAndScoreEl.hidden = true;
        welcomeMessageEl.hidden = false;

        location.reload();
    });
}

// User completed quiz
function quizComplete()
{
    clearQuestion();

    window.alert("Quiz complete");
    window.alert("Your score was: " + score + "%");

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
    // Check selected answer

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
            // See if second option is correct answer
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
            // See if third option is correct answer
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
            // See if fourth option is correct answer
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

    currentScoreEl.textContent = "";
}

// Displays next question and ends quiz when all questions are answered
function displayQuestions()
{
    // Correct answer for current question
    correctAnswer = answers[questionCount];

    // Runs if all questions have been answered
    if (questionCount >= Object.keys(questions).length)
    {
        console.log("Quiz complete");
        console.log("Score " + score);
        quizComplete();
        return;
    }

    // Displays next question
    else
    {
        // Targets question display element
        questionTextEl.textContent = questions[questionCount][0];

        // Displays question options by looping through array in questions object
        for (var i = 1; i < Object.keys(options).length + 1; i++)
        {
            console.log(options[i]);

            var answer = options[i];

            answer.textContent = questions[questionCount][i];
        }

        currentScoreEl.textContent = "Current score: " + score + "%";

        return;
    }
}

// Starts quiz
function startQuiz()
{
    // Sets score, timer, and question count
    score = 0;
    timeLeft = 120;
    timerEl.textContent = timeLeft + " seconds left";
    questionCount = 0;

    // Hides welcome message
    welcomeMessageEl.hidden = true;
    
    // Call functions that start quiz
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

    Remove console logs
*/