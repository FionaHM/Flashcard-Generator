const fs = require('fs');
// create 5 instances initiallyt
var BasicFlashCard = function(front, back){
	this.front = front;
	this.back = back;
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createBasicFlashcard = function(front, back){
		// // save to a text file
		var basicCardData =  front + ', ' + back ;
		fs.appendFile('basic-flashcards.txt', basicCardData  +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
		// console.log(front, back)
	}

	this.displayBasicQuestion = function(){
		// // save to a text file
		
		fs.readFile('basic-flashcards.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    // var questionCloze =  
	    // var question = data.replace(questionCloze, "...");
	    console.log(data);



	});

	}

	this.displayBasicAnswer = function(){
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


 

 