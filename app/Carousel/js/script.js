function myCarousel(elem, custom) {
  let _$ = {
    carouselContainer: document.querySelector(elem),
    scrollSlide: 1,
    carouselPosition: 0,
    slideWidth: function() {
      width = 0;
      for(let li of this['carouselContainer'].querySelectorAll('li')) {
        if (width < li.offsetWidth) {
          width = li.offsetWidth;
        }
      };
      return width;
    },  
    scrollWidth: function() {
      return this.slideWidth() * this['scrollSlide'];
    },
    carouselWidth: function() {
      return this.slideWidth() * this.carouselContainer.querySelectorAll('li').length;
    },
  }

  for(key in custom) {
    _$[key] = custom[key];
  }

  _$['carouselContainer'].style.width = _$.scrollWidth() + 'px';
  document.querySelector('.carouselInner').style.width = _$.scrollWidth() + 'px';
   _$['carouselContainer'].insertAdjacentHTML(`beforeend`, `<button class="arrow next">⇨</button>`);
   _$['carouselContainer'].insertAdjacentHTML(`afterbegin`, `<button class="arrow prev">⇦</button>`);
  
  
  _$['carouselContainer'].addEventListener('click', scrollCarousel);
  
  function scrollCarousel(event) {
    if (event.target.classList.contains('arrow')) {
      arrowCarousel(event.target.classList[1])
    };
  }
  
  function arrowCarousel(scrollTo) {
    switch (scrollTo) {
      case 'next':
        _$['carouselPosition'] += _$.scrollWidth();
        if (_$['carouselPosition'] > (_$.carouselWidth() - _$.scrollWidth())) {
          _$['carouselPosition'] = _$.carouselWidth() - _$.scrollWidth();
        }
        break;
      case 'prev':
        _$['carouselPosition'] -= _$.scrollWidth();
        if (_$['carouselPosition'] < 0) {
          _$['carouselPosition'] = 0;
        }
        break;
    }
    document.querySelector('.carouselContent').style.transform = 'translateX(-' + _$['carouselPosition'] + 'px)';
  }
}