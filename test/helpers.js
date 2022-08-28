
//https://github.com/Aisse-258/bigint-isqrt/blob/master/main.js
var sqrt = function (value) {
	if (value < 2n) {
		return value;
	}

	if (value < 16n) {
		return BigInt(Math.floor(Math.sqrt(Number(value))));
	}
	
	if(value < (1n << 52n)){
		var x1 = BigInt(Math.floor(Math.sqrt(Number(value))))-3n;
	} else {
		var x1 = (1n << 52n) - 2n;
	}

	let x0 = -1n;
	while((x0 !== x1 && x0 !== (x1 - 1n))){
		x0 = x1;
		x1 = ((value / x0) + x0) >> 1n;
	}
	return x0;
}

var liquidity = function (amountA, amountB) {
	return sqrt( BigInt(amountA)*BigInt(amountB) ) 
}

// 1 fee = 0.1%
var getAmountOut = function (amountIn, reserveIn, reserveOut, fee) {
	amountInWithFee = BigInt(amountIn) * (BigInt("1000") - BigInt(fee) );
	numerator = BigInt(amountInWithFee) * BigInt(reserveOut);
	denominator = (BigInt(reserveIn) * BigInt(1000)) + BigInt(amountInWithFee);
	return BigInt(numerator) / BigInt(denominator); // + BigInt(1) ;
}

// 1 fee = 0.1%
var getAmountIn = function (amountOut, reserveIn, reserveOut, fee) {
	numerator = BigInt(reserveIn) * BigInt(amountOut) * BigInt("1000");
	denominator = (BigInt(reserveOut) - BigInt(amountOut)) * (BigInt("1000") - BigInt(fee));
	return BigInt(numerator) / BigInt(denominator) + BigInt(1) ;
}

var isProporcional = function (amountA, amountB, reserveA, reserveB) {
	balanceA = BigInt(amountA) + BigInt(reserveA)
	balanceB = BigInt(amountB) + BigInt(reserveB)
	totalSupply = liquidity(reserveA, reserveB)
	return totalSupply * BigInt(amountA) / balanceA == totalSupply * BigInt(amountB) / balanceB
}

module.exports = {
	sqrt,
	liquidity,
	isProporcional,
	getAmountOut,
	getAmountIn
}