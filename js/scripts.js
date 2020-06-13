// Карта Яндекс с кастомным маркером

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
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
