$(function()
{
    var $list = $(".bl-list");
    var $left = $(".left");
    var $bought = $(".bought");
    var LEFT_HTML = $(".findfield-template").html();
    var BOUGHT_HTML = $(".findfield-template").html();
    var ONE_ROW_HTML = $(".one-row-template").html();

    function addProduct(title) {
        var quantity = 1;
        var $node = $(ONE_ROW_HTML);
        var $left_node = $(LEFT_HTML);
        var $bought_node = $(BOUGHT_HTML);
        var $amount_label =  $left_node.find(".amount").text(quantity);
        var $quantity_label = $node.find(".numberTitle");
        $list.append($node);
        $left_node.find(".title-name").text(title);
        $node.find(".title-name").text(title);
        $quantity_label.text(quantity);
        $node.find(".plus").click(function(){
            quantity+=1;
            $quantity_label.text(quantity);
            $left_node.find(".amount").text(quantity);
            $bought_node.find(".amount").text(quantity);
        });
        $node.find(".minus").click(function(){
            if(quantity>1) {
                quantity -= 1;
                $quantity_label.text(quantity);
                $left_node.find(".amount").text(quantity);
                $bought_node.find(".amount").text(quantity);
            }
        });
        $node.find(".x").click(function () {
            $node.remove();
            $left_node.remove();
            $bought_node.remove();
        });

        $node.find(".buy").click(function () {
            $node.addClass("is-bought");
            $left_node.hide();
            $bought_node.show();
            $bought.append($bought_node);
        });
        $node.find(".unbuy").click(function () {
            $node.removeClass("is-bought");
            $left_node.show();
            $bought_node.hide();
        });
         $left_node.find(".title-findfield").text(title);
         $left_node.find(".amount").text(quantity);
         $bought_node.find(".title-findfield").text(title);
         $bought_node.find(".amount").text(quantity);
        //$bought.hide();
        //
        $left.append($left_node);
        var edit = $node.find(".title-name");
        var newName = $node.find(".new-name");
        edit.click(function () {
          edit.hide();
           newName.show();
           newName.val(title);
           newName.focus();
        });

        newName.focusout(function () {
            newName.hide();
            edit.show();
            title = newName.val();
            if(title.trim()<12) {
                edit.text(title);
                $left_node.find(".title-findfield").text(title);
                $bought_node.find(".title-findfield").text(title);
            }
        });
        newName.keyup(function (e) {
            if (e.which == 13) {
               edit.show();
                newName.hide();
                title = newName.val();
                if(title.trim()<12) {
                    edit.text(title);
                    $left_node.find(".title-findfield").text(title);
                    $bought_node.find(".title-findfield").text(title);
                }
            }
        });
        $list.append($node);
    };
    addProduct("Помідори");
    addProduct("Сир");
    addProduct("Яблука");

    var $new_input = $(".input");
    $(".add").click(function(){
        var new_name = $new_input.val();
        if(new_name.trim()){
            addProduct(new_name);
            $new_input.val("");
            $new_input.focus();
        }
    });
});