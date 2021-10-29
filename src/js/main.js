import API from './fetchCountries';
import refs from './refs';
import debounce from 'lodash.debounce';
import layoutCard from '../layouts/layoutCard.hbs';
import layoutList from '../layouts/layoutList.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

refs.inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  console.log(refs.inputRef.value);

  if (!refs.inputRef.value) {
    return onClearCountriList();
  }
  onClearCountriList();
  API.fetchCountries(refs.inputRef.value).then(onSearchCountry).catch(onMistake);
}

function onClearCountriList() {
  refs.boxCardRef.innerHTML = '';
}

function onSearchCountry(country) {
  console.log(country);
  if (country.length > 10) {
    error({ title: 'Too many matches found. Please enter a more specific query!' });
  } else if (country.length === 1) {
    onMarupCountryCard(country);
  } else if (country.length <= 10) {
    onMarkupCountryList(country);
  } else if (country.status === 404) {
    onMistake();
  }
}

function onMarupCountryCard(country) {
  const countryCard = layoutCard(country);
  refs.boxCardRef.innerHTML = countryCard;
}

function onMarkupCountryList(country) {
  const countryList = layoutList(country);
  refs.boxCardRef.innerHTML = countryList;
}

function onMistake() {
  error({ title: 'Sorry, no results were found for your request.' });
}
