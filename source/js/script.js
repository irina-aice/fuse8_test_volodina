'use strict';

(function () {
  let data = [];

  function fetchData(onFetchSuccess, onFetchError) {
    fetch(
      'https://603e38c548171b0017b2ecf7.mockapi.io/homes',
      {
        method: 'GET'
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
    }).then((json) => {
      onFetchSuccess(json);
    })
  }

  function onFetchSuccess(json) {
    data = json;

    const cardTemplate = document.querySelector('#card').content;
    const cardList = document.querySelector('.cards__list');

    const TYPE_SUPPORT = 'SupportAvailable';
    const TYPE_INDEPENDENT = 'IndependentLiving';

    for (let i = 0; i < data.length; i++) {
      const photoUrl = `https://source.unsplash.com/random/377x227?house&${i}`;

      let card = data[i];
      const cardElement = cardTemplate.cloneNode(true);

      cardElement.querySelector('.card__title').textContent = card.title;
      cardElement.querySelector('.price__information--number').textContent = card.price;
      cardElement.querySelector('.card__text').textContent = card.address;

      cardElement.querySelector('.card__image').src = photoUrl;

      cardElement.querySelector('.card').setAttribute('data-id', card.id);
      cardElement.querySelector('.card__link').setAttribute('href', `/details/${card.id}`);

      if (card.type === TYPE_SUPPORT) {
        cardElement.querySelector('.card__type--support').classList.remove('hidden');
      } else if (card.type === TYPE_INDEPENDENT) {
        cardElement.querySelector('.card__type--independent').classList.remove('hidden');
      }

      cardList.appendChild(cardElement);
    }
  }

  function onFetchError() {
    //
  }

  function filter(searchValue) {
    for (let i = 0; i < data.length; i++) {
      let card = data[i];

      let cardElement = document.querySelector(`.card[data-id="${card.id}"]`);

      if (card.title.toLowerCase().includes(searchValue.toLowerCase())) {
        cardElement.classList.remove('hidden');
      } else {
        cardElement.classList.add('hidden');
      }
    }

  }

  fetchData(onFetchSuccess, onFetchError);

  let searchField = document.querySelector('.form__input');
  searchField.addEventListener('input', () => {
    if (searchField.value.length === 0) {
      document.querySelectorAll('.card').forEach((cardElement) => {
        cardElement.classList.remove('hidden');
      });
    }

    if (searchField.value.length < 3) {
      return false;
    }

    filter(searchField.value);
  });
})();
