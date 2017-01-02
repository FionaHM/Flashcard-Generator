// create a promise to handle initial data population from the file stored basic and cloze objects
function prototypeDataHandler(dataFile, constructorFile, outputfile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the files exist before they are required, log any error
		// verify that the data has not already been populated
		console.log(populateSeedData);
		if (populateSeedData < 2 ){
			if ((fs.existsSync(dataFile)) && (fs.existsSync(constructorFile))){
				var FC = require(constructorFile);
				var dataObject = require(dataFile);
				// delete old file if it exists
				// console.log(outputfile);
				var newFC = new FC(outputfile, "", "");
				// deletes old output files
				// console.log(newFC.filename);
				if (fs.existsSync(newFC.filename)){
					fs.unlinkSync(newFC.filename);
				}
				// ensure the files have data and are of expected type
		   	 	if ((FC) && (dataObject) && (typeof dataObject === 'object')) {
		       		// ensure that the data object has data
					if ((Object.keys(dataObject).length !== 0 )){
						populateSeedData++;
						resolve(dataObject);
					} else {
						reject();
					}
				} else {
					reject();
				}
		    }  else {	
				reject();			
			}
		} else {
			reject();	
		}

	})
}

// populate storage object (file) with seed data from files
function populateInitData(dataFile, constructorFile, outputfile){
	// response is the dataObject returned from the promise 
	prototypeDataHandler(dataFile, constructorFile, outputfile).then(function(response) { 
		// check if dataFile exists and has data - if it does then delete it and repopulate it
		var FC = require(constructorFile);
		var newFC = new FC(outputfile);
		var newArr = [];
		/// look at map function for this bit??
		for (var i = 0; i < Object.keys(response).length; i++){
			// add prototype data to the basic data file
			newFC.createFlashcard(response[i].front, response[i].back, outputfile);
		}
	}).catch(function(){
		if (populateSeedData === 2) {
			console.log("Initial seed data has already been populated.");		
		} else {
			console.log("something went wrong, possibly with " + dataFile);		
		}
		
	})
}

// create a promise to handle initial data population
function fcDataHandler(question, answer, constructorFile, outputfile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the file exists and a new instance can be created, log any error
		if ((fs.existsSync(constructorFile))){
			var FC = require(constructorFile);
			var newFC = new FC(outputfile);
			newFC.createFlashcard(question, answer, outputfile);  
			resolve();
	    }  else {	
			reject();			
		}
	})
}

// populate storage object (file) with new FC data
function populateData(question, answer, constructorFile, outputfile){
	fcDataHandler(question, answer, constructorFile, outputfile).then(function(response) { 
  		console.log('Flashcard data has been saved.');
	}).then(function(){
		continueGame();
	}).catch(function(){
		console.log('Something went wrong with saving flashcard data, please try again.');	
	})
}


function fcDataArrayHandler(viewBasicOrCloze, constructorFile, outputfile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the file exists and a new instance can be created, log any error
		if ((fs.existsSync(constructorFile))){
			var FC = require(constructorFile);
			var newFC = new FC(outputfile);
			resolve(newFC);	
	    }  else {	
			reject();			
		}
	}).catch(function(){
		console.log('something went wrong with creating constructor from ' + constructorFile + ', please try again.');		
	})
}

// this is used to display individual questions and their answers 
// Creates two separate arrays - questArr with questions and ansArr with answers
function displayData(viewBasicOrCloze, constructorFile, outputfile){
	fcDataArrayHandler(viewBasicOrCloze, constructorFile, outputfile).then(function(newFC) { 
			newFC.getFCData(outputfile).then(function(response){
					console.log("in here");
				return response;
			}).then(function(response){
				var questArr = [];
				var ansArr = [];
				
				for (var i = 0; i < response.length-1; i++){
				    var tmpArr = response[i].split(',');
				    if (viewBasicOrCloze === "basic"){
						questArr.push(tmpArr[0]);
						ansArr.push(tmpArr[1])
					} else if (viewBasicOrCloze === "cloze"){
						// call cloze function to hide the answer
						var res = newFC.hideClozeData(tmpArr[0], tmpArr[1]);
						// console.log(res);
						questArr.push(res);
						ansArr.push(tmpArr[1])
						// console.log(ansArr[num]);
						// continueGame();	
					}

				};	
				return [questArr, ansArr];
			}).then(function([questArr, ansArr]){
				var inquirer = require('inquirer');
				inquirer.prompt([
					{
					    type: 'list',
					    name: 'itemFC',
					    message: 'Which flashcard do you want to view the answer for?',
					    choices: questArr
				    }

				]).then(function (answers) {
					// make a decision on what to do - continue or not.
					var num = questArr.indexOf(answers.itemFC);
					console.log('Answer: '+ ansArr[num]);
					continueGame();
				}).catch(function(){
					console.log("Error getting Question or Answer or Both - try again");
					continueGame();
				})
	
			}).catch(function(err){
				console.log(err);
				continueGame();
			});
	}).catch(function(){
		console.log('something went wrong, please try again.');	
		continueGame();
	})
}

