const meals = document.querySelector(".meals-cards");
const mealscontainer = document.querySelector(".meals-container");

const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s`;
const searchMealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const searchFirstUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=`;

const searchNameUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const categoryUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
const categoryMealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=`;
const areaUrl = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
const areaMealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=`;
const ingredientUrl = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
const ingredientMealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;

function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-bars");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 6) * 100
      );
  }
}

function closeSideNav() {
  let navwidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -navwidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-bars");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

getMeals();

async function getMeals() {
  const response = await fetch(`${baseUrl}`);
  3;
  if (response.status != 200) {
    return;
  }

  const data = await response.json();
  console.log(data);
  console.log(data.meals[0].strMeal);
  console.log(data.strMeal);

  displayMeals(data);
}

function displayMeals(data) {
  let mealcards = "";
  meals.innerHTML = "";
  for (let i = 0; i < data.meals.length; i++) {
    mealcards += `
    <div onclick="displayMealsDetails('${data.meals[i].idMeal}')" class="col-md-3">
    <div class="meal_item overflow-hidden position-relative">
      <img
        src="${data.meals[i].strMealThumb}"
      />
      <div 
        class="meal_item_layer position-absolute top-0 bottom-0 start-0 end-0"
      ></div>

      <div class="meal_item_content position-absolute start-0 end-0 top-100 d-flex align-items-center">
        <div class="text-center text-black">
          <h3 class="text-start "> ${data.meals[i].strMeal}</h3>
        </div>
      </div>
    </div>
  </div>  
    `;
  }
  meals.innerHTML = mealcards;
}
async function displayMealsDetails(mealId) {
  let ingredients = ``;
  let tag = ``;

  let mealResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (mealResponse.status != 200) {
    return;
  }

  let mealData = await mealResponse.json();
  console.log(mealData);

  //tags=mealData.meals[0].strTags;

  for (let i = 1; i <= 20; i++) {
    let ingredient = "";
    let measure = "";

    if (mealData.meals[0][`strIngredient${i}`] != "") {
      measure = mealData.meals[0][`strMeasure${i}`];
      ingredient = mealData.meals[0][`strIngredient${i}`];

      ingredients += `<li class="ingredient list-unstyled m-1 p-1 align-content-around">${measure} ${ingredient}</li>`;
    } else break;
  }

  let tags = mealData.meals[0].strTags?.split(",");
  if (!tags) tags = [];

  if (!tags.length == 0) {
    for (let i = 0; i < tags.length; i++) {
      tag += `<li class="alert-danger alert list-unstyled m-1 p-1 align-content-around">${tags[i]}</li>`;
    }
  }

  meals.innerHTML = "";

  meals.innerHTML += `
  <div class="col-md-4 d-block text-white">
  <div class="meal_item">
    <img class="" src="${mealData.meals[0].strMealThumb}" />
    <h3>${mealData.meals[0].strMeal}</h3>
  </div>
  </div>
  <div class="col-md-7 text-white p-2">
    <h3>Instructions</h3>
    <p>${mealData.meals[0].strInstructions}</p>
    <h4>Area: ${mealData.meals[0].strArea}</h4>
    <h4>Category: ${mealData.meals[0].strCategory}</h4>
    <h4>Ingredients: </h4>
    <ul class="container text-black g-4 d-flex flex-wrap"> 
    ${ingredients} 
    </ul>
    <h4>Tags:</h4>
    <ul class="container text-black g-4 d-flex flex-wrap">
    ${tag}
    </ul>
    <a target="_blank" href="${mealData.meals[0].strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${mealData.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
  </div>`;
}

async function getMealsCategories() {
  let response = await fetch(`${categoryUrl}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data);
  displayMealsCategories(data);
}

function displayMealsCategories(data) {
  let mealcards = "";

  for (let i = 0; i < data.categories.length; i++) {
    mealcards += `
    <div onclick="displayCategoryMeals('${
      data.categories[i].strCategory
    }')" class="col-md-3">
    <div class="meal_item overflow-hidden position-relative">
      <img
        src="${data.categories[i].strCategoryThumb}"
      />
      <div 
        class="meal_item_layer position-absolute top-0 bottom-0 start-0 end-0"
      ></div>

      <div class="meal_item_content position-absolute start-0 end-0 top-100 d-flex align-items-center">
        <div class="text-center text-black">
          <h4 class="text-center"> ${data.categories[i].strCategory}</h4>
          <p>${data.categories[i].strCategoryDescription
            .split(" ")
            .slice(0, 15)
            .join(" ")}</p>
        </div>
      </div>
    </div>
  </div>  
    `;
  }
  meals.innerHTML = mealcards;
}

async function displayCategoryMeals(category) {
  let response = await fetch(`${categoryMealsUrl}${category}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data);
  displayMeals(data);
}

async function getMealsAreas() {
  let response = await fetch(`${areaUrl}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data);
  displayMealsAreas(data);
}

function displayMealsAreas(data) {
  let mealcards = "";

  for (let i = 0; i < data.meals.length; i++) {
    mealcards += `
    <div onclick="displayAreaMeals('${data.meals[i].strArea}')" class="col-md-3 m-auto">
    <div class="meal_item align-content-center text-white">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h4>${data.meals[i].strArea}</h4>
    </div>
  </div>  
    `;
  }
  meals.innerHTML = mealcards;
}

async function displayAreaMeals(area) {
  let response = await fetch(`${areaMealsUrl}${area}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data);
  displayMeals(data);
}

async function getMealsIngredients() {
  let response = await fetch(`${ingredientUrl}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data.meals.slice(0, 20));
  displayMealsIngredients(data.meals.slice(0, 20));
}

function displayMealsIngredients(data) {
  let mealcards = "";

  for (let i = 0; i < data.length; i++) {
    mealcards += `
    <div onclick="displayIngredientMeals('${
      data[i].strIngredient
    }')" class="col-md-3 m-auto">
    <div class="meal_item align-content-center text-white">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h4>${data[i].strIngredient}</h4>
    <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
  </div>  
    `;
  }
  meals.innerHTML = mealcards;
}

async function displayIngredientMeals(ingredient) {
  let response = await fetch(`${ingredientMealsUrl}${ingredient}`);
  if (response.status != 200) {
    return;
  }

  let data = await response.json();
  console.log(data);
  displayMeals(data);
}

function displaySearch() {
  meals.innerHTML = ``;
  mealscontainer.innerHTML = ``;
  mealscontainer.innerHTML += `
  <div class="row p-4">
      <div class="col-md-6">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`;
}

async function searchByName(name) {
  meals.innerHTML = ``;
  let response = await fetch(`${searchNameUrl}${name}`);
  let data = await response.json();
  console.log(data);

  displayMeals(data);
}
async function searchByFirstLetter(letter) {
  meals.innerHTML = ``;
  let response = await fetch(`${searchFirstUrl}${letter}`);
  let data = await response.json();
  console.log(data);

  displayMeals(data);
}

function displayContactUs() {
  mealscontainer.innerHTML=``;
  mealscontainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;

}




