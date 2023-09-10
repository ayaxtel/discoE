   
	
	
	const busd = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    const test = "http://192.168.1.70:3500/"
	const url = "https://api.binance.com/api/v3/ticker/price"
	const url2 = "https://api.binance.com/api/v3/ticker/24hr"
	const t=1000
	var counter = 0
	const ar =  []
	const arA = []
	const arB = []
	var arValor=[]
	var vmaxA = ""
	var vmaxB = ""
	var rangoA = ""
	var rangoB = ""
	var direccion =""
	var varx = ""
	var varrange = ""
	var imp = false
	let fx1
	let txt = "<ul>"
	let vartxt
	let precio
	let coinBn

	function lecoin(){
		
		let varcoin = document.getElementById('coin').value
		if(varcoin=='Ada')coinBn = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT'
		if(varcoin=='Fil')coinBn = 'https://api.binance.com/api/v3/ticker/price?symbol=FILUSDT'
		if(varcoin=='Link')coinBn = 'https://api.binance.com/api/v3/ticker/price?symbol=LINKUSDT'
		if(varcoin=='Matic')coinBn = 'https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT'
		if(varcoin=='Prom')coinBn = 'https://api.binance.com/api/v3/ticker/price?symbol=PROMUSDT'
		if(varcoin=='Test')coinBn=test

		if(coinBn){
			myMoney();//se llama la primera vez para que inicie al momento de seleccionar la moneda
			setInterval(myMoney,1*t)
		}	
	}

	

function myMoney(){	
	
	fetch(coinBn)//Recibe la data de la API
	.then( valor1 => valor1.json())//lo lleva a formato JSON
	.then( 

		valor2 => {
			
			precio = parseFloat(valor2.price)
			
			
			document.getElementById("v1").innerHTML = precio
			
		
		
			//(ar.length<6) ? ar.push(precio):alert("6 valores cargados")
			if (ar.length<20){ar.push(precio)
				txt += '<li>'+precio+'</li>'
				
			}
			
			if(counter==20){
				document.getElementById("arA").innerHTML = '<ul>' + txt +'</ul>'
				direccion = (ar[ar.length-1] == ar[0]) ? "constante": (ar[ar.length-1] > ar[0]) ? "en subida" : "en bajada"

			
			
			
			function formatUl(arrx){
				vartxt = "<ul>"
				arrx.forEach(fxt)
				vartxt += "</ul>"

				function fxt(value){
					vartxt += '<li>'+value.toFixed(4)+'</li>'
					
				}
				return vartxt
			}


			let txto="<ul>"
			
			  Object.entries(arr.af(ar)).forEach(([key, value]) => {
				console.log(value)
				txto += '<li>'+key+':'+value+ '</li>';
			  });

			  txto +="</ul>"

			
			document.getElementById('v2').innerHTML = arr.max(ar).toFixed(4)
			document.getElementById('v3').innerHTML = arr.min(ar).toFixed(4)
			document.getElementById('v4').innerHTML = arr.range(ar).toFixed(4)
			document.getElementById('v5').innerHTML = direccion
			document.getElementById('v6').innerHTML = arr.mean(ar).toFixed(4)
			document.getElementById('v7').innerHTML = arr.standardDeviation(ar).toFixed(4)
			document.getElementById('v8').innerHTML = formatUl(arr.zScores(ar));//zScore

			document.getElementById('v9').innerHTML = txto;//frecuencia absoluta


			let claves = Object.keys(arr.af(ar)); // claves = ["nombre", "color", "macho", "edad"]
			let values = Object.values(arr.af(ar));
			let xvalues = values.unshift(0)



			const barColors = ["red", "green","blue","orange","brown","black","white"];


			new Chart("myChart", {
				type: "bar",
				data: {
					labels: claves,
					datasets: [{
					backgroundColor: barColors,
					data: values
					}]
				},
				options: {
					legend: {display: false},
					title: {
					display: true,
					text: "Fluctuaciones de precio"
					}
				}
				});

			}
			
			counter++
		}//cierre de la funcion flecha que recibe valor2 como argumento
	);//cierre de segundo promise


}//cierre de funcion myMoney()








