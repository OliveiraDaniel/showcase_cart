// Classe para chamar o Json.
function json(){
	var qtd;
	var retorno;

	// Resgatar valores.
	json.prototype.resgatarValores = function(){

		// Estrutura de resultado.
		$.getJSON('../data/products.json', function(data){
			this.qtd = data.usuarios.length;
			this.retorno = '';

			for (i = 0; i < this.qtd; i++){
				var titulo = data.products[i].title;
				var descricao = data.products[i].description;
				var preco = data.products[i].price;
				console.log(titulo)
				console.log(descricao)
				console.log(preco)
			}

			$('#showcase_content').html(this.retorno);
		});

	}

}

// Objeto.
var obj = new json();
obj.resgatarValores();
