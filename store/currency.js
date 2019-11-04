var oCurrency = [
	{
		1:{
			name:'EURO', 
			converter: function(price){
				return price * randomInteger(20, 80);
			}
		}
	},
	{
		2:{
			name:'USD', 
			converter: function(price){
				return price * randomInteger(20, 80);
			}
		}
	}
];

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

module.exports = oCurrency;