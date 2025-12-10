document.addEventListener('DOMContentLoaded', function () {

  setupLottie('lottie_1', a1);
  setupLottie('lottie_2', a2);
  setupLottie('lottie_3', a3);
  setupLottie('lottie_4', a4);
  setupLottie('lottie_5', a5);
  setupLottie('lottie_6', a6);
  setupLottie('lottie_7', a7);
  setupLottie('lottie_8', a8);

  const carousel = document.querySelectorAll('.smp_sl_6_carousel');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('act');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.35 // Запускать, когда хотя бы 40% элемента видно
    });
    
  const observer2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('act2');
          observer2.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Запускать, когда хотя бы 10% элемента видно
    });

  carousel.forEach(track => {
    observer.observe(track);
    observer2.observe(track);
  });

  document.querySelectorAll('.smp_4_faq_el_title').forEach(item => {
      item.addEventListener('click', function() {
          const parentCol = this.closest('.smp_4_faq_el');
          if (parentCol) {
              parentCol.classList.toggle('act');
          }
      });
  });

});

function setupLottie(containerId, animationData) {
  const SPEED = 2;
  const container = document.getElementById(containerId);
  const anim = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData
  });

  let isHovered = false;

  container.addEventListener('mouseenter', () => {
    if (isHovered) return;
    isHovered = true;
    anim.setDirection(1);
    anim.setSpeed(SPEED);
    anim.play();
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    anim.setDirection(-1);
    anim.setSpeed(SPEED);
    anim.play();
  });
}