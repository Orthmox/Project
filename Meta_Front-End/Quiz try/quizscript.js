function startquiz(className) {
    const targ = document.querySelector(`.${className}`);
    if (targ) {
        const head = document.createElement("h1");
        head.textContent = "Testing";
        targ.appendChild(head);
    }
    else {
        console.log(`No element found with the class name "${className}"`);
    }
    
    hideElement('prompt');
}

function showtime() {
    const timestamp = document.querySelector(".quizbody");
    const timer = document.createElement("p");
    timer.innerHTML = new Date().toLocaleTimeString();
    timestamp.appendChild(timer);
}

setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById("clock").innerHTML = currentTime;
}, 1000);

// fetch("https://opentdb.com/api.php?amount=10&type=multiple")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const length = Object.keys(data).length;
//         console.log(length);
//     })
//     .catch(error => console.log(error));
const trivurl = "https://opentdb.com/api.php?amount=15&type=multiple";
var questionObject = {};
var questionStore = {};
var optionsObject = {};

var questionNumber = 0;
var score = 0;
let timeInterval;
async function getTrivia(apiurl) {
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        const triviaObject = {
            question: data.results,
            timeAdded: new Date()
        };
        startTimer();
        console.log(triviaObject);
        console.log("Your questionObject was last updated at ", triviaObject.timeAdded);
        return triviaObject;
    } catch(error) {
        console.error("Error fetching the trivia question:", error);
    }
}

function getQuestion(questNumb) {
    const number = questNumb;
    const size = Object.keys(questionObject.question).length;
    for(var i = 1; i < size + 1;) {
        questionStore['Question ' + i] = questionObject.question[i-1];
        i++;
    }
    
    getOptions(number);
}
function getOptions(questNumb) {
    const keys = Object.keys(questionStore);
    var i = questNumb;
    var j = 0;
    // console.log(keys[i], questionStore[keys[i]]);
    // console.log(questionStore[keys[i]]['correct_answer']);
    
    optionsObject['A'] = questionStore[keys[i]]['correct_answer'];
    optionsObject['B'] = questionStore[keys[i]]['incorrect_answers'][j];
    optionsObject['C'] = questionStore[keys[i]]['incorrect_answers'][j+1];
    optionsObject['D'] = questionStore[keys[i]]['incorrect_answers'][j+2];

    addOpt();
}
function postQuestion(questNumb) {
    var number = questNumb;
    const trivSend = document.querySelector(".question");
    const trivPost = document.createElement('h4');
    var title = document.createElement('h3');
    var detail = document.createElement('p');
    var level = document.createElement('span');

    const key = Object.keys(questionStore);

    title.textContent = key[number];
    detail.innerHTML = "Category: " + questionStore[key[number]].category; 
    trivPost.innerHTML = questionStore[key[number]].question;
    level.innerHTML = "Difficulty: " + questionStore[key[number]].difficulty;

    trivSend.appendChild(detail);
    trivSend.appendChild(level);
    trivSend.appendChild(title);
    trivSend.appendChild(trivPost);
}

async function showQuestion() {
    var number = questionNumber;
    if(Object.keys(questionObject) == 0) {
        questionObject = await getTrivia(trivurl);
        getQuestion(number);
        postQuestion(number);
        
    } else {
        getQuestion(number);
        postQuestion(number);
    }
    showElement('hidden-code');
    showElement('anscheck');
}
function addOpt() {
    
    const topLev = document.getElementById('opt');
    optionsObject = shuffleOptions(optionsObject);
    
    const optList = Object.keys(optionsObject);
    // const orderList = Object.keys(optionsObject);
    var i = 0;
    const temp = ['A', 'B', 'C', 'D'];
    for(item of optList) {
        const textNode = document.createTextNode(optionsObject[item]);
        const iter = document.createElement('h4');
        iter.innerHTML = temp[i] + '.';
        const radioIn = document.createElement('input');
        radioIn.type = 'radio';
        radioIn.name = 'choice';
        radioIn.value = item;
        iter.appendChild(radioIn);
        iter.appendChild(textNode)
        topLev.appendChild(iter);
        i++;
    }
}

function shuffleOptions(obj) {
    const shuffList = Object.entries(obj);

    for(let i = shuffList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [shuffList[i], shuffList[j]] = [shuffList[j], shuffList[i]];
    }
    return Object.fromEntries(shuffList);
}
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    const result = document.getElementById('result');
    var answer = document.createElement('p');
    const key = Object.keys(questionStore);
    var i = 0;
    if(selectedOption) {
        const value = selectedOption.value;
        var  choice = optionsObject[value];
        var correct = questionStore[key[questionNumber]]['correct_answer'];
        
        if(choice == correct) {
            result.textContent = "Correct Answer";
            result.style.color = 'green';
            
            hideElement('anscheck');
            showElement('nextQuest');
            score++;
        } else {
            result.textContent = "Wrong Answer";
            result.style.color = 'red';
            answer.textContent = " Answer: " + correct;
            result.appendChild(answer);
            showElement('nextQuest');
            hideElement('anscheck');
        }
        if(questionNumber > key.length) {
            document.getElementById("result").textContent = "END OF QUIZ";
        }
    } else {
        result.textContent = "No option selected. Please select an option";
    }
}

function next() {
    const keys = Object.keys(questionStore);
    if (questionNumber < keys.length-1) {
        questionNumber++;
    
    document.querySelector("#quest").textContent = "";
    document.querySelector("#opt").textContent = "";
    document.querySelector("#result").textContent = "";
    showQuestion();
    showElement('anscheck');
    hideElement('nextQuest');
    } else {
        document.getElementById('prompt').textContent = 'You scored ' + score + '/' + keys.length;
        pauseTimer();
        hideElement('nextQuest');
        hideElement('anscheck');
        showElement('newquiz');
        showElement('prompt')
    }
}

function retry() {
    document.querySelector("#quest").textContent = "";
    document.querySelector("#opt").textContent = "";
    showQuestion(questionNumber);
}

function showElement(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = 'none';
}

function endQuiz() {
    const start = document.getElementById('prompt');
}


function getScore() {
    const target = document.getElementById('score');
    target.textContent = "Score: " + score;
    showElement('score');
}

function newQuiz() {
    questionObject = {};
    questionStore = {};
    optionsObject = {};
    questionNumber = 0;
    score = 0;
    document.querySelector("#quest").innerHTML = "";
    document.querySelector("#opt").innerHTML = "";
    document.querySelector("#result").textContent = "";
    showQuestion();
    hideElement('newquiz');
    hideElement('prompt')
}

function startTimer() {
    const countdownTen= new Date(new Date().getTime() + 10 * 60 * 1000);
    timeInterval = setInterval(() => {
        const now = new Date();
        const distance = countdownTen - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        document.getElementById('timer').style.display = 'block';
    
        if(distance < 0) {
            clearInterval(timeInterval);
            document.getElementById("timer").innerHTML = "Time Up!";
            document.getElementById('quest').innerHTML = "";
            document.getElementById('opt').innerHTML = "";
            document.getElementById('hidden-code').innerHTML = "";
            getScore();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timeInterval);
}