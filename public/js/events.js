var cart = [];
var produtos = '';
showcase = {
    init : function () {
      this.createList();

      var time = setInterval(function(){
      	if($('#showcase_content .conteiner .row_itens .item .buy').length > 0){
      		clearInterval(time);
		      showcase.addProd();
		      showcase.showCart();
		      showcase.removeProduct();
		      showcase.closeCart();
		    }
	    },50);
    },
    createList : function () {
        $.ajax({
          type:"GET",
          url:"../data/products.json",
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          data: "{}",
          dataType: "json",
          success: function(data) {
              produtos = data.products;
              $.each(produtos, function(){
                  var real = this['price'].toString().split('.')[0];
                  var cents = parseFloat(this['price'].toString().split('.')[1]);
                  var valor = parseFloat(real);
                            var parcela = 3;
                            var totalParcela = valor / parcela;
                  var vitrine = '<div class="item" data-id="'+this['id']+'">'
                      +'<img src="'+this['imagem']+'">'
                      +'<p class="title">'+this['title']+'</p>'
                      +'<p class="price"><span class="real">R$</span>'+real+'<span class="cents">,'+cents+'0</span></p>'
                      +'<p class="parcel">Ou em até 3x de '+totalParcela.toFixed(2)+'</p>'
                      +'<button class="buy">Adicionar</button>'
                  +'</div>';

                  $('#showcase_content .conteiner .row_itens').append(vitrine);
              });
          },
          error: function(data) {
                  alert("Error in Processing-----" + data.status);
          }
        });
    },
    addProd : function (data) {
        $('#showcase_content .conteiner .row_itens .item .buy').click(function(){
            var item_showcase = $(this).parents('.item'),
                id = item_showcase.attr('data-id'),
                title = item_showcase.find('.title').text(),
                price = item_showcase.find('.price').text(),
                img = item_showcase.find('img').attr('src'),
                qty = 1;

                $('.topo .cart .cart-fixed .list-products li h1').each(function(){
                    if($(this).text() == title){
                        qty = qty + 1;
                        $(this).parent().find('.qtd').text('Quantidade:'+qty);
                        var titleAdd = item_showcase.find('.title').text();
                        $(this+':contains("'+titleAdd+'")').remove();
                    }
                });

                $('.topo .cart .cart-fixed').addClass('open');

                cart.push('<li>'
                    +'<span class="close">x</span>'
                    +'<small>'+id+'</small>'
                    +'<div class="image"><img src="'+img+'"></div>'
                    +'<h1 class="title">'+title+'</h1>'
                    +'<p class="qtd">Quantidade:'+qty+'</p>'
                    +'<p class="priceCart">'+price+'</p>'
                +'</li>');

                cart = cart.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
            });

            $('.topo .cart .cart-fixed .list-products li .title').each(function(){
                console.log($(this).text());
                console.log($(title).text());                                                                       
            });

            showcase.createListCart();
        });
    },
    showCart : function(){
        $('.topo .cart').click(function(){
            $('.topo .cart .cart-fixed').addClass('open');
        });
    },
    closeCart : function(){
        $('body').on('click','.topo .cart .cart-fixed .closeCart',function(){
            $('.topo .cart .cart-fixed').removeClass('open');
        });
    },
    createListCart : function(){
        var showcase_products = $('.list-products'),
            list = '';

        var teste = $.each(cart, function(value){
            list = value;
        });

        showcase_products.html(teste);

        var qtd = $('.topo .cart .cart-fixed .head-car small');
        qtd = parseInt(qtd.text()) + 1;
        $('.topo .cart .cart-fixed .head-car small').text(qtd);

        showcase.totalCart();      
    },
    removeProduct : function (){
        $('body').on('click','.topo .cart .cart-fixed .list-products li .close',function(){
            $(this).parent().remove();
            var qtd = $('.topo .cart .cart-fixed .head-car small');
            qtd = parseInt(qtd.text()) - 1;
            $('.topo .cart .cart-fixed .head-car small').text(qtd);
        });
    },
    totalCart : function (){
        var prices = $('.topo .cart .cart-fixed .list-products li .priceCart');
        prices.each(function(){
            var total = parseFloat($(this).text().split('R$')[1].replace(',', '.'));
            console.log(total);
            if(prices.length > 1){
                total += parseFloat($(this).text().split('R$')[1].replace(',', '.'));
            }
            $('.subtotal').text('R$'+total.toFixed(2));
        });
    }

};

showcase.init();