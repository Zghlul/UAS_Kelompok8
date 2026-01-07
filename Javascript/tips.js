$(document).ready(function() {

    $('.kotak').click(function() {
        $(this).next('.buka').toggle(520); 
        $(this).toggleClass('expanded');
    });

    $('.kotak').hover(
        function() {
            $(this).addClass('question-hover');
        },
        function() {
            $(this).removeClass('question-hover');
        }
         
    );

});

  document.querySelectorAll("a").forEach(link => {
    if (link.href && !link.href.includes("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
          window.location = link.href;
        }, 300);
      });
    }
  });