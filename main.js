// include relevant modules
var basicFC = require('./BasicFlashcard.js');
var clozeFC = require('./ClozeFlashcard.js');
var basicData = require('./basicPrototype.js');
var clozeData = require('./clozePrototype.js');

// create a promise to handle initial data population
function prototypeDataHandler(dataObject){
   return new Promise(function(resolve, reject) {	
	// get path, params and callback
		if ((Object.keys(dataObject).length) || (typeof dataObject != object)){
			resolve(dataObject)
		} else {
			reject(error);
		}
		
	})
}

// populate storage object (file or db) with seed/prototype data
function populateInitData(dataObject, newConstructorFC, fcType){
	// To do+5: 
// use promise for reading json from separate file 
// along with any other async functions that may be needed
	prototypeDataHandler(dataObject).then(function(response) { 
			var newFC = new newConstructorFC();
			for (var i = 0; i < Object.keys(dataObject).length; i++){
				// add prototype data to the basic data file
				newFC.createFlashcard(dataObject[i].back, dataObject[i].front);
			}
			console.log(fcType);
			

		}).catch(function(error){
			console.log("something went wrong with populating initial data for the " + fcType);
			
		})
}


function userInputs(){
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
	    	name: "viewBasicOrCloze",
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
	    	message: "what data do you want to view?",
	    	name: "viewBasicOrCloze",
	    	choices: ['Text with Cloze',
			  'Full Text', 'Cloze only'],
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "cloze"){
	    			return answers.viewBasicOrCloze === "cloze"
	    		} 
		    }	
		},
		{
	    	type: "input",
	    	message: "Please enter a basic question:",
	    	name: "basicQuestion",
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
	    	name: "basicAnswer",
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
	    	name: "clozeQuestion",
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
	    	name: "clozeAnswer",
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
	console.log(answers.predefinedOptions);
	switch (answers.predefinedOptions) {
			case "populate-initial-data":
				// call this if selected by user - populate seed data
				// either in file or database
				populateInitData(basicData, basicFC, "basic flashcard");
				populateInitData(clozeData, clozeFC, "cloze flashcard");
				break;
			case "add-flashcard":
				console.log(answers.predefinedOptions);
				// take action based on if it is "basic or cloze"
				// if basic - take in the question and answer and save it to the file
				// if cloze - take in the full text and cloze and save it to the file
				break;
			case "view-flashcards":
				console.log(answers.predefinedOptions);
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
	}
}



userInputs();