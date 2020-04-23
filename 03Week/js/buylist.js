var list = $('.list > .productlist');
var notboughtlist = $('.info > div.productlist:first');
var boughtlist = $('.info > div.productlist:last');
var name = '';
var amount = 1;

$(function () {
    var productrow = $('.list > .productlist').html();
    var productrowbought = $('.info > div.productlist:first').html();
    var productrownobought = $('.info > div.productlist:last').html();
    $('html').hide();
    $('html').fadeIn(750);
    $('.find').fadeIn(750);
    $('.prodlist').remove();
    $('.notbought').remove();
    $('.boughtproducts').remove();
    addProduct('Помідори', productrow, productrowbought, productrownobought, amount);
    addProduct('Квас', productrow, productrowbought, productrownobought, amount);
    addProduct('Сир', productrow, productrowbought, productrownobought, amount);
    $('.productlist').fadeIn(750);
    $('.sumbit').click(function () {
        name = $('input.findfield').val();
        if(name !== '') {
            addProduct(name, productrow, productrowbought, productrownobought, amount);
        }
        $('input.findfield').val('');
        $('input.findfield').focus();
    });
    $('.findfield').keyup(function (e) {
        if (e.keyCode === 13) {
            name = $('input.findfield').val();
            if(name !== '') {
                addProduct(name, productrow, productrowbought, productrownobought, amount);
            }
            $('input.findfield').val('');
        }
    });
});

function addProduct(title, productrow, productrowbought, productrownobought, c) {
    var row = $(productrow);
    var row2 = $(productrowbought);
    var row3 = $(productrownobought);
    var forChange = true;
    
    //name
    row.find('.name').text(title);
    row.find('.amt').text(String(c));
    row2.find('.title').text(title);
    row2.find('.circle').text(String(c));
    row3.find('.title').text(title);
    row3.find('.circle').text(String(c));


    //delete products
    row.find('.del').click(function () {
        row.remove();
        row2.remove();
        row3.remove();
    });

    //function to buy
    row.find('.incart').click(function () {
       $(row2).fadeOut(500);
       $(row3).delay(500).fadeIn(500);
       row.find('.name').css('text-decoration', 'line-through');
       $(row.find('.minus')).fadeOut(500);
       $(row.find('.plus')).fadeOut(500);
       $(row.find('.amt')).fadeOut(500);
       $(row.find('.incart')).fadeOut(500);
       $(row.find('.del')).fadeOut(500);
       $(row.find('.amt')).fadeIn(500);
       $(row.find('.notincart')).delay(500).fadeIn(500);
       forChange = false;
    });

    //function not bought button to delete from bought products
    row.find('.notincart').click(function () {
        $(row3).fadeOut(500);
        $(row2).delay(500).fadeIn(500);
        row.find('.name').css('text-decoration', 'none');
        $(row.find('.amt')).fadeOut(500);
        $(row.find('.notincart')).fadeOut(500);
        $(row.find('.minus')).delay(500).fadeIn(500);
        $(row.find('.plus')).delay(500).fadeIn(500);
        $(row.find('.amt')).fadeIn(500);
        $(row.find('.incart')).delay(500).fadeIn(500);
        $(row.find('.del')).delay(500).fadeIn(500);
        forChange = true;
    });

    //function plus
    row.find('.plus').click(function () {
        c++;
        row.find('.amt').fadeOut(250, function () {
            row.find('.amt').text(String(c));
            row.find('.amt').fadeIn(250);
        });
        row2.find('.circle').text(String(c));
        row3.find('.circle').text(String(c));
        if (c > 1) {
            row.find('.minus').css('background-color', 'rgb(229, 43, 80)');
            row.find('.minus').css('box-shadow', '0 1px 0 0 rgb(140, 0, 0)');
            row.find('.minus').mouseenter(function () {
                $(this).css('background-color', 'rgb(173, 9, 9)');
            });
            row.find('.minus').mouseleave(function () {
                $(this).css('background-color', 'rgb(196, 10, 10)');
            });
            row.find('.minus').mousedown(function () {
                $(this).css('background-color', 'rgb(140, 0, 0)');
            });
            row.find('.minus').mouseup(function () {
                $(this).css('background-color', 'rgb(173, 9, 9)');
            });
        }
        if (c > 9) {
            row2.find('.circle').css('padding-left', '3px');
        }
        else {
            row2.find('.circle').css('padding-left', '6px');
        }
    });

    //function minus
    row.find('.minus').click(function () {
        if (c > 1) {
            c--;
            row.find('.amt').fadeOut(250, function () {
                row.find('.amt').text(String(c));
                row.find('.amt').fadeIn(250);
            });
            row2.find('.circle').text(String(c));
            row3.find('.circle').text(String(c));
        }
        if (c == 1) {
            row.find('.minus').css('background-color', 'rgb(239, 158, 158)');
            row.find('.minus').css('box-shadow', 'none');
            row.find('.minus').mouseenter(function () {
                $(this).css('background-color', 'rgb(239, 158, 158)');
            });
            row.find('.minus').mouseleave(function () {
                $(this).css('background-color', 'rgb(239, 158, 158)');
            });
            row.find('.minus').mousedown(function () {
                $(this).css('background-color', 'rgb(239, 158, 158)');
            });
        }
        if (c > 9) {
            row2.find('.circle').css('padding-left', '3px');
        }
        else {
            row2.find('.circle').css('padding-left', '6px');
        }
    });

    //function change name
    row.find('.name').click(function () {
        if (forChange) {
            $(this).css('display', 'none');
            row.find('.change').css('display', 'inline-block');
            row.find('input.changename').focus();
            row.find('input.changename').val(title);
            $(document).mousedown(function (e) {
                var cont = $('.change');
                if (cont.has(e.target).length === 0){
                    title = row.find('input.changename').val();
                    row.find('.change').css('display', 'none');
                    row.find('.name').text(title);
                    row2.find('.title').text(title);
                    row3.find('.title').text(title);
                    row.find('.name').css('display', 'inline-block');
                }
            });
        }
    });

    $(row3).hide();
    list.append(row);
    notboughtlist.append(row2);
    boughtlist.append(row3);
}