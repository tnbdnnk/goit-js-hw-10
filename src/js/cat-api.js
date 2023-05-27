// https://api.thecatapi.com/v1/breeds&api_key=live_3VJTa88B5XZ47bLcZPUlqWYuA54xKfWRJBVAPIdLdUP1BKBe1IqYSaB5zkSuGvy2 //

const URL = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_3VJTa88B5XZ47bLcZPUlqWYuA54xKfWRJBVAPIdLdUP1BKBe1IqYSaB5zkSuGvy2';

function fetchBreeds() {
    return fetch(URL, {
        headers: {
        'x-api-key': API_KEY,
        },
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Произошла ошибка при выполнении запроса');
        }
        return response.json();
    })
    .then(data => {
        return data.map(({ id, name }) => ({ id, name }));            
    })
    .catch(error => {
        console.log('Ошибка:', error.message);
        throw error;
    });
}

function fetchCatByBreed(breedId) {
    const url = `${IMAGE_URL}?breed_ids=${breedId}`;

    return fetch(url, {
        headers: {
        'x-api-key': API_KEY,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Произошла ошибка при выполнении запроса');
        }
        return response.json();
    })
    .then(data => {
        return data[0]; // Возвращаем первый объект из массива
    })
    .catch(error => {
        console.log('Ошибка:', error.message);
        throw error;
    });
}

export { fetchBreeds, fetchCatByBreed };


//---------------------//


// const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
// const API_KEY = 'live_3VJTa88B5XZ47bLcZPUlqWYuA54xKfWRJBVAPIdLdUP1BKBe1IqYSaB5zkSuGvy2';

// function fetchBreeds() {
//     const params = new URLSearchParams({
//         api_key: API_KEY,
//     });
//     return fetch(`${BREEDS_URL}?${params}`)
//         .then(response => {
//             console.log(response);
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         })
//         .catch(error => console.log(error));
// }

// export { fetchBreeds };