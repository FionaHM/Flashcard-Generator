const fs = require('fs');
var globalvar = [];

// create 5 instances initially
var BasicFlashCard = function(front, back){
	var filename = "basic-flashcards.txt";

	this.front = front;
	this.back = back;
	this.answer = [];

	// 
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

	function handleFileReads(filename, action){
			var fs = require("fs");
			console.log(filename);
			return new Promise(function(resolve, reject){
				fs.readFile(filename, 'utf8', function read(err, data) {
				    if (err) {
				        reject(err);
				    }
				    resolve(data);
				})
			})
		}

	// pulls data from text file and puts it into array 
	this.getFCData = function(){
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
	}


module.exports = BasicFlashCard;


 

 
