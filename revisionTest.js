var assert = require('chai').assert;
var r = require('./revision.js').r;

describe('#fibonacci',function(){
	it('finds the nth fibonacci number',function(){
		assert.equal(0,r.fibonacci(1));
		assert.equal(1,r.fibonacci(2));
		assert.equal(1,r.fibonacci(3));
		assert.equal(3,r.fibonacci(5));
	});

	it('returns undefined for negative numbers',function(){
		assert.equal(undefined,r.fibonacci(-1));
		assert.equal(undefined,r.fibonacci(-5));
	});

	it('returns undefined for decimal numbers',function(){
		assert.equal(undefined,r.fibonacci(-0.56));
		assert.equal(undefined,r.fibonacci(5.67));
	});
});

describe('#readBinary',function(){
	it('readBinary reads numbers as binary',function(){
		assert.equal(0,r.readBinary(0));
		assert.equal(1,r.readBinary(1));
		assert.equal(2,r.readBinary(10));
		assert.equal(9,r.readBinary(1001));
		assert.equal(255,r.readBinary(11111111))
	});

	it('readBinary reads text as binary',function(){
		assert.equal(0,r.readBinary('0'));
		assert.equal(1,r.readBinary('1'));
		assert.equal(2,r.readBinary('10'));
		assert.equal(9,r.readBinary('1001'));
		assert.equal(255,r.readBinary('11111111'));
	});
});

describe('#readOctal',function(){
	it('readOctal reads numbers as octal',function(){
		assert.equal(0,r.readOctal(0));
		assert.equal(1,r.readOctal(1));
		assert.equal(8,r.readOctal(10));
		assert.equal(513,r.readOctal(1001));
		assert.equal(299593,r.readOctal(1111111));
	});

	it('readOctal reads text as octal',function(){
		assert.equal(0,r.readOctal('0'));
		assert.equal(1,r.readOctal('1'));
		assert.equal(8,r.readOctal('10'));
		assert.equal(513,r.readOctal('1001'));
		assert.equal(299593,r.readOctal('1111111'));
	});
});

describe('#readHex',function(){
	it('readHex reads text as octal',function(){
		assert.equal(123,r.readHex('7b'));
		assert.equal(255,r.readHex('ff'));
		assert.equal(1023,r.readHex('3ff'));
	});
});

describe('#reverseText',function(){
	it('reverseText reverses given text', function(){
		var x = "hello.";
		var y = ".olleh";
		assert.equal(r.reverseText(x),y);
	});

	it('reverseText reverses given text with spaces', function(){
		var x = "hello. hello.";
		var y = ".olleh .olleh";
		assert.equal(r.reverseText(x),y);
	});

	it('reverseText reverses different words with spaces', function(){
		var x = "hello. ola";
		var y = "alo .olleh";
		assert.equal(r.reverseText(x),y);
	});
});

describe('#reverseWords',function(){
	it('reverseWords reverses words in sentance', function(){
		var x = 'The world is a very wide space. Or is it not?';
		var y = 'ehT dlrow si a yrev ediw .ecaps rO si ti ?ton';
		assert.deepEqual(r.reverseWords(x),y);
	});
});

describe('#getVowelCount',function(){
	it('getVowelCount gives the count of vowels', function(){
		assert.equal(r.getVowelCount('morning'),2);
		assert.equal(r.getVowelCount('cooling'),3);
		assert.equal(r.getVowelCount('i am'),2);
	});

	it('getVowelCount gets the count of vowels with capital letters', function(){
		assert.equal(r.getVowelCount('Owl'),1);
		assert.equal(r.getVowelCount('cOOling'),3);
		assert.equal(r.getVowelCount('I am not'),3);
	});
});

describe('#tidyText',function(){
	it('tidyText removes extra spaces between words', function(){
		var x = 'The  world    is a very    wide space.  ';
		var y = 'The world is a very wide space.';
		assert.deepEqual(r.tidyText(x),y);
	});
});

