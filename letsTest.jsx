module.exports = exports = window.breakPoint = 0;

module.exports = exports = window.letsTest = (_text = 'Test', testId = '', factVal, modelVal) => {

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
		let nbspLen = (n) => {
			let nbsp = '';
			for(let i = 0; i < n; i++){
				nbsp = nbsp + ' ';
			}
			//console.info(' nbsp:',nbsp);
			return nbsp;
		}
		
		let textTemp = '', n = 20;
		(_text.length < n ? textTemp = _text + nbspLen((n - _text.length)) : textTemp = _text);
			//console.info(' textTemp:',textTemp);
		
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