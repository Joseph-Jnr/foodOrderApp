$(document).ready(function() {

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


// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
  
    // Constructor
    function Item(name, price, image, count) {
      this.name = name;
      this.price = price;
      this.image = image;
      this.count = count;
    }
  
    // Save cart
    function saveCart() {
      sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    }
  
    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
  
    // Add to cart
    obj.addItemToCart = function (name, price, image, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, image, count);
      cart.push(item);
      saveCart();
    };
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
     obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }; 
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    };
  
    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    };
  
    // Count cart
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    };
  
    // Total price of items cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart).toLocaleString();
    };
  
    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toLocaleString();
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  // *****************************************
  // Triggers / Events
  // *****************************************

  // Add item to cart
  var cartCount = $('.cart-count').val();
  cartCount++;
  $(".orderBtn").click(function (event) {
    event.preventDefault();
    var name = $(this).data("name");
    var price = Number($(this).data("price"));
    var image = ($(this).data("image"));
    shoppingCart.addItemToCart(name, price, image, 1);
    displayCart();

    $('.cart-count').html(cartCount++);
    Toast.fire({
        icon: 'success',
        title: 'Item added'
    })
  });
  
  // Clear items
  $("#clear").click(function () {
    shoppingCart.clearCart();
    displayCart();
  });
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output +=
      "<div class='single-order' data-name='" + cartArray[i].name + "'>" +
        "<div class='main'>" +
            "<div class='left'>" +
                "<div class='img'>" +
                    "<img data-name='" + cartArray[i].name + "' src=' " + cartArray[i].image + " ' alt=''>" +
                "</div>" +
            "</div>" +
            "<div class='center price_btns'>" +
                "<div class='item-btn decrement_btn' data-name='" + cartArray[i].name + "'>-</div>" +
                "<div class='input'>" +
                    "<input class='input_qty' type='text' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "' disabled>" +
                "</div>" +
                "<div class='item-btn increment_btn' data-name='" + cartArray[i].name + "'>+</div>" +
            "</div>" +
            "<div class='right'>" +
                "<a href='#delete' data-name='" + cartArray[i].name + "' class='delete_order btn btn-delete'>" +
                    "<i class='bi bi-trash3-fill'></i>" +
                "</a>" +
            "</div>" +
        "</div>" +
        "<div class='desc'>" +
            "<p>" + cartArray[i].name + " - XOF <span data-single-price='" + cartArray[i].price + "' class='single-price'><span class='totalPrice'> " + cartArray[i].total + "</span></span></p>" +
        "</div>" +
      "</div>" 
    }
    if (output != "") {
      $('.order-wrap').removeClass('empty-cart');
      $(".order-wrap").html(output);

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
          shoppingCart.clearCart();
      });
    } else {
      $('.order-wrap').addClass('empty-cart');
      $(".order-wrap").html("<div><img src='assets/img/empty-cart-4150967-3437888.png' class='img-fluid'><p>Your cart is empty</p></div>");

      /* Success message after order */

      $('#checkout').click(function () { 
          $('.modal').css('display', 'none');
          swal
          .fire({
          title: 'Ooops',
          text: 'Add some items to your cart.',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: 'rgb(239, 169, 84)',
          confirmButtonText: 'Ok'
          })
          .then(result => {
          if (result.value) {
              window.location.href = './';
          }
          });
      });
    }
    $(".subTotalPrice").html(shoppingCart.totalCart());
    $(".cart-count").html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $(".order-wrap").on("click", ".delete_order", function (event) {
    var name = $(this).data("name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    Toast.fire({
        icon: 'success',
        title: 'Deleted!'
    })
  });
  
  // - Decrement
  $(".order-wrap").on("click", ".decrement_btn", function (event) {
    var name = $(this).data("name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
  });
  // + Increment
  $(".order-wrap").on("click", ".increment_btn", function (event) {
    var name = $(this).data("name");
    shoppingCart.addItemToCart(name);
    displayCart();
  });
  
  displayCart();
});