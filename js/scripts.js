// Карта Яндекс с кастомным маркером

ymaps.ready(function () {
  let myMap = new ymaps.Map('map', {
          center: [59.938635, 30.323118],
          zoom: 17
      }, {
          searchControlProvider: 'yandex#search'
      }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Студия Нёрдс'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map-marker.png',
          iconImageSize: [231, 190],
          iconImageOffset: [-60, -170]
      });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom'); // Убрать прокрутку карты колесиком мыши
  myMap.controls.remove('searchControl'); // Удалил поисковую строку, так как оно частично перекрывается контактами
});


// Форма "Напишите нам"

let btnOpenModal = document.querySelector('.map__btn-open-modal');
let modalCallback = document.querySelector('.modal-callback');
let btnCloseModal = document.querySelector('.modal-callback__btn-close');
let inputName = document.querySelector('.modal-callback__input-text--name');
let inputEmail = document.querySelector('.modal-callback__input-text--email');
let inputComment = document.querySelector('.modal-callback__textarea');
let btnSubmitModal = document.querySelector('.modal-callback__btn-submit');

let isStorageSupport = true;

try {
  var storageName = localStorage.getItem('name');
  var storageEmail = localStorage.getItem('email');
} catch(error) {
  isStorageSupport = false;
  console.log(error);
}

btnOpenModal.addEventListener('click', function(event) {
  event.preventDefault();
  modalCallback.classList.add('modal-callback--opened');
  inputName.focus();

  if (storageName) {
    inputName.value = storageName;
    inputEmail.focus();
  } else {
    inputName.focus();
  }

  if (storageEmail) {
    inputEmail.value = storageEmail;
    inputComment.focus();
  }
});

btnCloseModal.addEventListener('click', function(event) {
  modalCallback.classList.remove('modal-callback--opened');
  modalCallback.classList.remove('modal-callback--error');
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    if (modalCallback.classList.contains('modal-callback--opened')) {
      event.preventDefault();
      modalCallback.classList.remove('modal-callback--opened');
      modalCallback.classList.remove('modal-callback--error');
    }
  }
} );

btnSubmitModal.addEventListener('click', function(event) {
  if (! inputName.value || ! inputEmail.value || ! inputComment.value) {
    event.preventDefault();
    modalCallback.classList.remove('modal-callback--error');
    modalCallback.offsetWidth = modalCallback.offsetWidth; // не понимаю этот хак =(
    modalCallback.classList.add('modal-callback--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', inputName.value);
      localStorage.setItem('email', inputEmail.value);
    }
  }
});

// Слайдер на главной

let buttons = document.querySelectorAll('.promo-slider__btn');
let slides = document.querySelectorAll('.slide');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    // у всех кнопок и слайдов отобрать активные классы
    for (button of buttons) {
      button.classList.remove('promo-slider__btn--active');
    }

    for (slide of slides) {
      slide.classList.remove('slide--active');
    }

    // задать активный класс текущему по i слайду и кнопке
    buttons[i].classList.add('promo-slider__btn--active');
    slides[i].classList.add('slide--active');
  });
}

// наверное можно придумать такой скрипт, который удаляет все кнопки в разметке,
// считает количество li, и создает по этому числу кнопки в списке,
// таким образом можно просто добавлять в список еще один слайд и автоматом
// в списке кнопок появится еще одна кнопка
// хотя по ТЗ я это делать не должен?
