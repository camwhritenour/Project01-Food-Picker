var edamamKEY = "d1dff8cbcbfaa0cdfb00112c92e85cf8";
var edamamID = "ea182cd5";
var edamamURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=ea182cd5&app_key=d1dff8cbcbfaa0cdfb00112c92e85cf8";

function getRecipes() {
    fetch(edamamURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}
//getRecipes();

/* Element Selectors */

var quizEl = document.querySelector("#survey");
var startQuizEl = document.querySelector("#start-quiz");
var submitbtnEl = document.querySelector('#submitbtn');

var quizHeaderEl = document.querySelector('#question');
var answersEl = document.querySelector("#answers");
var answer1El = document.querySelector("#answer1");
var answer2El = document.querySelector("#answer2");
var answer3El = document.querySelector("#answer3");
var answer4El = document.querySelector("#answer4");


/* Food Variables */

const foodCategories = [

    spicy = [
        mexican = [
            heavy = ['Burrito', 'Tacos', 'Enchiladas'],
            light = ['Nachos', 'Quesadilla', 'Fajitas']
        ],

        indian = [
            heavy = ['butter-chicken', 'chicken-masala', 'tikka', 'biryani', 'pakora'],
            light = ['naan', 'samosa']
        ],

        thai = [
            heavy = ['pad-thai', 'khao-pad', 'pad-kra-pao-moo'],
            light = ['panang-curry', 'tom-yum-goong', 'tom-kha-gai']
        ],
    ],

    homestyle = [
        american = [
            heavy = ['burgers', 'steak', 'wings', 'fried-chicken', 'french-fries'],
            light = ['salad', 'hot-dog']
        ],

        italian = [
            heavy = ['spaghetti', 'pizza', 'lasagna', 'chicken-parm'],
            light = ['bruscetta', 'risotto']
        ],

        jewish = [
            heavy = ['knish', 'deli-sammy', 'challah', 'latkes'],
            light = ['matzo-ball-soup', 'creamcheese-lox']
        ],
    ],

    asian = [
        chinese = [
            heavy = ['orange-chicken', 'mongolian-beef', 'kung-pao-shrimp'],
            light = ['eggroll', 'lo-mein', 'fried-rice']
        ],

        japanese = [
            heavy = ['ramen', 'teriyaki', 'tempura', 'katsudon'],
            light = ['sushi', 'takoyaki']
        ],

        vietnamese = [
            heavy = ['bahn-mi', 'com-tam', 'bun-cha', 'goi-cuon'],
            light = ['spring-roll', 'pho']
        ],
    ],

    sweet = [
        iceCream = [
            heavy = ['ice-cream-cake', 'banana-split', 'milkshake'],
            light = ['ice-cream-cone', 'sundae', 'mochi']
        ],

        bakery = [
            heavy = ['cake', 'pie', 'brownies'],
            light = ['crossiant', 'cookies', 'donut']
        ],

        french = [
            heavy = ["cake"],
            light = ["croissant"]
        ],
    ]

]


var userSelection = []

/* Quiz Functions */

var questions = ["What kind of food are you craving?", "What sounds more appetizing?", "Are you looking for something heavy or light?"]
var options = [["Spicy", "Homestyle", "Asian", "Sweet"], ["Mexican", "Indian", "Thai"], ["American", "Italian", "Jewish"], ["Chinese", "Vietnamese", "Japanese"], ["Ice Cream", "Bakery", "French"], ["Heavy", "Light"]]

var questionSelector = 0
var optionsGroup = 0

var foodCategory = 0;
var groupID = 0;
var weightID = 0;
var questionSet = []
if (questionSelector > 2) { endQuiz() }

function startQuiz() {
    questionSet = [questions[questionSelector], options[optionsGroup][0], options[optionsGroup][1], options[optionsGroup][2], options[optionsGroup][3]]
    quizHeaderEl.textContent = questionSet[0];
    answer1El.textContent = questionSet[1];
    answer2El.textContent = questionSet[2];
    answer3El.textContent = questionSet[3];
    answer4El.textContent = questionSet[4];
}

function nextQuestion(element) {
    questionSelector++
    if (questionSelector < questions.length) {

        questionSet = [questions[questionSelector], options[optionsGroup][0], options[optionsGroup][1], options[optionsGroup][2], options[optionsGroup][3]]
        quizHeaderEl.textContent = questionSet[0];
        answer1El.textContent = questionSet[1];
        answer2El.textContent = questionSet[2];
        answer3El.textContent = questionSet[3];
        answer4El.textContent = questionSet[4];
        if (questionSelector === 1) { answer4El.setAttribute("style", "display: none;") };
        if (questionSelector === 2) { answer3El.setAttribute("style", "display: none;") };

        console.log(questionSet)
        console.log(questionSelector)
    }
    else {
        endQuiz(element);
    }
}


function choiceDecipher() {
    var userSelection = JSON.parse(localStorage.getItem("userSelection"))
    var choices = [userSelection[0].userChoice, userSelection[1].userChoice, userSelection[2].userChoice]
    console.log(choices[0]+ choices[1]+ choices[2])
    console.log(groupID)
  
    if (choices[0] === "Spicy"){
      foodCategory = 0
    } if (choices[0] === "Homestyle"){
      foodCategory = 1
    } if (choices[0] === "Asian"){
      foodCategory = 2
    } if (choices[0] === "Sweet") {
      foodCategory = 3
    } if (choices[1] === "Mexican" ||choices[1] === "American" ||choices[1] === "Chinese" ||choices[1] === "Ice Cream") {
      groupID = 0
    } if (choices[1] === "Indian" ||choices[1] === "Italian" ||choices[1] === "Japanese" ||choices[1] === "Bakery") {
      groupID = 1
    } if (choices[1] === "Thai" ||choices[1] === "Jewish" ||choices[1] === "Vietnamese" ||choices[1] === "French") {
      groupID = 2
    } if (choices[2] === "Light") {
      weightID = 1
    }
    var finalChoice = foodCategories[foodCategory][groupID][weightID][0];
    quizHeaderEl.textContent = finalChoice
  }

function endQuiz(element) {
    console.log(element.textContent)
    console.log(localStorage.getItem("userSelection"))
    choiceDecipher();
    quizEl.setAttribute("style", "height: 600px");
    answer1El.setAttribute("style", "display: none;");
    answer2El.setAttribute("style", "display: none;");
    answer3El.setAttribute("style", "display: none;");
    answer4El.setAttribute("style", "display: none;");
}

startQuizEl.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("#start-quiz")) {
        var state = element.getAttribute("data-state");

        if (state === "visible") {
            element.dataset.state = "hidden";
            element.setAttribute("style", "display: none;");

        };

        quizEl.setAttribute("style", "height: 600px");
        answer1El.setAttribute("style", "display: block;");
        answer2El.setAttribute("style", "display: block;");
        answer3El.setAttribute("style", "display: block;");
        answer4El.setAttribute("style", "display: block;");
        startQuiz();


    };

});