describe('#welcome',function(){
	it('welcome responds with hello text for text', function(){
		assert.equal('hello text', r.welcome('hmm'));
		assert.equal('hello text', r.welcome('Here I am'));
		assert.equal('hello text', r.welcome('42'));
		assert.equal('hello text', r.welcome(''));
	});

	it('welcome responds with hey count for numbers', function(){
		assert.equal('hey count', r.welcome(2));
		assert.equal('hey count', r.welcome(420));
		assert.equal('hey count', r.welcome(0));
		assert.equal('hey count', r.welcome(-25));
	});

	it('welcome responds with hey decimal for decimal numbers',function(){
		assert.equal('hey decimal', r.welcome(2.1));
		assert.equal('hey decimal', r.welcome(420.45));
		assert.equal('hey decimal', r.welcome(0.1));
		assert.equal('hey decimal', r.welcome(-25.01));	
	});

	it('welcome responds with hey dont count for bad calculation',function(){
		assert.equal('hey dont count',r.welcome(0/'a'));
		assert.equal('hey dont count',r.welcome('a' * 0));
	});

	it('welcome responds with get out for infinite answers',function(){
		var x = 0;
		assert.equal('get out of the world',r.welcome(1/0));
		assert.equal('get out of the world',r.welcome(12*42/x));
	});

	it('welcome responds with oh no for null', function(){
		assert.equal('oh no',r.welcome(null));
	});

	it('welcome responds with who is it for undefined', function(){
		var x;
		assert.equal('who is it',r.welcome(x));
	});

	it('welcome responds with hi fields for objects', function(){
		assert.equal('hi', r.welcome({}));
		assert.equal('hi one,two', r.welcome({one:1,two:2}));
		assert.equal('hi compute,three', r.welcome({compute:function(){return 5},three:3}));
	});

	it('welcome responds with see ya items for arrays', function(){
		assert.equal('seeya', r.welcome([]));
		assert.equal('seeya 1_2', r.welcome([1,2]));
		assert.equal('seeya 1_2_3', r.welcome([1,2,3]));
		assert.equal('seeya compute_three_2_0', r.welcome(['compute','three',2,0]));
	});

	it('test.welcome responds with multiple texts with two arguments', function(){
		assert.equal('goldy-goldy-goldy-goldy-goldy',r.welcome('goldy',5));
		assert.equal('a-a-a-a-a-a-a',r.welcome('a',7));
	});

	it('test.welcome responds with to be for boolean', function(){
		assert.equal('to be or not to be', r.welcome(true));
		assert.equal('to be or not to be', r.welcome(false));
		assert.equal('to be or not to be', r.welcome(5<6));
	});

	it('test.welcome_responds_with_call_that_for_functions',function(){
		var x = function(){console.log('hmm');};
		var y = function(z){return function(){z();}};
		assert.equal('call that', r.welcome(function(){}));
		assert.equal('call that', r.welcome(x));
		assert.equal('call that', r.welcome(Math.max));
		assert.equal('call that', r.welcome(y));
	});
});

describe('#factorial',function(){
	it('calculate factorial for positive numbers',function(){
		assert.equal(1,r.factorial(1));
		assert.equal(120,r.factorial(5));
	});
});

describe('#changeToBinary',function(){
	it('changeToBinary converts numbers to binary', function(){
		assert.equal(true,11 === r.changeToBinary(3));
		assert.equal(true, 11111111 === r.changeToBinary(255));	
	});
});

describe('#changeToOctal',function(){
	it('changeToOctal converts numbers to octal', function(){
		assert.equal(true,11 === r.changeToOctal(9));
		assert.equal(true, 1111111 === r.changeToOctal(299593));	
	});
});

