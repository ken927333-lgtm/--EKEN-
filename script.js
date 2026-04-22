console.log("読み込まれた");
const movieNameInput = document.getElementById("movieNameInput");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const movieCards = document.querySelector(".movie_cards");

const getData = async () => {
  try {
    const movieName = movieNameInput.value;
    result.textContent = "";
    if (!movieName.trim()) {
      result.textContent = "お探しの映画名を入力してください";
      movieCards.innerHTML = "";
    } else {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${movieName}`,
      );
      const data = await response.json();
      console.log(data);

      movieCards.innerHTML = "";

      if (data.length === 0) {
        result.textContent = "入力された映画を見つけることができませんでした";
        console.log("muri");
      } else {
        data.forEach((item) => {
          const card = document.createElement("div");
          movieCards.appendChild(card);
          card.classList.add("card__active");

          const movieImage = document.createElement("img");
          movieImage.src = item.show.image.medium;

          const movieName = document.createElement("p");
          movieName.textContent = item.show.name; /*genres score*/

          const movieGenres = document.createElement("p");
          movieGenres.textContent = item.show.genres;

          const movieAverage = document.createElement("p");
          movieAverage.textContent = item.show.rating.average;

          card.append(movieImage, movieName, movieGenres, movieAverage);
        });
      }
    }
  } catch (error) {
    result.textContent = "errorやり直してください";
  }
  movieNameInput.value = "";
};

btn.addEventListener("click", () => {
  console.log("クリックされた");
  getData();
});
