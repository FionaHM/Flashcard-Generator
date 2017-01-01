
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

// populate storage object (file) with seed/prototype data
function populateInitData(dataFile, constructorFile){
	// response is the dataObject returned from the promise 
	prototypeDataHandler(dataFile, constructorFile).then(function(response) { 
		// check if dataFile exists and has data - if it does then delete it and repopulate it
		var FC = require(constructorFile);
		var newFC = new FC();
		var newArr = [];
		/// look at map function for this bit??
		for (var i = 0; i < Object.keys(response).length; i++){
			// add prototype data to the basic data file
			newFC.createFlashcard(response[i].front, response[i].back);
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

// populate storage object (file) with new FC data
function populateData(question, answer, constructorFile){
	fcDataHandler(question, answer, constructorFile).then(function(response) { 
  		console.log('FC data has been saved');
	}).then(function(){
		continueGame();
	}).catch(function(){
		console.log('something went wrong, please try again.');	
	})
}


function fcDataArrayHandler(QAorBoth, constructorFile){
   return new Promise(function(resolve, reject) {	
		// get path, params and callback
		var fs = require('fs');
		// check if the file exists and a new instance can be created, log any error
		if ((fs.existsSync(constructorFile))){
			var fc = require(constructorFile);
			var newFC = new fc();
			if (QAorBoth === "Question"){
				resolve(newFC.printQuestion());
			} else if (QAorBoth === "Answer") {
				resolve(newFC.printAnswer());
			} else if (QAorBoth === "Both"){
				resolve(newFC.printFile());
			}
		
	    }  else {	
			reject();			
		}
	}).catch(function(){
		console.log('something went wrong, please try again.');		
	})
}

function displayData(QAorBoth, constructorFile){
		fcDataArrayHandler(QAorBoth, constructorFile).then(function(response) { 
	  		// console.log(response);
		}).then(function(){
			continueGame();
		}).catch(function(){
			console.log('something went wrong, please try again.');	
		})
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
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
	    // 			// populate data in choices array
					// populateChoicesArray('./basicPrototype.js', './BasicFlashcard.js');
					// populateChoicesArray('./clozePrototype.js', './ClozeFlashcard.js');
	    			return answers.predefinedOptions === "view-flashcards"
	    		} 
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
		    }	
		},
		// {
	 //    	type: "list",
	 //    	message: "which card do you want to view?",
	 //    	name: "viewFC",
	 //    	choices: newQuestionsArr,
	 //    		 // can be a function that returns an array
		// 	when: function(answers){
		//     		if (answers.viewBasicOrCloze === "basic"){
		//     			// populateChoicesArray('./clozePrototype.js', './ClozeFlashcard.js');
		//     			return answers.viewBasicOrCloze === "basic"
		//     		} 
		// 	},
		// },
		{
	    	type: "list",
	    	message: "what data do you want to view?",
	    	name: "QAorBoth",
	    	choices: ['Question',
			  'Answer', 'Both'],
			when: function(answers){
	    		if (answers.viewBasicOrCloze === "cloze"){
	    			return answers.viewBasicOrCloze === "cloze"
	    		} 
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
		    }	
		},
		// {
	 //    	type: "list",
	 //    	message: "which card do you want to view?",
	 //    	name: "viewFC",
	 //    	choices: newQuestionsArr, // can be a function that returns an array
		// 	when: function(answers){
	 //    		if (answers.viewBasicOrCloze === "cloze"){
	 //    			return answers.viewBasicOrCloze === "cloze"
	 //    		} 	
		// 	}
		// },
		{
	    	type: "input",
	    	message: "Please enter a basic question:",
	    	name: "question",
			when: function(answers){
	    		if (answers.addBasicOrCloze === "basic"){
	    			return answers.addBasicOrCloze === "basic"
	    		} 	
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 	
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// } 	
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
	    		// if (answers.userOrAdmin === "admin"){
	    		// 	return answers.userOrAdmin === "admin"
	    		// }  	
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
		//errorHandler(e);
	})
};

function handleAnswers(answers){
	// this is where user input answers are dealt with
	switch (answers.userOrAdmin) {
			case "user":
			// do something
				console.log("start playing the game")
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
			  				break;
						case "view-flashcards":
							switch (answers.viewBasicOrCloze) {
			  					case "basic":
			  						displayData(answers.QAorBoth, './BasicFlashcard.js');
			  					break;
			  					case "cloze":
			  						displayData(answers.QAorBoth, './ClozeFlashcard.js');
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
		// 
		console.log("error in here");
		// errorHandler(e);
	})
}

//Populate seed data initially
// update questionsArr with seed data


userInputs();