function serveQuizData(viewBasicOrCloze, constructorFile, outputfile){
	fcDataArrayHandler(viewBasicOrCloze, constructorFile, outputfile).then(function(newFC) { 
			newFC.getFCData(outputfile).then(function(response){
				return response;
			}).then(function(response){
				var questArr = [];
				var ansArr = [];
				for (var i = 0; i < response.length-1; i++){
				    var tmpArr = response[i].split(',');
				    if (viewBasicOrCloze === "basic"){
						questArr.push(tmpArr[0]);
						ansArr.push(tmpArr[1])
					} else if (viewBasicOrCloze === "cloze"){
						// call cloze function to hide the answer
						var res = newFC.hideClozeData(tmpArr[0], tmpArr[1]);
						questArr.push(res);
						ansArr.push(tmpArr[1])
					}

				};	
				return [questArr, ansArr];
			}).then(function([questArr, ansArr]){
				var inquirer = require('inquirer');
				var i = 0;
				inquirer.prompt([
					{		
					    type: 'input',
					    name: 'answer',
					    message: questArr[i] + ' ANSWER: ',
					  	validate: function(str){
							return str !== ''; //cannot be empty
						}
				    }
				]).then(function (answers) {
					// check the user input answer against the actual answer
					if (answers.answer.toLowerCase().trim() === ansArr[i].toLowerCase().trim()){
						console.log('You are correct the answer is: ' + ansArr[i] );
					} else {
						console.log('Incorrect the answer is: ' + ansArr[i] );
					}
					// next question
					i++;
					serveQuestions(questArr, ansArr, i);
				}).catch(function(){
					console.log("Error getting Question or Answer or Both - try again");

				})
	
			}).catch(function(err){
				console.log(err);
				continueGame();
			});
	}).catch(function(){
		console.log('something went wrong, please try again.');	
		continueGame();
	})
}

function serveQuestions(questArr, ansArr, i){
	if (i < questArr.length){
		var inquirer = require('inquirer');
		inquirer.prompt([
			{		
			    type: 'input',
			    name: 'answer',
			    message: questArr[i] + ' ANSWER: ',
			  	validate: function(str){
					return str !== ''; //cannot be empty
				}
		    }
		]).then(function (answers) {
			// check the user input answer against the actual answer
			if (answers.answer.toLowerCase().trim() === ansArr[i].toLowerCase().trim()){
				console.log('You are correct the answer is: ' + ansArr[i] );
			} else {
				console.log('Incorrect the answer is: ' + ansArr[i] );
			}
			// next question
			i++;
			serveQuestions(questArr, ansArr, i);
		}).catch(function(){
			console.log("Error getting Question or Answer or Both - try again");

		})
	} else {
		continueGame();
	}
}

