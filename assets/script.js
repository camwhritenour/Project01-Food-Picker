var edamamKEY = "d1dff8cbcbfaa0cdfb00112c92e85cf8";
var edamamID = "ea182cd5";
var edamamURL = "https://api.edamam.com/api/recipes/v2?type=public&app_id=ea182cd5&app_key=d1dff8cbcbfaa0cdfb00112c92e85cf8";

fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=ea182cd5&app_key=d1dff8cbcbfaa0cdfb00112c92e85cf8&cuisineType=American', {
  cache: "reload",

})
  
  .then(function (response) {
    console.log(response.status);
    return response.json();
   
  })
  .then(function (data) {
    console.log(data);
  });

var startBtn = document.getElementById('submit-btn');
const questions = [{
    question: "What was the last thing you ate?",
    answers: [{
        text: "A light snack ",
        points: 4
    },
    {
        text: "Fast food",
        points: 3
    },
    {
        text: "Steak lobster and fresh veggies",
        points: 2
    },
    {
        text: "Too busy to eat",
        points: 5
    }
]
},
{
    question: "How hungry are you right now?",
    answers: [{
        text: "I want to eat out of boredom",
        value: 2
    },
    {
        text: "I'm always looking for something in the panty",
        value: 3
    },
    {
        text: "I am preparing for my dinner right now",
        value: 4
    },
    {
        text: "I feel like I haven't eaten in a year",
        value: 5
    }
    ]
}
];
startBtn.addEventListener('click', showQuestions);

function showQuestions() {

}