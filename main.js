// global variables
var questionsArr = ["null"]; //dummmy data
var answersArr = [];
// var basicFC = require('./BasicFlashcard.js');
// var clozeFC = require('./ClozeFlashcard.js');

// // create a promise to check that file exists before requiring it
// function requireFileHandler(dataFile){
//    return new Promise(function(resolve, reject) {
//    		var fs = require('fs');
// 		// check if the files exist before they are required, log any error
// 		if (fs.existsSync(dataFile)){
// 			resolve(dataFile);
// 	    }  else {	
// 			reject();			
// 		}
// 	})
// }

// function requireFiles(){
// 	requireFileHandler(dataFile).then(function(response) { 
		
// 	}).catch(function(){

			
// 	})
// }
// } 



// create a promise to handle initial data population
function prototypeDataHandler(dataFile, constructorFile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the files exist before they are required, log any error
		if ((fs.existsSync(dataFile)) && (fs.existsSync(constructorFile))){
			var FC = require(constructorFile);
			var dataObject = require(dataFile);
			// ensure they have data and are of expected type
	   	 	if ((FC) && (dataObject) && (typeof dataObject === 'object')) {
	       		// ensure that the data object has data
				if ((Object.keys(dataObject).length !== 0 )){
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
	})
}


// populate storage object (file or db) with seed/prototype data
function populateInitData(dataFile, constructorFile){
	prototypeDataHandler(dataFile, constructorFile).then(function(response) { 
		var FC = require(constructorFile);
		var newFC = new FC();
		var newArr = [];
		for (var i = 0; i < Object.keys(response).length; i++){
			// add prototype data to the basic data file
			newFC.createFlashcard(response[i].back, response[i].front);
		}
	}).catch(function(){
		console.log("something went wrong, possibly with " + dataFile);		
	})
}

// create a promise to handle initial data population
function fcDataHandler(question, answer, constructorFile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the file exists and a new instance can be created, log any error
		if ((fs.existsSync(constructorFile))){
			var fc = require(constructorFile);
			var newFC = new fc();
			newFC.createFlashcard(question, answer);  // response = newFC
			// newFC.createFlashcard(question, answer);  
			resolve();
	    }  else {	
			reject();			
		}
	})
}

// populate storage object (file or db) with new FC data
function populateData(question, answer, constructorFile){
	fcDataHandler(question, answer, constructorFile).then(function(response) { 
  		console.log('FC data has been saved');
	}).then(function(){
		continueGame();
	}).catch(function(){
		console.log('something went wrong, please try again.');		
	})
}

// function addFlashCard(constructorFile){
	
//   	// check if user wants to continue

// }

function userInputs(){
	// must populate data array
	// ********** here
	// var fc = require('./BasicFlashcard.js');
	// // var newFC = new fc();
	// var data = populateArray();
	// console.log(data);
	// array = data.toString().split('\n');
	// console.log(typeof array);
	// questionsArr = [];
	// for (var i = 0; i < array.length; i++){
	//     	var newArr = array[i].split(',');
	//     	questionsArr.push(newArr[1]);
	//     	answersArr.push(newArr[0]);

	// }

	
	// console.log(questionsArr);
	// inquirer returns a promise this allows us to use both then and catch for return data and catch errors
	var inquirer = require('inquirer');
	inquirer.prompt([
		{
		    type: 'list',
		    name: 'predefinedOptions',
		    message: 'Please select an option:',
		    choices: ['populate-initial-data',
			  'add-flashcard',
			  'view-flashcards']
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
	    		if (answers.viewBasicOrCloze === "cloze"){
	    			return answers.viewBasicOrCloze === "view-flashcards"
	    		} 
		    }
	    		
		},
		{
	    	type: "list",
	    	message: "what data do you want to view?",
	    	name: "QAorBoth",
	    	choices: ['Question',
			  'Answer', 'Both'],
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "basic"){
	    			return answers.viewBasicOrCloze === "basic"
	    		} 
		    }	
		},
		{
	    	type: "list",
	    	message: "which card do you want to view?",
	    	name: "viewFC",
	    	choices: questionsArr,
			when: function(answers){
		    		if (answers.viewBasicOrCloze === "basic"){
		    			return answers.viewBasicOrCloze === "basic"
		    		} 
			},
		},
		{
	    	type: "list",
	    	message: "what data do you want to view?",
	    	name: "FullorCloze",
	    	choices: ['Text with Cloze',
			  'Full Text', 'Cloze only'],
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "cloze"){
	    			return answers.viewBasicOrCloze === "cloze"
	    		} 
		    }	
		},
		{
	    	type: "list",
	    	message: "which card do you want to view?",
	    	name: "viewFC",
	    	choices: questionsArr,
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "cloze"){
	    			return answers.viewBasicOrCloze === "cloze"
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
		// var optionSelected  =  answers.predefinedOptions;
		// var userInput = answers.userInput;
		// // var continueGame = answers.confirmNewGame;
		// // calls function to decide what to do with user input
		// handleUserData(optionSelected, userInput);	
	}).catch(function(e){
		errorHandler(e);
	})
};

function handleAnswers(answers){
	// this is where user input answers are dealt with
	switch (answers.predefinedOptions) {
			case "populate-initial-data":
				// call this if selected by user - populate seed data
				// either in file or database
				// might want to verify that this data is not in the file already
				// set true flag in file for predefined data

				// maybe tidy this part up to be more like add flash card
				populateInitData('./basicPrototype.js', './BasicFlashcard.js');
				populateInitData('./clozePrototype.js', './ClozeFlashcard.js');
				// check if user wants to continue
				continueGame();
				break;
			case "add-flashcard":
  				switch (answers.addBasicOrCloze) {
  					case "basic":
 						populateData(answers.question, answers.answer, './BasicFlashcard.js');
  					break;
  					case "cloze":
  					 	populateData(answers.question, answers.answer, './ClozeFlashcard.js');
  					break;
  				}
			case "view-flashcards":
				console.log(answers);
				switch (answers.viewBasicOrCloze) {
  					case "basic":
  						if (answers.QAorBoth === "Question"){
  							 // viewFC: 'test1'  -- select card
  							// var fc = require('./BasicFlashcard.js');
  							// var newFC = new fc();
  							// // populate = newFC.populateArray.map(index, ch);
  							// newFC.populateArray(questionsArr, answersArr);

  						} else if (answers.QAorBoth === "Answers") {

  						} else if (answers.QAorBoth === "Both") {

  						}
  					break;
  					case "cloze":
  						if (answers.QAorBoth === "Question"){
  							//  // viewFC: 'test1'  -- select card

  						} else if (answers.QAorBoth === "Answers") {

  						} else if (answers.QAorBoth === "Both") {

  						}
  					break;
  				}
				
		// 		{ predefinedOptions: 'view-flashcards',
  // viewBasicOrCloze: 'basic',
  // QAorBoth: 'Question',
  // viewFC: 'test1' }
				// need 2 D array with back and front.
				
				// take action based on if it is "basic or cloze"
				// if basic, determine:
					// if question, answer or both to be displayed
					// display array of cards for user to select relevant card
				// if cloze, determine:
					// if partial text, cloze or full text to be displayed
					// display array of cards for user to select relevant card
				break;
			default:
				console.log("default");
				// check if user wants to continue
				
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
	}).catch(function(e){
		errorHandler(e);
	})
}



userInputs();