function userInputs(){
	// inquirer returns a promise this allows us to use both then and catch for return data and catch errors
	var inquirer = require('inquirer');
	inquirer.prompt([
		{
		    type: 'list',
		    name: 'userOrAdmin',
		    message: 'Please select an option:',
		    choices: ['admin',
			  'user']
	    },
	    {
		    type: 'list',
		    name: 'whichGame',
		    message: 'Please select an option:',
		    choices: ['basic',
			  'cloze'], 
			when: function(answers){
	    		if (answers.userOrAdmin === "user"){
	    			return answers.userOrAdmin === "user"
	    		} 
		    }
	    },
		{
		    type: 'list',
		    name: 'predefinedOptions',
		    message: 'Please select an option:',
		    choices: ['populate-initial-data',
			  'add-flashcard',
			  'view-flashcards'], 
			when: function(answers){
	    		if (answers.userOrAdmin === "admin"){
	    			return answers.userOrAdmin === "admin"
	    		} 
		    }
	    },
		{
	    	type: "list",
	    	message: "what do you want to add?",
	    	name: "addBasicOrCloze",
	    	choices: ['basic',
			  'cloze'],
			when: function(answers){
	    		if (answers.predefinedOptions === "add-flashcard"){
	    			return answers.predefinedOptions === "add-flashcard"
	    		} 
		    }		
		},
		{
	    	type: "list",
	    	message: "what do you want to view?",
	    	name: "viewBasicOrCloze",
	    	choices: ['basic',
			  'cloze'],
			when: function(answers){
	    		if (answers.predefinedOptions === "view-flashcards"){
	     			return answers.predefinedOptions === "view-flashcards"
	    		} 
	    	}
	    		
		},
		{
	    	type: "list",
	    	message: "what do you want to add?",
	    	name: "viewBasicOrCloze",
	    	choices: ['basic',
			  'cloze'],
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "view-flashcards"){
	    			return answers.viewBasicOrCloze ===  "view-flashcards"
	    		} 
		    }
	    		
		},
		{
	    	type: "input",
	    	message: "Please enter a basic question:",
	    	name: "question",
			when: function(answers){
	    		if (answers.addBasicOrCloze === "basic"){
	    			return answers.addBasicOrCloze === "basic"
	    		} 	
		    },
		    validate: function(str){
				return str !== ''; //cannot be empty
			}
	    		
		},
		{
	    	type: "input",
	    	message: "Please enter an answer to the previous question",
	    	name: "answer",
			when: function(answers){
	    		if (answers.addBasicOrCloze === "basic"){
	    			return answers.addBasicOrCloze === "basic"
	    		} 
		    },
		    validate: function(str){
				return str !== ''; //cannot be empty
			}
	    		
		},

		{
	    	type: "input",
	    	message: "Please enter the full text for the Cloze Flashcard:",
	    	name: "question",
			when: function(answers){
	    		if (answers.addBasicOrCloze === "cloze"){
	    			return answers.addBasicOrCloze === "cloze"
	    		} 
		    },
		    validate: function(str){
				return str !== ''; //cannot be empty
			}
	    		
		},
		{
	    	type: "input",
	    	message: "Please the Cloze part of the previous text:",
	    	name: "answer",
			when: function(answers){
	    		if (answers.addBasicOrCloze === "cloze"){
	    			return answers.addBasicOrCloze === "cloze"
	    		}
		    },
		    validate: function(str){
				return str !== ''; //cannot be empty
			}
	    		
		}
		
	]).then(function (answers) {
		// return action, values;
		handleAnswers(answers);
	}).catch(function(e){
		console.log(e);
	})
};

function handleAnswers(answers){
	// this is where user input answers are dealt with
	switch (answers.userOrAdmin) {
			case "user":
				switch (answers.whichGame) {
					case "basic":
						// gives users one question at a time
						// waits for answer
						// displays correct answer
						// no score keeping
			  			serveQuizData(answers.whichGame, './BasicFlashcard.js', './basic-flashcards.txt');

					break;
					case "cloze":
						// gives users one question at a time
						// waits for answer
						// displays correct answer
						// no score keeping			
						serveQuizData(answers.whichGame, './ClozeFlashcard.js', './cloze-flashcards.txt');
						break;
				}

			break;
			case "admin":
				// this section deals with the admin operations
				// populating prototype data as well as adding and displaying flashcards
				switch (answers.predefinedOptions) {
						case "populate-initial-data":
							// call this if selected by user - populate seed data
							// either in file or database
							// might want to verify that this data is not in the file already
							// set true flag in file for predefined data
							populateInitData('./basicPrototype.js', './BasicFlashcard.js', './basic-flashcards.txt');
							populateInitData('./clozePrototype.js', './ClozeFlashcard.js', './cloze-flashcards.txt');
							// check if user wants to continue
							continueGame();
							break;
						case "add-flashcard":
			  				switch (answers.addBasicOrCloze) {
			  					case "basic":
			 						populateData(answers.question, answers.answer, './BasicFlashcard.js', './basic-flashcards.txt');
			  					break;
			  					case "cloze":
			  					 	populateData(answers.question, answers.answer, './ClozeFlashcard.js', './cloze-flashcards.txt');
			  					break;
			  				}
			  				break;
						case "view-flashcards":
							switch (answers.viewBasicOrCloze) {
			  					case "basic":
			  						displayData(answers.viewBasicOrCloze, './BasicFlashcard.js', './basic-flashcards.txt');
			  					break;
			  					case "cloze":
			  						displayData(answers.viewBasicOrCloze, './ClozeFlashcard.js', './cloze-flashcards.txt');
			  					break;
			  				}
							break;	
						default:
							console.log("default");
				}
			break;
			
			default:
				console.log("default");
	}

}


function continueGame(){
	var inquirer = require('inquirer');
	inquirer.prompt([
		{
		    type: 'confirm',
		    name: 'continue',
		    message: 'Do you want to continue? (Y/n)',
		    default: 'Yes'
	    }
	]).then(function (answers) {
		// make a decision on what to do - continue or not.
		if (answers.continue === true){
			userInputs();
		} else {
			console.log("Goodbye for now!");
		}
	}).catch(function(){
		console.log("error in here");	
	})
}

// starts here


var populateSeedData = 0;
// remove .txt files from previous runs
userInputs();