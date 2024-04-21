let movieNameRef = document.getElementById('movie_name');
let searchBtn = document.getElementById('search_btn');
let result = document.getElementById('result');
let btnMode = document.querySelector('.btn_mode');

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  // Si le champ input est vide

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Merci d'entrer un nom de film</h3>`;
  }
  // Si le champ Input n'est pas vide
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // Si le film existe dans la base de données
        if (data.Response == 'True') {
          result.innerHTML = `
                    <div class="info">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="assets/star.png">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(',').join(
                                  '</div><div>'
                                )}</div>
                            </div>
                            <div class="content">
                                <h3>Plot:</h3>
                                <p>${data.Plot}</p>
                                <h3>Cast:</h3>
                                <p>${data.Actors}</p>
                            </div>
                        </div>
                        <img src=${data.Poster} class="poster">
                    </div>
                        
                `;
        }

        // Si le film n'existe pas dans la base de données
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // Si une erreur se produit
      .catch(() => {
        result.innerHTML = `<h3 class="msg">>Il y a une erreur</h3>`;
      });
  }
};

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);

//  je souhaite lorsuqe j'appuie sur le bonton darkmode que le bg du body devient blanc : pour cela je parts d'un gb sombre

// si bg blanc lorsque je rappuie sur le bouton je reviens à l'état initial

darkmode = true;

btnMode.addEventListener('click', () => {
  if (darkmode) {
    document.documentElement.style.setProperty('--bgColor', '#fff');
    document.documentElement.style.setProperty('--textColor', '#171718');
    btnMode.textContent = 'Mode clair';
    darkmode = false;
  } else {
    document.documentElement.style.setProperty('--bgColor', '#171718');
    document.documentElement.style.setProperty('--textColor', '#fff');
    btnMode.textContent = 'Mode sombre';
    darkmode = true;
  }
});
