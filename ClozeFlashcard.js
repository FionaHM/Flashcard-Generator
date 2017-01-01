const fs = require('fs');
// I decided to use front for full text and back for cloze to make it consistent with basic FC and for ease of reuse of functions
var ClozeFlashCard = function(front, back){
	var filename = 'cloze-flashcards.txt';
	this.front = front;
	this.back = back;
	// this.protodata = protodata; // leave blank for user entered data
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back){
		// store data as entered 
		var textWithCloze = front + ',' + back;
		// var closeCardData = '{ text:' + text + ', cloze: ' + cloze '}';
		fs.appendFile('cloze-flashcards.txt', textWithCloze +'\n', function(err) {
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
				var partialArr = [];	
				// determine what to do based on action parameter passed
				if ((action === 1) || (action === 0)){ 
					for (var i = 0; i < arr.length-1; i++){
				    	var newArr = arr[i].split(',');
				    	actionArr.push(newArr[parseInt(action)]); 
					};
					console.log(actionArr)
				} else if (action === 2){
	    			for (var i = 0; i < arr.length-1; i++){
	    				// verify the full statement contains the cloze
	    				var newArr = arr[i].split(',');
	    				// only display correctly created statments
	    				if (newArr[0].indexOf(newArr[1]) !== -1) {
				    		partialArr.push(newArr[0].replace(newArr[1], " ... "));
	    				} 

					};
					console.log(partialArr)
				}
			}).catch(function(){
				console.log("something went wrong, please try again.");
			});

	}


	this.printQuestion = function(){
		// prints cloze deleted statements from file cloze-flashcards.txt
		this.handleFileReads(2);
	}

	this.printAnswer = function(){
		// prints cloze part only from file cloze-flashcards.txt
		this.handleFileReads(1);
	}


	this.printFile = function(){
		// prints full statement from file cloze-flashcards.txt
		this.handleFileReads(0);
	}
}

module.exports = ClozeFlashCard;