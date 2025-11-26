document.addEventListener('DOMContentLoaded', function () {
    const productElements = document.querySelectorAll('.mp_products_el');

    productElements.forEach(el => {
        el.addEventListener('click', function () {
            this.classList.toggle('act');
        });
    });

    document.querySelectorAll('.menu_bottom_col_el.has_child').forEach(item => {
        item.addEventListener('click', function() {
            const parentCol = this.closest('.menu_bottom_col');
            if (parentCol) {
                parentCol.classList.toggle('act');
            }
        });
    });


    const menuBtn = document.querySelector('.platformSocMenuBtn');
    const menuContent = document.querySelector('.platformSocMenuBtnContent');

    // Переключение меню при клике на кнопку
    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал обработчик document
        menuContent.classList.toggle('act');
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function (e) {
        if (!menuContent.contains(e.target) && !menuBtn.contains(e.target)) {
            menuContent.classList.remove('act');
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function () {

    const ANIMATION_DURATION = 2000; // 2 секунды показа
    const FADE_DURATION = 0;
    const intro = document.getElementById('fp_welcome');
    const simpleAnimWheel = document.getElementById('simpleAnimWheel');

    if (intro) {
        setTimeout(() => {
            intro.classList.add('fade-out');
            setTimeout(() => {
                document.body.classList.remove('intro-active');
            }, FADE_DURATION);

        }, ANIMATION_DURATION);
    }

    if(simpleAnimWheel){
        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                simpleAnimWheel.classList.add('slide-animation');
            } else {
                simpleAnimWheel.classList.remove('slide-animation');                
            }
        })
        }, {
        threshold: 0.7
        })

        observer.observe(simpleAnimWheel)        
    }

});


document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const slide = entry.target;
      const previewItems = slide.querySelectorAll('.preview-item');

      if (entry.intersectionRatio >= 0.7) {
        slide.classList.add('active');
        previewItems.forEach(item => item.classList.add('active'));
      } else {
        slide.classList.remove('active');
        previewItems.forEach(item => item.classList.remove('active'));
      }
    });
  }, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  });

  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
});