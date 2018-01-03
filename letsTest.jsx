	window.breakPoint = 0;

	//About text	
	let nbspSpace = (_text) => {
		let textTemp = '', n = 20;
		
		const nbspLen = (n) => {
			let nbsp = '';
			for(let i = 0; i < n; i++){
				nbsp = nbsp + ' ';
			}
			//console.info(' nbsp:',nbsp);
			return nbsp;
		}
		
		(_text.length < n ? textTemp = _text + nbspLen((n - _text.length)) : textTemp = _text);
		
		return textTemp;
		//console.info(' textTemp:',textTemp);	
	}
	
	
	
/* Function to text function with pattern model <-> fact */
export const Test = (_text = 'Test', testId = '', factVal, modelVal) => {

		/* Try-catch-throw-final: As a matter of future devices 
			try{
				expect(1).to.eql(2)
			} catch(err){console.info(err);};
		*/
		//console.dir(object);

		//JavaScript isDOM — How do you check if a JavaScript Object is a DOM Object?
		//https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object		
		function simpleStringify (object){
			var simpleObject = {};
			for (var prop in object ){
				if (!object.hasOwnProperty(prop)){
					continue;
				}
				if (typeof(object[prop]) == 'object'){
					continue;
				}
				if (typeof(object[prop]) == 'function'){
					continue;
				}
				simpleObject[prop] = object[prop];
			}
			return JSON.stringify(simpleObject); // returns cleaned up JSON
		};
		
	
		let cycle = 0;
		function simpleEntityFunc(entity){
			cycle += 1;
			let simpleEntity 	=	{};
			if(typeof entity === 'object' && entity !== null && typeof entity !== 'undefined' && cycle < 100){
				for (let prop in entity ){
					if (!entity.hasOwnProperty(prop) || typeof entity[prop] === 'function' || prop === '__proto__'){
						continue;
					}					
					else if(typeof entity[prop] === 'object' && entity[prop] !== null && typeof entity !== 'undefined'){	
						simpleEntityFunc(entity[prop]); //console.info(); 
					}
					simpleEntity[prop] = entity[prop];
				}
			}
			return simpleEntity; // returns cleaned up JSON
		};
	
		
		//Check if the obj is dom entity
		function isDom(obj){
			var elm = document.createElement('div');
			try{
				elm.appendChild(obj);
			}
			catch (e){
				return false;
			};

			return true;
		};
	
		//Defence from TypeError: Converting circular structure to JSON
		//https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
		var modelValTest, factValTest;
		if(isDom(modelVal)){
			//console.info('isDom(',modelVal,')',isDom(modelVal));
			modelValTest = modelVal;
		}
		else if(typeof modelVal === "object" && modelVal !== null){
			//console.info('isObject(',modelVal,')',true);
			modelValTest = simpleStringify(simpleEntityFunc(modelVal));
		}
		else{
			modelValTest = modelVal;
		};

		if(isDom(factVal)){
			//console.info('isDom(',factVal,')',isDom(factVal)); 
			factValTest = factVal;
		}		
		else if(typeof factVal === "object" && factVal !== null){
			//console.info('isObject(',factVal,')',true);
			factValTest = simpleStringify(simpleEntityFunc(factVal));
		}
		else{
			factValTest = factVal;
		}

		let		toEqualVal 	=	'false';


		//About text
		let textTemp 	= 	nbspSpace(_text);
		//console.info(' textTemp Test:',textTemp);
		
		//About equality
		//console.info(modelValTemp, '\n', factValTemp, '\n', factValTemp === modelValTemp);
		if(	modelValTest === factValTest){ 
			toEqualVal 		=	'true';
		}

		//About testIdLabel
		if(testId !== ''){
			testId = ' id ' + testId;
		}
		
		let nbsp	=	' ';
		//About styles in console: https://stackoverflow.com/questions/24828107/javascript-adding-style-to-the-text-of-console-log
		
		
		/*
		console.info(' modelVal === undefined:',modelVal === undefined);
		console.info(' typeof modelVal === "undefined":',typeof modelVal === 'undefined');
		console.info(' modelVal === "":',modelVal === '');
		console.info(' toString.call(modelVal) === "[object Array]":',toString.call(modelVal) === '[object Array]');
		console.info(' modelVal.length === 0:',modelVal.length === 0);
		console.info(' 1:',1);
		console.info(' typeof modelVal === "object":',typeof modelVal === 'object');
		console.info(' modelVal.constructor === Object:',modelVal.constructor === Object);
		console.info(' Object.keys(modelVal).length === 0:',Object.keys(modelVal).length === 0);
		console.info(' 1:',1);	
		*/
		
		if(	modelVal === undefined || typeof modelVal === 'undefined' || modelVal === '' ||
		
			(toString.call(modelVal) === '[object Array]' && modelVal.length === 0) ||
			
			(typeof modelVal === 'object' && modelVal.constructor === Object && 
			 Object.keys(modelVal).length === 0)){  //New line	

				console.info('%c' + textTemp + nbsp + ' #' + window.breakPoint + testId +
							' fact:' ,  "color: blue; font-size:13px; font-weight: bold;",
							factVal);	
		}
		else{
			
			if(	toEqualVal === 'true'){
				const cTrue = '%ctrue!';
				console.info('%c' + textTemp + nbsp + ' #' + window.breakPoint + testId +
							' test: ' + 'true',  "color: green; font-size:13px; font-weight: bold;",
							'  model:', modelVal, ' fact:', factVal);
			}
			else{
				console.info('%c' + textTemp + nbsp + ' #' + window.breakPoint + testId +
							' test: ' + 'false',  "color: #e65c00; font-size:13px; font-weight: bold;",
							' model:', modelVal, ' fact:', factVal);			
			};
		};
			
		window.breakPoint += 1;
		return;
	}

	//letsTest('START', /* testId */ '', /* expect */ [], /* toEqual */ [] );

