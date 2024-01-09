// Retrieves finalSelection value from Key: "finalSelection" or array
var finalSelection = JSON.parse(localStorage.getItem("finalSelection")) || []

// Function for displaying recently searched food items
function renderHistory () {
    var recentlySearched = document.getElementById("recentlySearched")
    recentlySearched.textContent = ""
    for (i = 0; i < finalSelection.length; i++) {
        var li = document.createElement("li")
        li.textContent = finalSelection[i]
        recentlySearched.appendChild(li)
        // If the length of finalSelection array is greater than 5, then slice selected elements
        finalSelection = finalSelection.slice(-5);
    }
}

// Calls renderHistory() function so that recently searched foods display below "Start" when page loads
renderHistory();

// Function for fetching and calling recipes for food items
// Edamam API
function fetchRecipeFromEdamam(foodItem) {
    const edamamKEY = "d1dff8cbcbfaa0cdfb00112c92e85cf8";
    const edamamID = "ea182cd5";
    const edamamURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=` + edamamID + '&app_key=' + edamamKEY + '&q=' + foodItem;
    fetch(edamamURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Math.floor(Math.random) multiplies by data.hits.length for total number of recipes possible
            // Returns a random recipe
            const recipe = data.hits[Math.floor(Math.random() * data.hits.length)].recipe;
            console.log('Recipe:', recipe);
            console.log(recipe.url);
            recipeURL = recipe.url;

        })
}

// Function for fetching and calling local restaurants which carry food items
// Maps Data API
async function searchRestaurantsWithFoodItem(foodItem) {
    const url = 'https://maps-data.p.rapidapi.com/searchmaps.php?query=' + foodItem + '&limit=50&country=us&lang=en&lat=29.749907&lng=-95.358421&offset=0&zoom=13';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ebfd22540amsh9a7885ed62c5231p1044aajsn90187589f031',
            'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        restaurantURL = 'https://' + result.data[0].website;
        console.log (result.data[0].website)
    } catch (error) {
        console.error(error);
    }
}

/* Element Selectors */

var recipeURL = "";
var restaurantURL = "";
var surveyBoxEl = document.querySelector("#survey-box");
var quizEl = document.querySelector("#survey");
// Start button
var startQuizEl = document.querySelector("#start-quiz");
var submitbtnEl = document.querySelector('#submitbtn');
// Questions
var quizHeaderEl = document.querySelector('#question');
// Answers / Options buttons
var answersEl = document.querySelector("#answers");
var answer1El = document.querySelector("#answer1");
var answer2El = document.querySelector("#answer2");
var answer3El = document.querySelector("#answer3");
var answer4El = document.querySelector("#answer4");
// Recipe button
var recipeEl = document.querySelector("#recipe");
// Restaurant button
var restaurantEl = document.querySelector("#restaurant")


/* Food Variables */

const foodCategories = [

    spicy = [
        mexican = [
            heavy = ['Burrito', 'Tacos', 'Enchiladas'],
            light = ['Nachos', 'Quesadilla', 'Fajitas']
        ],

        indian = [
            heavy = ['Butter Chicken', 'Chicken Masala', 'Tikka', 'Biryani', 'Pakora'],
            light = ['Naan', 'Samosa']
        ],

        thai = [
            heavy = ['Pad Thai', 'Khao Pad', 'Pad Kra Pao Moo'],
            light = ['Panang-Curry', 'Tom Yum Goong', 'Tom Kha Gai']
        ],
    ],

    homestyle = [
        american = [
            heavy = ['Burgers', 'Steak', 'Wings', 'Fried Chicken', 'French Fries'],
            light = ['Salad', 'Hot Dog']
        ],

        italian = [
            heavy = ['Spaghetti', 'Pizza', 'Lasagna', 'Chicken Parmesan'],
            light = ['Bruscetta', 'Risotto']
        ],

        jewish = [
            heavy = ['Knish', 'Deli Sandwich', 'Challah', 'Latkes'],
            light = ['Matzo Ball Soup', 'Cream Cheese Lox']
        ],
    ],

    asian = [
        chinese = [
            heavy = ['Orange Chicken', 'Mongolian Beef', 'Kung Pao Shrimp'],
            light = ['Eggroll', 'Lo Mein', 'Fried Rice']
        ],

        japanese = [
            heavy = ['Ramen', 'Teriyaki', 'Tempura', 'Katsudon'],
            light = ['Sushi', 'Takoyaki']
        ],

        vietnamese = [
            heavy = ['Bahn Mi', 'Com Tam', 'Bun Cha', 'Goi Cuon'],
            light = ['Spring Roll', 'Pho']
        ],
    ],

    sweet = [
        iceCream = [
            heavy = ['Ice Cream Cake', 'Banana Split', 'Milkshake'],
            light = ['Ice Cream Cone', 'Sundae', 'Mochi']
        ],

        bakery = [
            heavy = ['Cake', 'Pie', 'Brownies'],
            light = ['Crossiant', 'Cookies', 'Donut']
        ],

        french = [
            heavy = ['Mille Fueille', 'Creme Brulee', 'Tarte Tatin'],
            light = ['Crepe', 'Macarons', 'Palmiers', 'Madeleines']
        ],
    ]

]

// Empty array for userSelection
var userSelection = []

/* Quiz Functions */
// Question sets
var questions = ["What kind of food are you craving?", "What sounds more appetizing?", "Are you looking for something heavy or light?"]
// Option sets
var options = [["Spicy", "Homestyle", "Asian", "Sweet"], ["Mexican", "Indian", "Thai"], ["American", "Italian", "Jewish"], ["Chinese", "Vietnamese", "Japanese"], ["Ice Cream", "Bakery", "French"], ["Heavy", "Light"]]

var questionSelector = 0
var optionsGroup = 0

// 1st question's category options starting at index 0
var foodCategory = 0;
// 2nd question's groupID options starting at index 0
var groupID = 0;
// 3rd question's weightID options starting at index 0
var weightID = 0;
// Empty array which is populated with respective questionSelectors and optionsGroup
var questionSet = []

// Start Quiz function
function startQuiz() {
    questionSet = [questions[questionSelector], options[optionsGroup][0], options[optionsGroup][1], options[optionsGroup][2], options[optionsGroup][3]]
    quizHeaderEl.textContent = questionSet[0];
    answer1El.textContent = questionSet[1];
    answer2El.textContent = questionSet[2];
    answer3El.textContent = questionSet[3];
    answer4El.textContent = questionSet[4];
}

// Next Question function
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
        // If questionSelector is greater than length of questions, then call endQuiz() function
        endQuiz(element);
    }
}

// Function for displaying food items, recipes, and restaurants at end of quiz
function choiceDecipher() {
    // Retrieves userSelection value from Key: "userSelection"
    var userSelection = JSON.parse(localStorage.getItem("userSelection"))
    var choices = [userSelection[0].userChoice, userSelection[1].userChoice, userSelection[2].userChoice]
    console.log(choices[0] + choices[1] + choices[2])
    console.log(groupID)

    if (choices[0] === "Spicy") {
        foodCategory = 0
    } if (choices[0] === "Homestyle") {
        foodCategory = 1
    } if (choices[0] === "Asian") {
        foodCategory = 2
    } if (choices[0] === "Sweet") {
        foodCategory = 3
    } if (choices[1] === "Mexican" || choices[1] === "American" || choices[1] === "Chinese" || choices[1] === "Ice Cream") {
        groupID = 0
    } if (choices[1] === "Indian" || choices[1] === "Italian" || choices[1] === "Japanese" || choices[1] === "Bakery") {
        groupID = 1
    } if (choices[1] === "Thai" || choices[1] === "Jewish" || choices[1] === "Vietnamese" || choices[1] === "French") {
        groupID = 2
    } if (choices[2] === "Light") {
        weightID = 1
    }
    // Variable for generating a random food item from chosen Heavy or Light values
    var finalChoice = foodCategories[foodCategory][groupID][weightID][Math.floor(Math.random() * foodCategories[foodCategory][groupID][weightID].length)];
    quizHeaderEl.textContent = finalChoice
    finalSelection.push(finalChoice);
    // Key: "finalSelection" Value: finalSelection
    // Strings the finalSelection array and saves data to local storage
    localStorage.setItem("finalSelection", JSON.stringify(finalSelection))
    // Calls renderHistory function so that recently searched food displays below "Restart" at end of quiz
    renderHistory();
    // Calls Recipe fetch function with finalChoice variable
    fetchRecipeFromEdamam(finalChoice);
    // Calls Restaurant fetch function with finalChoice variable
    searchRestaurantsWithFoodItem(finalChoice);
}

// End Quiz function
function endQuiz(element) {
    console.log(element.textContent)
    console.log(localStorage.getItem("userSelection"))
    // Calls choiceDecipher function after last question is answered
    choiceDecipher();
    quizEl.setAttribute("style", "height: 600px");
    answer1El.setAttribute("style", "display: none;");
    answer2El.setAttribute("style", "display: none;");
    answer3El.setAttribute("style", "display: none;");
    answer4El.setAttribute("style", "display: none;");
    recipeEl.setAttribute("style", "display: block;");
    restaurantEl.setAttribute("style", "display: block;");
    startQuizEl.setAttribute("style", "display: block");
    // Changes text content of "Start" to "Restart"
    startQuizEl.textContent = "Restart"
    // Event listener for "Restart" button
    // After user clicks "Restart," page is reloaded
    startQuizEl.addEventListener("click", function () {
        window.location.reload();
    });
}

// Event listener for "Start" button
// After user clicks "Start," then "Start" button is hidden, answer elements are displayed, and startQuiz function is called 
startQuizEl.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("#start-quiz")) {
        var state = element.getAttribute("data-state");

        if (state === "visible") {
            element.dataset.state = "hidden";
            element.setAttribute("style", "display: none;");

        };

        surveyBoxEl.setAttribute("style", "border-style: solid; background: var(--bg-color);");
        quizEl.setAttribute("style", "height: 600px");
        answer1El.setAttribute("style", "display: block;");
        answer2El.setAttribute("style", "display: block;");
        answer3El.setAttribute("style", "display: block;");
        answer4El.setAttribute("style", "display: block;");
        // Calls startQuiz function
        startQuiz();


    };

});

// Function for saving each user choice to localStorage
function saveUserChoice(element) {
    userSelection.push({
        question: questionSet[questionSelector],
        userChoice: element.textContent
    })
    localStorage.setItem("userSelection", JSON.stringify(userSelection))
}

// Event listener for first answer button
// After user clicks "Spicy," then options group 1 is selected, and nextQuestion function is called
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

// Event listener for "Recipe" button
// After user clicks "Recipe," then a randomized recipe URL is opened in a new window
recipeEl.addEventListener("click", function (event) {
    var element = event.target;
    window.open(recipeURL);

})

// Event listener for "Restaurant" button
// After user clicks "Restaurant," then local Restaurant URL is opened in a new window
restaurantEl.addEventListener("click", function (event) {
    var element = event.target;
    window.open(restaurantURL);


})

// Quick Pick variables

var quickBtn = document.getElementById("quick-pick-btn");
var quickReturn = document.getElementById("quick-pick-return");
// Array of all food items within foodCategories array
var foodsArray = ['Taco', 'Burrito', 'Nachos', 'Fajitas', 'Quesadilla', 'Enchilada', 'Butter Chicken', 'Chicken Masala', 'Samosa', 'Naan', 'Tikka', 'Biryani', 'Pakora',
    'Tom Kha Gai', 'Pad Thai', 'Khao Pad', 'Pad Kra Pao Moo', 'Tom Yum Goong', 'Panang Curry', 'Burgers', 'Hot Dog', 'Steak', 'Wings', 'Fried Chicken', 'French Fries', 'Salad',
    'Spaghetti', 'Pizza', 'Lasagna', 'Bruscetta', 'Chicken Parmesan', 'Risotto', 'Matzo Ball Soup', 'Knish', 'Cream Cheese & Lox', 'Deli Sandwich', 'Challah', 'Latkes',
    'Orange Chicken', 'Mongolian Beef', 'Lo Mein', 'Fried Rice', 'Kung Pao Shrimp', 'Eggroll', 'Sushi', 'Ramen', 'Teriyaki', 'Tempura', 'Katsudon', 'Takoyaki',
    'Spring Roll', 'Pho', 'Bahn Mi', 'Com Tam', 'Bun Cha', 'Goi Cuon', 'Ice Cream Cone', 'Ice Cream Cake', 'Sundae', 'Banana Split', 'Milkshake', 'Mochi',
    'Cake', 'Donut', 'Cookies', 'Crossiant', 'Pie', 'Brownies', 'Crepe', 'Tarte Tatin', 'Mille Fueille', 'Macarons', 'Creme Brulee', 'Palmiers', 'Madeleines'];

// Event listener for "Quick Pick" button
// After user clicks "Feed me!," then randomized food item from foodsArray is displayed below "Quick Pick"
quickBtn.addEventListener("click", function () {
    var random = (foodsArray[Math.floor(Math.random() * foodsArray.length)]);
    quickReturn.innerHTML = random;
    console.log(random);
});
