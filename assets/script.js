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

  var quizEl = document.querySelector("#quiz");
  var startQuizEl = document.querySelector("#start-quiz");
  var submitbtnEl = document.querySelector('#submitbtn');
  var submitline = document.querySelector('#submitline');
  
  var quizHeaderEl = document.querySelector('#question');
  var answersEl = document.querySelector("#answers");
  var answer1El = document.querySelector("#answer1");
  var answer2El = document.querySelector("#answer2");
  var answer3El = document.querySelector("#answer3");
  var answer4El = document.querySelector("#answer4");
  
  var foods = [
      spicy = [
          Mexicanfood = [
              heavy = ['Burrito', 'Tacos', 'Enchiladas'],
              light = ['Nachos', 'Quesadilla', 'Fajitas']
          ],
          Indianfood = [
              heavy = ['butter-chicken', 'chicken-masala', 'samosa', 'tikka', 'biryani', 'pakora'],
              light = ['naan']
          ],
          Thaifood = [
              heavy = ['tom-kha-gai', 'pad-thai', 'khao-pad', 'pad-kra-pao-moo', 'tom-yum-goong', 'panang-curry'],
              light = []
          ]],
  
      homestyle = [
          Americanfood = [
              heavy = ['burgers', 'hot-dog', 'steak', 'wings', 'fried-chicken', 'french-fries'],
              light = ['salad']
          ],
          Italianfood = [
              heavy = ['spaghetti', 'pizza', 'lasagna', 'chicken-parm', 'risotto'],
              light = ['bruscetta']
          ],
          Jewishfood = [
              heavy = ['knish', 'creamcheese-lox', 'deli-sammy', 'challah', 'latkes'],
              light = ['matzo-ball-soup']
          ]],

        asian = [
            Chinesefood = [
                heavy = ['orange-chicken', 'mongolian-beef', 'lo-mein', 'fried-rice', 'kung-pao-shrimp'],
                light = ['eggroll']
            ],
            Japanesefood = [
                heavy = ['ramen', 'teriyaki', 'tempura', 'katsudon'],
                light = ['sushi', 'takoyaki']
            ],
            Vietnamesefood = [
                heavy = ['pho', 'bahn-mi', 'com-tam', 'bun-cha', 'goi-cuon'],
                light = ['spring-roll']
            ]],
  
      sweet = [
          IceCream = [
              heavy = ['ice-cream-cake', 'sundae', 'banana-split', 'milkshake', 'mochi'],
              light = ['ice-cream-cone']
          ],
          Bakery = [
              heavy = ['cake', 'donut', 'cookies', 'pie', 'brownies'],
              light = ['crossiant']
          ]]
  ]
  
  var questionSet1 = ["What kind of food are you craving?", "Spicy", "Homestyle", "Asian", "Sweet", "IDK"];
  var questionSet2 = ["What sounds more appetizing?", "Mexican", "Indian", "Thai"];
  var questionSet3 = ["What sounds more appetizing?", "American", "Italian", "Jewish"];
  var questionSet4 = ["What sounds more appetizing?", "Chinese", "Vietnamese", "Asian"];
  var questionSet5 = ["Are you looking for something heavy or light?", "Heavy", "Light"];
  
  
  var questionSets = [questionSet1, questionSet2, questionSet3, questionSet4, questionSet5]
  var setSelector = 0
  
  function startQuiz() {
      quizHeaderEl.textContent = questionSets[setSelector][0];
      answer1El.textContent = questionSets[setSelector][1];
      answer2El.textContent = questionSets[setSelector][2];
      answer3El.textContent = questionSets[setSelector][3];
      answer4El.textContent = questionSets[setSelector][4];
  }
  
  function nextQuestion() {
      setSelector++;
      quizHeaderEl.textContent = questionSets[setSelector][0];
      answer1El.textContent = questionSets[setSelector][1];
      answer2El.textContent = questionSets[setSelector][2];
      answer3El.textContent = questionSets[setSelector][3];
      answer4El.textContent = questionSets[setSelector][4];
  }
  
  function endQuiz() {
  
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
          submitline.setAttribute("style", "display: block;");
          startQuiz();
  
  
      };
  
  });
  
  answer1El.addEventListener("click", function (event) {
      var element = event.target;
  

  
  
      nextQuestion();
  });
  
  answer2El.addEventListener("click", function (event) {
      var element = event.target;
  
  
  
      nextQuestion();
  });
  
  answer3El.addEventListener("click", function (event) {
      var element = event.target;
  
  
  
      nextQuestion();
  });
  
  answer4El.addEventListener("click", function (event) {
      var element = event.target;
  
  
  
      nextQuestion();
  });

  var quickBtn = document.getElementById("quick-pick-btn");
  var quickReturn = document.getElementById("quick-pick-return");
  var foodsArray = ['taco', 'burrito', 'nachos', 'fajitas', 'quesadilla', 'enchilada', 'butter-chicken', 'chicken-masala', 'samosa', 'naan', 'tikka', 'biryani', 'pakora',
  'tom-kha-gai', 'pad-thai', 'khao-pad', 'pad-kra-pao-moo', 'tom-yum-goong', 'panang-curry', 'burgers', 'hot-dog', 'steak', 'wings', 'fried-chicken', 'french-fries', 'salad',
  'spaghetti', 'pizza', 'lasagna', 'bruscetta', 'chicken-parm', 'risotto', 'matzo-ball-soup', 'knish', 'creamcheese-lox', 'deli-sammy', 'challah', 'latkes', 
  'orange-chicken', 'mongolian-beef', 'lo-mein', 'fried-rice', 'kung-pao-shrimp', 'eggroll', 'sushi', 'ramen', 'teriyaki', 'tempura', 'katsudon', 'takoyaki',
  'spring-roll', 'pho', 'bahn-mi', 'com-tam', 'bun-cha', 'goi-cuon', 'ice-cream-cone', 'ice-cream-cake', 'sundae', 'banana-split', 'milkshake', 'mochi',
  'cake', 'donut', 'cookies', 'crossiant', 'pie', 'brownies', 'crepe', 'tarte-tatin', 'mille-fueille', 'macarons', 'creme-brulee', 'palmiers', 'madeleines'];
  
  quickBtn.addEventListener("click", function() {
    var random = (foodsArray[Math.floor(Math.random() * foodsArray.length)]);
   quickReturn.innerHTML=random;
    // console.log(random);
  });