/* Function to logging function with pattern input -> output */
export function Loggin(_text,func){
	let next = func;
	
	return function (next){
		// Add a new method available on all function values
		//https://stackoverflow.com/questions/10624057/get-name-as-string-from-a-javascript-function-reference
		Function.prototype.getName = function(){
			// Find zero or more non-paren chars after the function start
			return /function ([^(]*)/.exec( this+"" )[1];
		};
		
		
		/*	*/
		var arg = {};
		var argNum = 0;
		for(var argName in arguments){
			
			if(	typeof arguments[argName] !== 'function' 	&&
				argName !== '__proto__'
			){
				arg[argName]	=	arguments[argName];
				argNum++;
			}
			//arg += arguments[argName] + ', ';
		}
		
		//About text
		let textTemp 	= 	nbspSpace(_text);
		//console.info(' textTemp Loggin:',textTemp);
		let nbsp	=	' ';
		
		const  returnValue = func.apply(this, arguments);

		if(		argNum === 0){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(', 
			')', '=', returnValue);
		}
		else if(argNum	=== 1){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(', 
			arg[0],
			')', '=', returnValue);
		}
		else if(argNum	=== 2){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(', 
			arg[0],',',arg[1],
			')', '=', returnValue);
		}
		else if(argNum	=== 3){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(', 
			arg[0],',',arg[1],',',arg[2],
			')', '=', returnValue);
		}
		else if(argNum	=== 4){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(',
			arg[0],',',arg[1],',',arg[2],',',arg[3],
			')', '=', returnValue);
		}
		else if(argNum	=== 5){
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(',
			arg[0],',',arg[1],',',arg[2],',',arg[3],',',arg[4],
			')', '=', returnValue);
		}
		else{
			console.info('%c' + textTemp + nbsp + ' #' + breakPoint + ' ' + func.getName(),
			"color: #E91E63; font-size:13px; font-weight: bold;",
			'(',
			arg,
			')', '=', returnValue);
		}		
		window.breakPoint += 1;
		return returnValue;
	}
}


/* Does not work. Function to wrap function with model if ? promise : function as it is 
export const PromiseWrap = (func) => (next) => {
		if(typeof next.then === 'function'){
			return next.then;
		}
		return next;
	}

	//Self-made Wrapper function to wrap dispatch with try if is a promise
	const promiseSM = (store)	=>  (next) => (action) => {
		if(typeof action.then === 'function'){
			return action.then(next);
		}
		return next(action);
	}
*/	
	
/*

			let A = [
						{id: 0, rank: 0, head: 'Head 00', text: 'Text 00', edit: false, status: 'active'},							
						{id: 2, rank: 0, head: 'Head 02', text: 'Text 02', edit: true, 	status: 'active'},
						{id: 3, rank: 0, head: 'Head 03', text: 'Text 03', edit: false, status: 'active'},
						{id: 4, rank: 0, head: 'Head 04', text: 'Text 04', edit: false, status: 'active'}
			];		
		
			let B = [
						{id: 0, rank: 0, head: 'Head 00', text: 'Text 00', edit: false, status: 'active'},							
						{id: 2, rank: 0, head: 'Head 02', text: 'Text 02', edit: true, 	status: 'active'},
						{id: 3, rank: 0, head: 'Head 03', text: 'Text 03', edit: false, status: 'active'},
						{id: 4, rank: 0, head: 'Head 04', text: 'Text 04', edit: false, status: 'active'}
			];		
		

			function add_1(x,y){
				return x+y;
			}
			//add_1 = lets.Loggin('Func loggin',add_1);
			add_1(3,5);
		
			function arr_1(x,y){
				let z = [];
				z.push(x);
				z.push(y);
				return z;
			}
			//arr_1 = lets.Loggin('',arr_1);
			arr_1(3,5);
			arr_1(A,B);
			
			
			function obj_1(x,y){
				let z = {};
				z.x = x;
				z.y = y;
				return z;
			}
			//obj_1 = lets.Loggin('',obj_1);
			obj_1(3,5);
		
	
	(typeof arg[0] !== 'undefined' ? arg[0] : ''), (typeof arg[1] !== 'undefined' ? ',' : ''),
	(typeof arg[1] !== 'undefined' ? arg[1] : ''), (typeof arg[2] !== 'undefined' ? ',' : ''),
	(typeof arg[2] !== 'undefined' ? arg[2] : ''), (typeof arg[3] !== 'undefined' ? ',' : '')
*/