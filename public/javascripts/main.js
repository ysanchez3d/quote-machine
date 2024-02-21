const starIcon = document.getElementById("star");
const newQuoteButton = document.getElementById("new-quote");
const saveQuoteButton = document.getElementById("save-quote");
const categorySelect = document.getElementById("categories");
const currentQuoteEl = document.getElementById("currentQuote");
const currentAuthorEl = document.getElementById("currentAuthor");
const listFavoritesUL = document.getElementsByClassName("list-favorites")[0];

const categories = [
  "inspirational",
  "intelligence",
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communication",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "happiness",
  "history",
  "hope",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

const displayCategories = () => {
  let html = "";
  categories.forEach((category) => {
    let option = `<option>${category}</option>`;
    html += option
  });

  categorySelect.innerHTML = html;
}

const getNewQuote = async () => {
  const category = categorySelect.value;
  const response = await fetch("/quote?category=" + category);
  const quote = await response.json();
  return quote;
};

const addQuoteToFavorites = () => {
  favorites.unshift(currentQuote);
  saveFavorites();
  displayFavorites();
}

const removeLastFavorite = () => {
  favorites.shift(currentQuote);
  saveFavorites();
  displayFavorites();
};

const saveFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

const displayFavorites = () => {
  let html = ""
  favorites.forEach((quote) => {
    const li = `
      <li class="favorite-quote quote">
        <q class="quote">${quote.quote}</q>
        <div class="quote-info">
          <span class="category">${quote.category}</span>
          <p class="author">-${quote.author}</p>
        </div>
      </li>
    `;
    html += li;
  });

  listFavoritesUL.innerHTML = html;
}

const toggleStarIcon = () => {
  let isFilled = starIcon.classList.contains("bi-star-fill");

  if (isFilled) {
    starIcon.classList.remove("bi-star-fill");
    starIcon.classList.add("bi-star");
    removeLastFavorite()
  } else {
    starIcon.classList.remove("bi-star");
    starIcon.classList.add("bi-star-fill");
    addQuoteToFavorites();
  }
}

const updateCurrentQuote = async () => {
  currentQuote = await getNewQuote();
  currentQuoteEl.innerHTML = currentQuote.quote;
  currentAuthorEl.innerHTML = currentQuote.author;
  starIcon.classList.remove("bi-star-fill");
  starIcon.classList.add("bi-star");
}

let currentQuote;

let favorites = localStorage.getItem("favorites");
if (!favorites) {
  favorites = [];
} else {
  favorites = JSON.parse(favorites);
  displayFavorites();
}

displayCategories();
updateCurrentQuote();

categorySelect.addEventListener("change", updateCurrentQuote);
newQuoteButton.addEventListener("click", updateCurrentQuote);
starIcon.addEventListener("click", toggleStarIcon);


