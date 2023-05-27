import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

function showLoader() {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
}

function showError(message) {
    Notiflix.Notify.Failure(message);
}

showLoader();

// new SlimSelect({
//     select: breedSelect
// })

fetchBreeds()
    .then(breeds => {
        const breedOptions = breeds.map(({ id, name }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            return option;
        });

        breedSelect.append(...breedOptions);

        hideLoader();
    })
    .catch(error => {
        console.log('Произошла ошибка:', error);
        hideLoader();
        showError('Oops! Something went wrong! Try reloading the page!');
    });

breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    showLoader();

    fetchCatByBreed(selectedBreedId)
        .then(catData => {
            catInfo.innerHTML = `
                <img src="${catData.url}" alt="Cat Image" width="700" >
                <h3>${catData.breeds[0].name}</h3>
                <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
                <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
            `;
        })
        .catch(error => {
            console.log('Произошла ошибка:', error);
            showError('Oops! Something went wrong!');
        })
        .finally(() => {
            hideLoader();
        });
});



//----------//


// import { fetchBreeds } from './api.js';

// const API_KEY =
//   'live_P2Spxc1aBtbpL0qSmUXZGLjJn7MNbol18Wj7A0liYsyvJzqeNmL2lGZTrxZnladk';

// const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

// const select = document.querySelector('.breed-select');
// select.addEventListener('change', fetchCatByBreed);

// const container = document.querySelector('.cat-info');

// const loader = document.querySelector('.loader');
// loader.style.display = 'none';

// const error = document.querySelector('.error');
// error.style.display = 'none';

// // let breedId = '';
// //--------------------------------------------------------
// function updateSelect(data) {
//   fetchBreeds(data).then(dataFetched => {
//     // console.log(data);
//     const markupBreeds = dataFetched
//       .map(({ id, name }) => {
//         return `<option value =${id}>${name}</option>`;
//       })
//       .join('');

//     select.insertAdjacentHTML('beforeend', markupBreeds);
//   });
// }
// updateSelect();

// //-------------------------------------------------

// function fetchCatByBreed(breedId) {
//   breedId = select.value;
//   const params = new URLSearchParams({
//     api_key: API_KEY,
//     breed_ids: breedId,
//   });
//   return fetch(`${SEARCH_URL}?${params}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => console.log(error));
// }
// // fetchCatByBreed();

// function updateCatInfo(breedId) {
//   // breedId = select.value;
//   // console.log(breedId);

//   fetchBreeds(breedId).then(cats => {
//     const markupCat = cats
//       .map(({ url, name, description, temperament }) => {
//         return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${url}' alt='${name}' width='200'>`;
//       })
//       .join('');

//     // .forEach(({ url, name, description, temperament }) => {
//     //   // console.log(url);
//     //   return `<h2>${name}</h2><p>${description}</p><p>Temperament: ${temperament}</p><img src='${url}' alt='${name}' width='200'>`;
//     // });

//     container.insertAdjacentHTML('beforeend', markupCat);
//   });
// }
// updateCatInfo();
// //----------------------------------------------------