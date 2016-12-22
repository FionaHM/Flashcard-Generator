const fs = require('fs');
// create 5 instances initially
var BasicFlashCard = function(front, back, protodata){
	this.front = front;
	this.back = back;
	this.protodata = protodata; // leave blank for user entered data
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back, protodata){
		// // save to a text file 
		// set 'protodata: false' because this is user input data
		var basicCardData =  front + ', ' + back ;
		fs.appendFile('basic-flashcards.txt', basicCardData  +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
		// console.log(front, back)
	}

	this.printQuestion = function(){
		// prints Question
		
		fs.readFile('basic-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    // var questionCloze =  
	    // var question = data.replace(questionCloze, "...");
	    console.log(data);



	});

	}

	this.displayAnswer = function(){
		// // save to a text file
		fs.readFile('basic-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    
	    console.log(data);



	});

	}

}


module.exports = BasicFlashCard;


 

 