describe('#changeToHex',function(){
	it('changeToHex converts numbers to hexadecimal',function(){
		assert.equal('7b', r.changeToHex(123));
		assert.equal('ff', r.changeToHex(255));	
		assert.equal('3ff', r.changeToHex(1023));	
	});
});

describe('#impose',function(){
	it('impose adds only item of two equal sized arrays', function(){
		var x = [3];
		var y = [6];
		var z = [9];
		assert.deepEqual(r.impose(x,y),z);
	});

	it('impose adds individual items of two equal sized arrays', function(){
		var x = [1,2,3];
		var y = [4,5,6];
		var z = [5,7,9];
		assert.deepEqual(r.impose(x,y),z);
	});

	it('impose adds items of second array if available', function(){
		var x = [1,2,3];
		var y = [4,5];
		var z = [5,7,3];
		assert.deepEqual(r.impose(x,y),z);
	});

	it('impose adds items only if present in first array',function(){
		var x = [1,2];
		var y = [4,5,6];
		var z = [5,7];
		assert.deepEqual(r.impose(x,y),z);
	});
});

describe('#findBestVowelWord',function(){
	it('findBestVowelWord finds the word with highest number of vowels', function(){
		var x = ['Good','morning','is','one','with','bright','sky','and','orange','sun'];
		var y = 'orange';
		assert.equal(r.findBestVowelWord(x),y);
	});

	it('findBestVowelWord finds the first word with highest number of vowels',function(){
		var x = ['Good','morning','is','one','with','bright','sky'];
		var y = 'Good';
		assert.equal(r.findBestVowelWord(x),y);
	});

	it('findBestVowelWord finds the first word with highest number of vowels ignoring case', function(){
		var x = ['A','dry','sky','is','a','dry','sky'];
		var y = 'A';
		assert.equal(r.findBestVowelWord(x),y);
	});

});

describe('#findWorstVowelWord',function(){
	it('findWorstVowelWord finds the word with least number of vowels', function(){
		var x = ['Good','morning','is','one','with','bright','sky'];
		var y = 'sky';
		assert.equal(r.findWorstVowelWord(x),y);
	});

	it('test.findWorstVowelWord finds the first word with least number of vowels', function(){
		var x = ['A','good','sky','is','dry','or','wet'];
		var y = 'sky';
		assert.equal(r.findWorstVowelWord(x),y);
	});
});

describe('#range',function(){
	it('range gives all numbers in range' ,function(){
		assert.deepEqual(r.range(1,5),[1,2,3,4]);
		assert.deepEqual(r.range(2,5),[2,3,4]);
		assert.deepEqual(r.range(-5,1),[-5,-4,-3,-2,-1,0]);
	});

	it('range can work on decimals', function(){	
		assert.deepEqual(r.range(1.2,5),[1.2,2.2,3.2,4.2]);
		assert.deepEqual(r.range(2.1,5.1),[2.1,3.1,4.1]);
		assert.deepEqual(r.range(-5.25,1.3),[-5.25,-4.25,-3.25,-2.25,-1.25,-0.25,0.75]);
	});

	it('range can move at given frequency', function(){	
		assert.deepEqual(r.range(1,3.1,0.5),[1,1.5,2,2.5,3]);
		assert.deepEqual(r.range(2.1,3.1,0.25),[2.1,2.35,2.6,2.85]);
	});
});

describe('#add',function(){
	it('add 1 increments allItems',function(){
		var x = [9,8,42,31,12];
		var y = [10,9,43,32,13];
		assert.deepEqual(r.add(x,1),y);
	});

	it('add 5 increments allItems by 5', function(){
		var x = [9,8,42,31,12];
		var y = [14,13,47,36,17];
		assert.deepEqual(r.add(x,5),y);
	});
});

describe('#calculate',function(){
	it('test.calculate calculates the value of an expression', function(){
		assert.ok('13' === r.calculate('(4*5+32)/4'));
		assert.ok('3' === r.calculate('((1/2)+(4/3)-(1/3))*2'));
	});
});
