const fs = require('fs');
// create 5 instances initially
var BasicFlashCard = function(front, back){
	var filename = "basic-flashcards.txt";
	this.front = front;
	this.back = back;
	// did not use "this" in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back){

		// // save to a text file 
		var basicCardData =  front + ', ' + back ;
		fs.appendFile(filename, basicCardData  +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}

	this.handleFileReads = function(action){
		function readFileHandler(filename){
			var fs = require("fs");
			return new Promise(function(resolve, reject){
				fs.readFile(filename, 'utf8', function read(err, data) {
				    if (err) {
				        reject(err);
				    }
				    resolve(data);
				})
			})
		}

		readFileHandler(filename).then(function(response){
				var arr = response.toString().split('\n');
				// empty current array (questions or answers)
				var actionArr = [];
				if ((action === 1) || (action === 0)){ 

					for (var i = 0; i < arr.length-1; i++){
				    	var newArr = arr[i].split(',');
				    	actionArr.push(newArr[parseInt(action)]);  
				    	// action = 0 for questions; 1 for answers
					};
					// display the action requested i.e. question or anwer
					console.log(actionArr)
				} else if (action === 2){
					console.log(response)
				}
	
			}).catch(function(){
				console.log("something went wrong");
			});

	}


	this.printQuestion = function(){
		// prints Questions
		this.handleFileReads(0);
		
		// fs.readFile('basic-flashcards.txt', 'utf8', function read(err, data) {
	    // if (err) {
	    //     throw err;
	    // }
	    // // var questionCloze =  
	    // // var question = data.replace(questionCloze, "...");
	    // console.log(data);
	    


	}

	this.printAnswer = function(){
		// prints  answers
		this.handleFileReads(1);


	}


	this.printFile = function(){
		// prints questions and answers
		this.handleFileReads(2);


	}

}


module.exports = BasicFlashCard;


 

 
