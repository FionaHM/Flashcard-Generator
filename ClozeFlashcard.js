const fs = require('fs');
// I decided to use front for full text and back for cloze to make it consistent with basic FC and for ease of reuse of functions
var ClozeFlashCard = function(filename, front, back){
	this.filename = filename;
	this.front = front;
	this.back = back;

	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	// function to create and store flash cards in a file
	this.createFlashcard = function(front, back, filename){
		// store the data as entered - modify later
		var textWithCloze = front + ',' + back; 
		fs.appendFile(this.filename, textWithCloze +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}

	// gets data from text file and puts it into array for use in the main.js
	this.getFCData = function(filename){
		return new Promise(function(resolve, reject){
			handleFileReads(filename).then(function(response){
				var arr = response.toString().split('\n');
				ClozeFlashCard.answer = arr.splice(0);
				resolve(ClozeFlashCard.answer);
	
			}).catch(function(err){
				console.log(err);
				reject(err);
			})
		})	
	}
	
	// masks the cloze portion of the statement for display
	// returns an error if cloze does not match any string in statement
	this.hideClozeData = function(front, back){
		// find the close data and replace it
		// verify that the close exists in the statement
		var lowerQuestion = front.toLowerCase();
		var lowerAnswer = back.toLowerCase();
		if (lowerQuestion.indexOf(lowerAnswer) !== -1){
			var res = front.replace(back, " ... ");
			return res;
		} else {
			try {
		  		throw new Error('Problem with close data - match not found in statement.');
			} catch (e) {
		  		console.log(e.message);
		  		return e.name +' replacing Cloze: '+ front;
			}
		}
		
		

	}

	// if passed in a row i from the file it finds the cloze / answer part
	this.returnAnswer = function(filename, i){
		// returns just the cloze
		return new Promise(function(resolve, reject){
			handleFileReads(filename).then(function(response){
				var arr = response.toString().split('\n');
				var newarr = String(arr[i]).split(',');
				resolve(newarr[1]);
			}).catch(function(err){
				console.log(err);
				reject(err);
			})
		})	
	}
		

	// function to read files
	function handleFileReads(filename, action){
		var fs = require("fs");
		// console.log(ClozeFlashCard.filename);
		return new Promise(function(resolve, reject){
			fs.readFile(filename, 'utf8', function read(err, data) {
			    if (err) { 
			        reject(err);
			    }
			    resolve(data);
			})
		})
	}
}

module.exports = ClozeFlashCard;