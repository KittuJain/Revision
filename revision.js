var r = {};
exports.r = r;

r.fibonacci = function(index){
	return (index < 0 || index % 1 != 0) ? undefined : (index == 1) ? 0 : 
	(index == 2) ? 1 : r.fibonacci(index - 1) + r.fibonacci(index - 2);
};

r.readBinary = function(number){
	return parseInt(number,2);
};

r.readOctal = function(number){
	return parseInt(number,8);
};

r.readHex = function(number){
	return parseInt(number,16);
};

r.reverseText = function(text){
	return text.split('').reverse().join('');
};

r.reverseWords = function(text){
	return text.split(' ').map(reverseWord).join(' ');
};

var reverseWord = function(word){
	return r.reverseText(word);
}

r.getVowelCount = function(text){
	return text.split('').filter(getVowels).length;
};

var isVowel = function(alphabet){
	return (['a','e','i','o','u'].indexOf(alphabet.toLowerCase())>=0);
};

var getVowels = function(alphabet){
	return isVowel(alphabet); 
};

r.tidyText = function(phrase){
	return phrase.split(" ").filter(isAlphabet).join(' ');
};

var isAlphabet = function(alpha){
	return alpha;
};

r.welcome = function(input,number){
	switch(typeof(input)){
		case 'string' : return isString(input,number);
		case 'number' : return isNumber(input);
		case 'object' : return isObject(input);
		case 'undefined' : return 'who is it';
		case 'boolean' : return 'to be or not to be';
		case 'function' : return 'call that';
	};
};

var multiple_texts = function(text,numberOfTimes,value){
	if(numberOfTimes>0){
		text.push(value);
		return multiple_texts(text,numberOfTimes-1,value);
	}
	return text; 
};

var isString = function(input,number){
	var text = [];
	if(number != undefined){			
		multiple_texts(text,number,input);
		return text.join('-');		
	}
	else
		return 'hello text';
};

var isObject = function(input){
	if(Array.isArray(input)){
		var ss = " "+input.join('_');
		return 'seeya'.concat(ss).trim();
	}
	if(input == null)
		return 'oh no';

	var object_fields = Object.keys(input);
	return ('hi'+' '+object_fields).trim();
};

var isNumber = function(input){
	return (isNaN(input)) && 'hey dont count' ||
	(!isFinite(input)) && 'get out of the world' ||
	(isFloat(input)) && 'hey decimal' ||
	'hey count';
};

var isFloat = function(number){
	return number%1 != 0;
};

r.factorial = function(number){
	return (number<=0) ? 1 : (number*r.factorial(number-1));
};

r.changeToBinary = function(number){
	return parseInt(number.toString(2));
};

r.changeToOctal = function(number){
	return parseInt(number.toString(8));
};

r.changeToHex = function(number){
	return (number.toString(16));
};

r.impose = function(array1,array2){
	return array1.map(function(value1,index){
		return (!array2[index]) && value1 || value1 + array2[index];
	});
};

r.findBestVowelWord = function(arrayPhrase){
	return arrayPhrase.reduce(function(pv,cv){
		return r.getVowelCount(pv) < r.getVowelCount(cv) ? cv :pv ;
	});
};

r.findWorstVowelWord = function(arrayPhrase){
	return arrayPhrase.reduce(function(pv,cv){
		return r.getVowelCount(pv) > r.getVowelCount(cv) ? cv : pv ;
	});
};

r.range = function(value1,value2,range){
	var array = [];
	range = (!range) && 1 || range;
	addRange(array,value1,value2,range);
	return array;
};

var addRange = function(array,val1,val2,range){
	if(val1<val2){
		array.push(val1);
		return addRange(array,val1+range,val2,range)
	}
	return array;
};

r.add = function(numbers,incrementBy){
	return numbers.map(function(number){
		return number + incrementBy;
	});
};

r.calculate = function(expression){
	return eval(expression).toString();
};

r.set = function(){
	var array = Array.prototype.slice.call(arguments,0);
};

/*
describe('#set',function(){
	it('intersection of two sets finds common items two sets',function(){
		var Set = r.Set;
		var a = new Set(1,2);
		var b = new Set(2,3);
		var c = new Set(2);
		assert.ok(a.intersection(b).isEqualTo(c));
	});
})*/