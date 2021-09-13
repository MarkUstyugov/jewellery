const menuButton = document.querySelector('.burger-btn');
const header = document.querySelector('.header');
const body = document.querySelector('.page');
const filterButton = document.querySelector('.catalog__filter-open');
const filter = document.querySelector('.filter');
const closeFilterButton = document.querySelector('.filter__button-close');
const noJs = document.querySelector('.no-js');

if (noJs) {
  body.classList.remove('no-js');
  header.classList.remove('header--menu');
}

if (filterButton) {
  filterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filter.classList.toggle('filter--open');
  });
}

if (closeFilterButton) {
  closeFilterButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filter.classList.remove('filter--open');
  });
}

if (menuButton) {
  menuButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    menuButton.classList.toggle('header__menu-button--closed');
    header.classList.toggle('header--menu');
    body.classList.toggle('no-scroll');
  });
}

document.querySelectorAll('.faq__question').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;

    if (parent.classList.contains('faq__item--active')) {
      parent.classList.remove('faq__item--active');
    } else {
      document
        .querySelectorAll('.faq__item')
        .forEach((child) => child.classList.remove('faq__item--active'))

      parent.classList.add('faq__item--active')
    }
  })
)

document.querySelectorAll('.filter__button').forEach((item) =>
  item.addEventListener('click', () => {
    const parent = item.parentNode;
    parent.classList.toggle('filter__item--active')

  })
)

let swiper;

const sliderContainer = document.querySelector('.new__slider');
const paginationBlock = document.querySelector('.slider-pagination');
const currentDot = document.querySelector('.slider-mobile-pagination__current');
const totalDots = document.querySelector('.slider-mobile-pagination__total');

const BULLET_ACTIVE = 'swiper-pagination-bullet-active';
const MOBILE_BREAKPOINT = 767;

const initSwiper = () => {
  swiper = new window.Swiper('.swiper', {
    loop: true,
    slidesPerGroup: 2,
    slidesPerView: 2,
    centeredSlides: false,
    spaceBetween: 30,
    centeredSlidesBounds: true,

    pagination: {
      el: document.querySelector('.slider-pagination'),
      clickable: 'true',
      renderBullet(index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.new__slider-button--next',
      prevEl: '.new__slider-button--prev',
    },

    breakpoints: {
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1023: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  });
}

const getBullets = () => {
  let bullets;
  if (paginationBlock) {
    bullets = paginationBlock.children;
  }
  return bullets;
}

const setMobileTotalBullet = (bullets) => {
  let totalBullets = bullets.length;

  return totalBullets;
}

const setMobileCurrentBullet = (bullets) => {
  let currentBullet;
  Array.from(bullets).forEach((element) => {
    if (element.classList.contains(BULLET_ACTIVE)) {
      currentBullet = +element.textContent;
    }
  });

  return currentBullet;
}

const renderMobilePagination = (bullets) => {
  totalDots.textContent = setMobileTotalBullet(bullets);
  currentDot.textContent = setMobileCurrentBullet(bullets);
}

const realIndexChangeHandler = (bullets) => {
  swiper.on('transitionEnd', function () {
    renderMobilePagination(bullets);
  });
}

const setMobilePagination = () => {
  let bullets = getBullets();
  realIndexChangeHandler(bullets);
}

const breakpointChangeHandler = () => {
  let viewport = document.documentElement.clientWidth;

  if (viewport < MOBILE_BREAKPOINT) {
    setMobilePagination();
  }
}

const initMobilePagination = () => {
  let bullets = getBullets();
  renderMobilePagination(bullets);
}

const initSlider = () => {
  if (sliderContainer) {
    initSwiper();
    initMobilePagination();
    breakpointChangeHandler();
    swiper.on('breakpoint', breakpointChangeHandler);
  }
}

initSlider();

const overlay = document.querySelector('.overlay');
const loginLink = document.querySelectorAll('.login-link');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.login__close-button');
const modalEmail = document.querySelector('[name=login-email]');
const loginForm = document.querySelector('.login__form');

let isStorage = true;
let emailStorage = '';

try {
  emailStorage = localStorage.getItem('emailStorage');
} catch (err) {
  isStorage = false;
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const modalShow = () => {
  overlay.classList.add('overlay--open');
  modal.classList.add('modal--open');
  body.classList.add('no-scroll');
  modalEmail.focus();
  modalClose();

  if (emailStorage) {
    emailStorage.value = emailStorage;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (evt) => {
      if (!modalEmail.value) {
        evt.preventDefault();
      } else {
        if (isStorage) {
          localStorage.setItem('emailStorage', modalEmail.value);
        }
      }
    });
  }
}

const modalClose = () => {
  closeModalBtn.addEventListener('click', closeModalButton);
  document.addEventListener("click", closeModalOverlay);
  window.addEventListener("keydown", closeModalEsc);
}

const closeModalButton = () => {
  overlay.classList.remove('overlay--open');
  modal.classList.remove('modal--open');
  if (!header.classList.contains('header--menu')) {
    body.classList.remove('no-scroll');
  }

  closeModalBtn.removeEventListener('click', closeModalButton);
  document.removeEventListener("click", closeModalOverlay);
  window.removeEventListener("keydown", closeModalEsc);
}

const closeModalOverlay = (evt) => {
  let target = evt.target;
  if (!target.closest(".login-link")) {
    if (!target.closest(".modal")) {
      overlay.classList.remove('overlay--open');
      modal.classList.remove('modal--open');
      if (!header.classList.contains('header--menu')) {
        body.classList.remove('no-scroll');
      }

      closeModalBtn.removeEventListener('click', closeModalButton);
      document.removeEventListener("click", closeModalOverlay);
      window.removeEventListener("keydown", closeModalEsc);
    }
  }
}

const closeModalEsc = (evt) => {
  if (isEscEvent(evt)) {
    if (modal.classList.contains("modal--open")) {
      evt.stopPropagation();
      overlay.classList.remove('overlay--open');
      modal.classList.remove('modal--open');
      if (!header.classList.contains('header--menu')) {
        body.classList.remove('no-scroll');
      }

      closeModalBtn.removeEventListener('click', closeModalButton);
      document.removeEventListener("click", closeModalOverlay);
      window.removeEventListener("keydown", closeModalEsc);
    }
  }
}

loginLink.forEach((item) => {
  item.addEventListener('click', modalShow);
})

const loginLinks = document.querySelectorAll('.login-link');

loginLinks.forEach((item) => {
  item.removeAttribute('href');
})

let swiperCatalog;

const initSwiperCatalog = () => {
  swiperCatalog = new window.Swiper('.catalog__slider', {
    loop: true,
    slidesPerView: 1,
    // autoHeight: true,
    pagination: {
      el: document.querySelector('.catalog__slider-pagination'),
      clickable: 'true',
      renderBullet(index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.catalog__slider-button-next',
      prevEl: '.catalog__slider-button-prev',
    },
  });
}
const initSliderCatalog = () => {
  initSwiperCatalog();
}

initSliderCatalog();

const trapFocus = (element) => {
  var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener('keydown', (evt) => {
    var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

    if (!isTabPressed) {
      return;
    }

    if ( evt.shiftKey ) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        evt.preventDefault();
        }
      } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        evt.preventDefault();
        }
      }
  });
}
if (modal) {
  trapFocus(modal);
}