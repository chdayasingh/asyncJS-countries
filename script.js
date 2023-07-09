'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderCountry(data, className = '') {
  const languages = Object.values(data.languages).join(' ');
  const currencies = Object.keys(data.currencies)
    .map(currency => data.currencies[currency].name)
    .join(' ');

  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>🚩</span>${data.capital[0]}</p>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencies}</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// using XMLHttpRequest object
function getCountryData1(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    renderCountry(data);
  });
}
//////////////////////////////////////////////////////////////////

// return promise of json data
function getJSON(url, errMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(errMsg);
    }
    return response.json();
  });
}

// using fetch api
function getCountryData2(country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Invalid country name'
  )
    .then(data => renderCountry(data[0]))
    .catch(err => alert(err));
}

const countries = ['China', 'India', 'United States', 'Germany', 'Russia'];

btn.addEventListener('click', function () {
  countriesContainer.innerHTML = '';
  countries.forEach(country => getCountryData2(country));
});
