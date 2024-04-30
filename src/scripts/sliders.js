
if (document.querySelector('.slider-main__body')) {
    let swiper = new Swiper('.slider-main__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 20,
        watchOverflow: true,
        speed: 800,
        // loop: true,
        loopAdditionalSlides: 5,
        preloadImage: false,
        parallax: true,

        pagination: {
            el: '.slider-main__dotts',
            clickable: true,
        },

        navigation: {
            nextEl: '.slider-main .slider-arrow_next',
            prevEl: '.slider-main .slider-arrow_prev',
        },

        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },

        breakpoints: {
            520: {
                slidesPerView: 2,
                spaceBetween: 32
            },
        }
    });

    // swiper.slideTo(1, false,false);
};
if (document.querySelector('.slider-list__body')) {
    let swiper = new Swiper('.slider-list__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 22,
        watchOverflow: true,
        speed: 800,
        // loop: true,
        loopAdditionalSlides: 5,
        preloadImage: false,
        parallax: true,
        // allowa musedown mouseup work propertly
        touchStartPreventDefault: false,

        pagination: {
            el: '.slider-list__dots',
            clickable: true,
        },

        navigation: {
            nextEl: '.slider-list__arrows .slider-arrow_next',
            prevEl: '.slider-list__arrows .slider-arrow_prev',
        },

        breakpoints: {
            1061: {
                slidesPerView: 3,
                // spaceBetween: 20
            },
            767.98: {
                slidesPerView: 2,
                // spaceBetween: 20
            },

        }


    });

    // swiper.slideTo(1, false,false);
};

