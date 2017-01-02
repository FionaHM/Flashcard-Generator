const fs = require('fs');
// I decided to use front for full text and back for cloze to make it consistent with basic FC and for ease of reuse of functions
var ClozeFlashCard = function(filename, front, back){
	this.filename = filename;
	this.front = front;
	this.back = back;
	// did not use this in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back, filename){
		// store the data as entered - modify later
		var textWithCloze = front + ',' + back; 
		fs.appendFile(this.filename, textWithCloze +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}

	// gets data from text file and puts it into array 
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

	this.hideClozeData = function(question, answer){
		// find the close data and replace it
		// verify that the close exists in the statement
		var lowerQuestion = question.toLowerCase();
		var lowerAnswer = answer.toLowerCase();
		if (lowerQuestion.indexOf(lowerAnswer) !== -1){
			var res = question.replace(answer, " ... ");
			return res;
		} else {
			try {
		  		throw new Error('Problem with close data - match not found in statement.');
			} catch (e) {
		  		console.log(e.message);
		  		return e.name +' replacing Cloze: '+ question;
			}
		}
		
		

	}


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