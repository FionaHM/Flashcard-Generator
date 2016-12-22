const fs = require('fs');
// I decided to use front for full text and back for cloze to make it consistent with basic FC and for ease of reuse of functions
var ClozeFlashCard = function(front, back, protodata){
	this.front = front;
	this.back = back;
	this.protodata = protodata; // leave blank for user entered data
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back, protodata){
		// when saving the flashcard mark the cloze text
		// find the text and replace with {{c1:: cloze}}
		// var answerClose = '{{c1:' + cloze + '}}';
		// var textWithCloze = text.replace(cloze, answerClose);
		// store data as entered 
		// set 'protodata: false' because this is user input data
		var textWithCloze = front + ', ' + back;
		// var closeCardData = '{ text:' + text + ', cloze: ' + cloze '}';
		fs.appendFile('cloze-flashcards.txt', textWithCloze +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}
	// this prints the partial question
	this.printQuestion = function(front, back){
		// read in the file and replace the cloze with '...'
		fs.readFile('cloze-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    // var questionCloze =  
	    // var question = data.replace(questionCloze, "...");
	    console.log(data);



	});

	}
// 5: ClozeCard has property or method that returns only the cloze-deleted portion of the text
// 5: ClozeCard has property or method that returns only the partial text
// 5: ClozeCard throws error if it is not able to figure out where the cloze-deletion should go.

	this.printCloze = function(){
		// save to a text file
		fs.readFile('cloze-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	     console.log(data);
	
	    })
	}

	this.printFull = function(){
		// save to a text file
		fs.readFile('cloze-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	     console.log(data);
	
	    })
	}



}

module.exports = ClozeFlashCard;