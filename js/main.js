window.addEventListener('load', function () {
    // new fullpage('#fullpage', {
    //     autoScrolling:true,
    //     scrollHorizontally: false,
    //     responsiveWidth: 1440,
    // });
    IMask(
        document.getElementById('phone-mask'),
        {
          mask: '+{7} 000 000-00-00'
        }
      )
});