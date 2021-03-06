const fs = require('fs');

var BasicFlashCard = function(filename, front, back){
	this.filename = filename;
	this.front = front;
	this.back = back;
	this.answer = [];

	// gets data from text file and puts it into array for use in the main.js
	// did not use "this" in the fuction paramaters so that the function can be used outside the constructor objecct
	this.createFlashcard = function(front, back, filename){

		// // save to a text file 
		var basicCardData =  front + ', ' + back ;
		fs.appendFile(filename, basicCardData  +'\n', function(err) {
		    if(err) {
		        return console.log(err);
			} 
		})
	}

	// function to read files
	function handleFileReads(filename){
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

	// pulls data from text file and puts it into array for use in main.js
	this.getFCData = function(filename){
		return new Promise(function(resolve, reject){
			// prints Questions
			// var action = 0;
			handleFileReads(filename).then(function(response){
					var arr = response.toString().split('\n');
					BasicFlashCard.answer = arr.splice(0);
					resolve(BasicFlashCard.answer);
		
				}).catch(function(err){
					console.log(err);
					reject(err);
				})
			})	
		}


	// this.returnAnswer = function(back){
	// 	// returns just the cloze
	// 	console.log("in here");
	// 	return 'ANSWER: '+ back;
	// }
}


module.exports = BasicFlashCard;


 

 
