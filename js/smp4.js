document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelectorAll('.smp_sl_6_carousel');

  console.log(carousel)

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
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Запускать, когда хотя бы 40% элемента видно
    });

  carousel.forEach(track => {
    observer.observe(track);
    observer2.observe(track);
  });
});