

/* var features = document.querySelector('.features');
var singleFeature = document.querySelector('.single-feature');


features.addEventListener('mouseover', (event) => {
    singleFeature.classList.remove('onHover');
});

features.addEventListener('mouseout', (event) => {
    singleFeature.classList.add('onHover');
}); */


AOS.init({
    duration: 2000
});

/* Sticky Nav */

$(function() {
    $(document).scroll(function () { 
        var $nav = $(".main-nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

/* Mobile Nav Toggle */

$(document).ready(function () {
    $('#hamburger').click(function () {
        $('#menu').toggle('show');
    });
});

/* Modal Toggle */

$(document).ready(function () {
    $('#basket').click(function () {
        $('.modal').css('display', 'flex');
    });
    $('#closeModal').click(function () {
        $('.modal').css('display', 'none');
    });
});

/* About animation */

$('.features').mouseover(function () { 
    $('.single-feature').removeClass('onHover');
});

$('.features').mouseout(function () { 
    $('.single-feature').addClass('onHover');
});


$(document).ready(function() {
    var none = $(".no-record");
    $("#searchFood").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myFood1, #myFood2, #myFood3, #myFood4, #myFood5, #myFood6").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        none.toggle(!$("#myFood1, #myFood2, #myFood3, #myFood4, #myFood5, #myFood6").filter(':visible').length)
    });
});
