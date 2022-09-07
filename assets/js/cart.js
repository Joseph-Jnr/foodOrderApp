$(document).ready(function() {
  
    var price = $(".single-price").data("single-price");
    var quantity = $(".input_qty").val();
    var rawTotal = price * quantity;
    var total = (price * quantity).toLocaleString();
    var subTotal = (rawTotal * 2).toLocaleString();
  
    $(".totalPrice").text(total);
    $(".subTotalPrice").text(subTotal); 
  
    $(".price_btns").on("input", ".input_qty", function() {
        let price = $(".single-price").data("single-price");
        let quantity = $(this).val();
        let rawTotal = price * quantity;
        let total = (price * quantity).toLocaleString();
        let subTotal = (rawTotal * 2).toLocaleString(); 
  
        $(".totalPrice").text(total);
        $(".subTotalPrice").text(subTotal);
    })

    let $buttonPlus = $('.increment_btn');
    let $buttonMin = $('.decrement_btn');
    let $quantity = $('.input_qty');
  
    /*For plus and minus buttons*/
    $buttonPlus.click(function() {
      $(this).closest('.price_btns').find('.input_qty').val(Math.min(parseInt($quantity.val()) + 1, 10)).trigger('input');
    });
  
    $buttonMin.click(function() {
      $(this).closest('.price_btns').find('.input_qty').val(Math.max(parseInt($quantity.val()) - 1, 1)).trigger('input');
    });



    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    /* Cart item count when order button is clicked */
    
    var cartCount = $('.cart-count').val();
    cartCount++;

    $('.orderBtn').click(function () { 
        $('.cart-count').html(cartCount++);
        Toast.fire({
            icon: 'success',
            title: 'Item added'
        })
       /*  if (cartCount <= 8) {
            $('.cart-count').html(cartCount++);
        } else {
            $('.cart-count').html(cartCount + '' + '+');
        } */
    });

    /* Success message after delete */

    $('.delete_order').click(function () { 
        Toast.fire({
            icon: 'success',
            title: 'Deleted!'
        })
    });

    /* Success message after order */

    $('#checkout').click(function () { 
        $('.modal').css('display', 'none');
        swal
        .fire({
        title: 'Success',
        text: 'Your order has been received.',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: 'rgb(0, 186, 108)',
        confirmButtonText: 'Ok'
        })
        .then(result => {
        if (result.value) {
            window.location.href = './';
        }
        });
    });

  });