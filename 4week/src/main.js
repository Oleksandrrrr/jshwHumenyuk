/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var API = require('./API.js');
    var Validation = require("./validation.js")

    API.getPizzaList(function(err, pizza_list){
        if(err) {
            return console.error(err);
        }
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    });

    $(".order-button").click(function() {
        window.location = "/order.html";
    });

    $(".edit-button").click(function(){
        window.location = "/";
    });

    $(".next-step-button").click(function(){
        if (Validation.correctInput()) {

            var totalPrice = 0;
            PizzaCart.getPizzaInCart().forEach(function(cart_item){
                totalPrice += cart_item.quantity * cart_item.pizza[cart_item.size].price
            });

            API.createOrder({
                name: $('#inputName').val(),
                phone: $('#inputPhone').val(),
                address: $('#inputAddress').val(),
                pizza: PizzaCart.getPizzaInCart(),
                price: totalPrice
            }, function(err, result){
                if(err) {
                    alert("Can't create order");
                } else {
                    LiqPayCheckout.init({
                        data: result.data,
                        signature: result.signature,
                        embedTo: "#liqpay",
                        mode: "popup"
                    }).on("liqpay.callback", function (data) {
                        //console.log(data.status);
                        //console.log(data);
                        if(data.status==="success" || data.status==="sandbox"){
                            alert("Оплата успішна");
                            //window.location = "/";
                        }
                    }).on("liqpay.ready", function (data) {
                    }).on("liqpay.close", function (data) {
                    });
                }
            });
        }
    });


    require('./googleMap');
});
