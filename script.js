var questionContainerEl = document.getElementById("questions-container")
var questionEl = document.getElementById("question")
var answerButtons = document.getElementById("answer-buttons")
var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var header = document.getElementById("header")
var paragraph = document.getElementById("paragraph")
var timeEl = document.getElementById("time")
var username = document.getElementById("name")

var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 10;

var questions = [
    {
        questions: "Commonly used data types DO NOT include:",
        answers: [
            { text: "Strings", correct: false },
            { text: "Boolean", correct: false },
            { text: "Alerts", correct: true },
            { text: "Numbers", correct: false }
        ]
    },
    {
        questions: "The string value is enclosed within _____.",
        answers: [
            { text: "Quotes", correct: true },
            { text: "Curly Brackets", correct: false },
            { text: "Parentheses", correct: false },
            { text: "Square Brackets", correct: false }
        ]
    },
    {
        questions: "How do you comment in Javascript?",
        answers: [
            { text: "//", correct: true },
            { text: "<!---->", correct: false },
            { text: "/**/", correct: false },
            { text: "<comment></comment>", correct: false }
        ]
    },
    {
        questions: "Inside which HTML element do we put the Javascript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        questions: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Terminal / Bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log()", correct: true }
        ]
    }
];

startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startButton.classList.add("hide"); // hides the start button
    header.classList.add("hide"); // hides the header
    paragraph.classList.add("hide"); // hides the paragraph
    questionContainerEl.classList.remove("hide"); // allows the display of questions
    questionEl.classList.remove("hide"); // displays the questions
    currentQuestionIndex = 0; // sets the current question on display to the first one when we start quiz

    setTime(); // add timer countdown in here
    showQuestions(); // when clicking start, this will call the showQuestions() function
}

function setTime() { // function for timer
    var timerInterval = setInterval(function () {
        timeLeft--; // this is the actual countdown of the timeLeft variable that was created globally
        timeEl.textContent = timeLeft + " seconds before thrown into the void...";
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // clears the timer
            finalScore();
        }
    }, 1000);
}

function finalScore() {
    currentQuestionIndex = 5;
    if (currentQuestionIndex === 5) {
        questionEl.classList.add("hide");
        answerButtons.classList.add("hide");
        timeEl.textContent = "Finished! Your final score is: " + score;
    }
}

function showQuestions() {
    removeAns();
    questionShown(questions[currentQuestionIndex]) // this will display the questions in the obj, starting with the first question
}

function questionShown(questions) { // this will be all the questions. will need to display answers within the answer box. will need to be able to display next question after clicking an answer
    questionEl.textContent = questions.questions
    questions.answers.forEach(answers => { // this modifies the answers
        var button = document.createElement("button") // creating buttons
        button.innerText = answers.text // setting the text in the button above to the answers in the obj
        button.classList.add("btn") // creating a class for the button
        if (answers.correct) { // if the answer is correct...
            button.dataset.correct = answers.correct; // we set the correct answer button's value to correct answer
        }
        button.addEventListener("click", chooseAnswer)
        answerButtons.appendChild(button) // created button so that we can append the button to the answerButtons
    });
};

function removeAns() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // this will remove the original answers and replace them with the answer buttons created in questionShown()
    }
}

function chooseAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct === "true";
    if (correct) {
        alert("Correct!");
        score += 1;
        removeAns();
        questionShown(questions[currentQuestionIndex += 1])
    } else {
        alert("Incorrect!")
        timeLeft -= 2;
        removeAns();
        questionShown(questions[currentQuestionIndex += 1])
    }
};
