
AOS.init({
    duration: 2000
});

var features = document.querySelector('.features');
var singleFeature = document.querySelector('.single-feature');


features.addEventListener('mouseover', (event) => {
    singleFeature.classList.remove('onHover');
});

features.addEventListener('mouseout', (event) => {
    singleFeature.classList.add('onHover');
});

$(document).ready(function () {
    
    $('#hamburger').click(function () { 
        $('#menu').toggle('show');
    });
});

$(function() {
    $(document).scroll(function () { 
        var $nav = $(".main-nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});