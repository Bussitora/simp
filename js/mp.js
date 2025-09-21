document.addEventListener('DOMContentLoaded', function () {

    const ANIMATION_DURATION = 2000; // 2 секунды показа
    const FADE_DURATION = 0;
    const intro = document.getElementById('fp_welcome');
    const fullpageContainer = document.getElementById('fullpage');

    const mediaQuery = window.matchMedia('(max-width: 1439px)');
    let fullpageInstance = null;

    // ✅ Инициализируем fullPage.js сразу, но отключаем скролл
    function initFullPage() {
        fullpageInstance = new fullpage('#fullpage', {
            licenseKey: 'OPEN_SOURCE_GPLV3_LICENSE',
            navigation: false,
            controlArrows: false,
            scrollingSpeed: 700,
            responsiveWidth: 1440,
            scrolling: false, // ❗️ Блокируем скролл до конца анимации

            afterLoad: function (origin, destination, direction) {
                const sectionIndex = getSectionIndex(destination);

                if (sectionIndex === 1) {
                    activatePreviewForSlide(lastActiveSlideIndexInSection2);
                    if (!mediaQuery.matches) {
                        attachWheelHandler();
                    }
                } else {
                    removeWheelHandler();
                }
            },

            afterSlideLoad: function (section, origin, destination, direction) {
                const sectionIndex = getSectionIndex(section);
                if (sectionIndex === 1) {
                    lastActiveSlideIndexInSection2 = destination.index;
                    activatePreviewForSlide(destination.index);
                }
            }
        });

        if (fullpageInstance && fullpageInstance.setAllowScrolling) {
            fullpageInstance.setAllowScrolling(false);
            fullpageInstance.setKeyboardScrolling(false);
        }
        // ✅ Все вспомогательные функции
        let lastActiveSlideIndexInSection2 = 0;
        let isScrolling = false;
        const throttleDelay = 800;

        function getSectionIndex(sectionObj) {
            if (typeof sectionObj.index === 'function') {
                return sectionObj.index();
            }
            if (typeof sectionObj.index === 'number') {
                return sectionObj.index;
            }
            const sections = document.querySelectorAll('.section');
            return Array.from(sections).indexOf(sectionObj.item);
        }

        function attachWheelHandler() {
            if (mediaQuery.matches) return;
            const section2 = document.querySelector('#section2');
            if (section2) {
                section2.addEventListener('wheel', handleWheelScroll, { passive: false });
            }
        }

        function removeWheelHandler() {
            const section2 = document.querySelector('#section2');
            if (section2) {
                section2.removeEventListener('wheel', handleWheelScroll);
            }
        }

        function handleWheelScroll(event) {
            if (mediaQuery.matches) {
                return;
            }

            if (isScrolling) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            const activeSlide = fullpageInstance.getActiveSlide();
            if (!activeSlide || typeof activeSlide.index !== 'number') {
                return;
            }

            const delta = event.deltaY > 0 ? 1 : -1;
            const currentSlideIndex = activeSlide.index;
            const totalSlides = document.querySelectorAll('#section2 .slide').length;
            let newIndex = currentSlideIndex + delta;

            newIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));

            if (newIndex === currentSlideIndex) {
                return;
            }

            isScrolling = true;

            activatePreviewForSlide(newIndex);
            fullpageInstance.moveTo(2, newIndex);

            setTimeout(() => {
                isScrolling = false;
            }, throttleDelay);

            event.preventDefault();
            event.stopPropagation();
        }

        function activatePreviewForSlide(slideIndex) {
            if (mediaQuery.matches) return;

            const slides = document.querySelectorAll('#section2 .slide');
            const previewItems = document.querySelectorAll('.preview-item');
            const carousel = document.querySelector('.preview-carousel');

            slides.forEach(slide => slide.classList.remove('active'));
            if (slides[slideIndex]) {
                slides[slideIndex].classList.add('active');
            }

            previewItems.forEach(el => el.classList.remove('active'));
            if (previewItems[slideIndex]) {
                previewItems[slideIndex].classList.add('active');

                setTimeout(() => {
                    const element = previewItems[slideIndex];
                    const container = carousel;
                    if (element && container) {
                        const elementTop = element.offsetTop;
                        const elementHeight = element.offsetHeight;
                        const containerHeight = container.clientHeight;
                        container.scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
                    }
                }, 50);
            }
        }

        mediaQuery.addEventListener('change', function(e) {
            if (e.matches) {
                removeWheelHandler();
            } else {
                const activeSection = fullpageInstance.getActiveSection();
                if (getSectionIndex(activeSection) === 1) {
                    attachWheelHandler();
                }
            }
        });

        document.querySelectorAll('.preview-item').forEach(item => {
            item.addEventListener('click', function () {
                if (mediaQuery.matches) return;
                const index = parseInt(this.getAttribute('data-index'));
                activatePreviewForSlide(index);
                fullpageInstance.moveTo(2, index);
            });
        });

        const initialSlides = document.querySelectorAll('#section2 .slide');
        if (initialSlides.length > 0) {
            initialSlides[0].classList.add('active');
        }
    }

    // ✅ Инициализируем fullPage.js сразу при загрузке
    initFullPage();

    // ✅ Запускаем анимацию вступления
    if (intro) {
        setTimeout(() => {
            intro.classList.add('fade-out');

            setTimeout(() => {
                // ✅ Активируем fullPage.js — включаем скролл и клавиатуру
                if (fullpageInstance && fullpageInstance.setAllowScrolling) {
                    fullpageInstance.setAllowScrolling(true);
                    fullpageInstance.setKeyboardScrolling(true);
                    fullpageInstance.moveTo(1); // Переходим на первую секцию
                }

                // Показываем контент
                fullpageContainer.classList.remove('disabled');
                document.body.classList.remove('intro-active');
            }, FADE_DURATION);

        }, ANIMATION_DURATION);
    }

});