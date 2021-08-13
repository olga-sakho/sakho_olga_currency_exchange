$( document ).ready(function() {


	$.getJSON("/js/currency.json", function(currency) {
	console.log(currency);

	$.getJSON("/js/codeAndCountry.json", function(code) {
	console.log(code); 


		var divCurrency = document.createElement('div')
		$(divCurrency).addClass('divCurr').appendTo('body')
		
		var divSelect = document.createElement('div')
		$(divSelect).addClass('sellDiv').appendTo('.divCurr')

		var textDiv = document.createElement('div')
		$(textDiv).addClass('divText').text('Отдаем: ').appendTo('.sellDiv')
		
		var sellSelect = document.createElement('select')
		$(sellSelect).addClass('sell').appendTo('.sellDiv')
		
		var inputSell = document.createElement('input')
		inputSell.setAttribute('type',"number");
		$(inputSell).addClass('sellInput').appendTo('.sellDiv')
		
		var divSelect2 = document.createElement('div')
		$(divSelect2).addClass('buyDiv').appendTo('.divCurr')

		var textDiv2 = document.createElement('div')
		$(textDiv2).addClass('divText2').text('Получаем: ').appendTo('.buyDiv')
		
		var buySelect = document.createElement('select')
		$(buySelect).addClass('buy').appendTo('.buyDiv')
		
		var inputBuy = document.createElement('input')
		inputBuy.setAttribute('type',"number");
		$(inputBuy).addClass('buyInput').appendTo('.buyDiv')
		

			$.each(currency, function(index,value)  {
				$.each(code, function(index1,value1)  {
					
					if(value1['currencyCode'] == value['currencyCodeA']){
						 //currency.filter(x => !code.includes(x));

						var sellOption = document.createElement('option')
						$('<option>', {class: 'sellOption', name:value['currencyCodeA'], value:value['rateSell'] || value['rateCross'], text : value1['countryCode'] + '  ' + value1['nameOfCurrency'] }).appendTo(sellSelect)

						var buyOption = document.createElement('option')
						$('<option>', {class: 'buyOption',name:value['currencyCodeA'], value:value['rateBuy'] || value['rateCross'], text : value1['countryCode'] + '  ' + value1['nameOfCurrency'] }).appendTo(buySelect)

					}	
					
					
				})
			})	
				$('.sell').change(function() {
							$('.sellInput').on('input', function() {
								$('.buy').click(function() {
										var selected1 = $(".sellOption:selected")
										var selected2 = $(".buyOption:selected")
						  				var result = ($('.sellInput').val() * $(selected1).val())/$(selected2).val() 
						  				console.log($('.sellInput').val(), $(selected1).val(), $(selected2).val())
											$('.buyInput').val(Math.round(result))
								})
							})	
				})

				function changeFunction () {
					var selected1 = $(".sellOption:selected")
					var selected2 = $(".buyOption:selected")
	  				var result = ($('.sellInput').val() * $(selected1).val())/$(selected2).val() 
	  				console.log($('.sellInput').val(), $(selected1).val(), $(selected2).val())
						$('.buyInput').val(Math.round(result))
				}

				$('.sell').on('change', changeFunction) 
					$('.sellInput').on('input', changeFunction)
						$('.buy').on('change',changeFunction)

		})

	})

})