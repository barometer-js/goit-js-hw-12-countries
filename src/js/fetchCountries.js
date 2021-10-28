export default { fetchCountries };

const BASE_URL = 'https://restcountries.com/v2/';
let endPoint = 'name';

function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}${endPoint}/${searchQuery}`)
    .then(response => {
      response.json();
    })
    .catch(console.log('error'));
}
