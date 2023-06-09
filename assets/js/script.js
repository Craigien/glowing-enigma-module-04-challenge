// Global variables

var welcomeMessageEl = document.querySelector("#welcome");
var questionsFormEl = document.querySelector("#questions");
var questionsContainerEl = document.querySelector("#questions-container");
var highScoresEl = document.querySelector("#highscores");
var initialsAndScoreEl = document.querySelector("#initials-and-score");
var initialsFormEl = document.querySelector("#initials-form");
var initialsInputEl = document.querySelector("#initials-input");
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
var score;
// Tracks which question user is on
var questionCount;
// Tracks the correct answer to the current question
var correctAnswer;

// Hides the form and creates an event listener for the start quiz button
function init()
{
    initialsAndScoreEl.hidden = true;

    // Runs start quiz function when user clicks start quiz button
    startButtonEl.addEventListener("click", startQuiz);
}

// Get quizes count

function getQuizCount()
{
    var lastQuiz = JSON.parse(localStorage.getItem("Initials and Score"));
    
    if (lastQuiz === null)
    {
        return 0;
    }

    else
    {
        return lastQuiz.quizCount;
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

        var initialsAndScore = {
            initials: initialsInputEl.value.trim(),
            score: score,
            quizCount: quizCount
        };

        localStorage.setItem("Initials and Score " + quizCount, JSON.stringify(initialsAndScore));

        initialsAndScoreEl.hidden = true;

        welcomeMessageEl.hidden = false;
    });
}

// User completed quiz
function quizComplete()
{
    // Message congradulations on completing the quiz

    saveResults();
}

// User ran out of time
function noTimeLeft()
{
    // Message sorry you ran out of time

    quizComplete();
}

// Timer that runs during the quiz
function startTimer()
{
    timer = setInterval(function()
    {
        timeLeft--;
        timerEl.textContent = timeLeft;
       
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

    options[1].addEventListener("click", function()
        {
            // See if first option is correct answer
            if (questions[questionCount][1] === correctAnswer)
            {
                score++;
                console.log("score: " + score);
                // Display correct prompt
                // Can do this with setInterval and add text to p element and then remove after interval reaches 3 seconds
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
                console.log("score: " + score);
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
                console.log("score: " + score);
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
                console.log("score: " + score);
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

// Removes text of current question
function clearQuestion()
{
    questionsContainerEl.children[0].textContent = "";
    
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
        clearQuestion();
        quizComplete();
        return;
    }

    else
    {
        // Targets first div
        questionsContainerEl.children[0].textContent = questions[questionCount][0];

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
    timeLeft = 300;
    timerEl.textContent = timeLeft;
    welcomeMessageEl.hidden = true;
    questionCount = 0;

    startTimer();
    displayQuestions();
    answerSelection();
}

init();

/* Current issues

After initial quiz, second quiz is skipping questions

*/