function saveUserChoice(element) {
    userSelection.push({
        question: questionSet[questionSelector],
        userChoice: element.textContent
    })
    localStorage.setItem("userSelection", JSON.stringify(userSelection))
}

answer1El.addEventListener("click", function (event) {
    var element = event.target;

    saveUserChoice(element);

    if (element.textContent === "Spicy") {
        optionsGroup = 1
    } else {
        optionsGroup = 5
    }
    console.log(optionsGroup)
    nextQuestion(element)
})

answer2El.addEventListener("click", function (event) {
    var element = event.target;

    saveUserChoice(element);

    if (element.textContent === "Homestyle") {
        optionsGroup = 2
    } else {
        optionsGroup = 5
    }
    console.log(optionsGroup)
    nextQuestion(element)
})

answer3El.addEventListener("click", function (event) {
    var element = event.target;

    saveUserChoice(element);

    if (element.textContent === "Asian") {
        optionsGroup = 3
    } else {
        optionsGroup = 5
    }

    console.log(optionsGroup)
    nextQuestion(element)
})

answer4El.addEventListener("click", function (event) {
    var element = event.target;

    saveUserChoice(element);

    if (element.textContent === "Sweet") {
        optionsGroup = 4
    }


    nextQuestion()
})


var quickBtn = document.getElementById("quick-pick-btn");
var quickReturn = document.getElementById("quick-pick-return");
var foodsArray = ['taco', 'burrito', 'nachos', 'fajitas', 'quesadilla', 'enchilada', 'butter-chicken', 'chicken-masala', 'samosa', 'naan', 'tikka', 'biryani', 'pakora',
    'tom-kha-gai', 'pad-thai', 'khao-pad', 'pad-kra-pao-moo', 'tom-yum-goong', 'panang-curry', 'burgers', 'hot-dog', 'steak', 'wings', 'fried-chicken', 'french-fries', 'salad',
    'spaghetti', 'pizza', 'lasagna', 'bruscetta', 'chicken-parm', 'risotto', 'matzo-ball-soup', 'knish', 'creamcheese-lox', 'deli-sammy', 'challah', 'latkes',
    'orange-chicken', 'mongolian-beef', 'lo-mein', 'fried-rice', 'kung-pao-shrimp', 'eggroll', 'sushi', 'ramen', 'teriyaki', 'tempura', 'katsudon', 'takoyaki',
    'spring-roll', 'pho', 'bahn-mi', 'com-tam', 'bun-cha', 'goi-cuon', 'ice-cream-cone', 'ice-cream-cake', 'sundae', 'banana-split', 'milkshake', 'mochi',
    'cake', 'donut', 'cookies', 'crossiant', 'pie', 'brownies', 'crepe', 'tarte-tatin', 'mille-fueille', 'macarons', 'creme-brulee', 'palmiers', 'madeleines'];

quickBtn.addEventListener("click", function () {
    var random = (foodsArray[Math.floor(Math.random() * foodsArray.length)]);
    quickReturn.innerHTML = random;
    // console.log(random);
});
