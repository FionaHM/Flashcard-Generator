const fs = require('fs');
// create 5 instances intiially
var ClozeFlashCard = function(text, cloze){
	this.text = text;
	this.cloze = cloze;
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createClozeFlashcard = function(text, cloze){
		// when saving the flashcard mark the cloze text
		// find the text and replace with {{c1:: cloze}}
		// var answerClose = '{{c1:' + cloze + '}}';
		// var textWithCloze = text.replace(cloze, answerClose);
		// store data as entered 
		var textWithCloze = cloze + ', ' + text;
		// var closeCardData = '{ text:' + text + ', cloze: ' + cloze '}';
		fs.appendFile('cloze-flashcards.txt', textWithCloze +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}

	this.printPartial = function(text, cloze){
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

}

module.exports = ClozeFlashCard;