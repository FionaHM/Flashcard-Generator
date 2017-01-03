Flashcard-Generator
https://github.com/FionaHM/Flashcard-Generator

This is an application that allows users to create and view two types of flashcard:

   * Basic

Format is Question (front) and Answer (back).
For example: Question: What is the capital of France?; Answer: Paris.

   * Cloze-deleted

Format is closed deleted statement (front) and answer (back)
e.g. Statment: “.... is the capital of France”.
Answer: “Paris”.

* Run

Enter the following in the command line:
> node main.js

* Usage

This Flashcard generator has two modes of operation: 

    * admin 
    
    * user
    

In the admin mode the user is prompted to select an admin operation as follows:

? Please select an option: (Use arrow keys)

❯ populate-initial-data

add-flashcard 

view-flashcards 


    *   ‘populate-initial-data’

The first option ‘populate-initial-data’ takes seed data from a module and writes it to the output file.
In this application there are two pre-populated files: closePrototype.js and basicPrototype.js - one for
each type of flashcard, cloze-deleted and basic. These data files each contain an array of json objects - 
each array has five objects.  

e.g.  basicPrototype.js 

module.exports = 

[ {front: "Who delivers presents on Christmas Eve?" , back: "Santa Claus"},

{front: "What date is Christmas Day?" , back: "25th December" },

{front: "Which reindeer has a red nose?" , back: "Rudolph" },

{front: "Name a famous Christmas carol with the word Bells in the title." , back: "Jingle Bells"},

{front: "There were how many wise men in Bethlehem?" , back: "Three" }]


e.g.  clozePrototype.js 

module.exports = [ { front: "Santa Claus delivers presents on Christmas Eve?" , back: "Santa Claus" },

{front: "25th December is the date of Christmas Day?" , back: "25th December" },

{front: "Rudolph the reindeer has a red nose." , back: "Rudolph"},

{front: "Jingle Bells is a famous Christmas Carol with the word Bells in the title." , back: "Jingle Bells" },

{front: "There were three wise men in Bethlehem?" , back: "three"}]

When adding data to these files it is important to follow the above structure.

When the option ‘populate-initial-data’ is selected the application checks to see if this data population exercise has already occurred. To do this it checks the value of a counter called populateSeedData. This counter starts at 0, it updates once for each file, if populateSeedData has a value of 2 or more a message will be logged to the console stating: “Initial seed data has already been populated for ./basic-flashcards.txt” or “Initial seed data has already been populated for ./cloze-flashcards.txt”, and it will not update the data again in this instance of the application.

The function of the name “createFlashcard”  in the relevant constructor object is used to save the initial data to an output file - a separate file for each type of card i.e. “basic-flashcards.txt” or “cloze-flashcards.txt”.  This function takes the question (front), answer (back / cloze) and filename (.txt) as parameters.

These two output text files are the main method of storing flashcard data. To ensure there is no duplicate seed data population, the files are deleted each time the main.js function populateInitData is run successfully.


    *   ‘add-flashcard’

This option allows the admin user to add their own custom flashcards.  There are two flashcard options: basic and cloze. The first, basic, allows the admin user to add the questions and answers necessary to create a basic flashcard.


? Do you want to continue? (Y/n) Yes

? Please select an option: admin

? Please select an option: add-flashcard

? what do you want to add? basic

? Please enter a basic question: What is the capital of France?

? Please enter an answer to the previous question: Paris

Flashcard data has been saved.

? Do you want to continue? (Y/n) (Y/n) Y

For adding a cloze-deleted flashcard the admin user enters the full statement (front) followed by the cloze (back) as follows:

? Please select an option: admin

? Please select an option: add-flashcard

? what do you want to add? cloze

? Please enter the full statement for the cloze-deleted Flashcard: Paris is the capital of France.

? Please indicate the cloze part of the previous statement: Paris

Flashcard data has been saved.

? Do you want to continue? (Y/n) (Y/n) Y

In either case above the application will log a confirmation message “Flashcard data has been saved.” when the data has been successfully appended to the relevant storage txt file - this file will be created at this time if it does not already exist from a previous step.

    *   ‘view-flashcards’

This option allows the admin user to view individual flashcards of either type.  On selecting either “cloze” or “basic” flashcard types, the questions / front of the flashcard will appear in a list. The user can navigate the list to select the question for which they require to see the answer.

? Please select an option: view-flashcards

? what do you want to view? cloze

? Which flashcard do you want to view the answer for? 

    ...  delivers presents on christmas eve? 

❯   ...  is the date of christmas day? 

    ...  the reindeer has a red nose. 
  
    ...  is a famous christmas carol with the word bells in the title. 

    there were  ...  wise men in bethlehem? 

    ...  is the capital of france. 


Selecting an option yields the corresponding answer for that question:

? Which flashcard do you want to view the answer for?  ...  is the date of christmas day?

Answer: 25th December

? Do you want to continue? (Y/n) (Y/n) 

In all cases the user will be presented with an option as to whether they would like to continue with the application. Selecting "Y" or hitting enter (default: Y) the application will present the inital options again and the user can carry out any of the aforementioned actions again - this can be repeated as many times as the user requires.  

Selecting "N" terminates the current instance of the application.  Data created in this instance will still be in the output txt files until a new instance is run and the populate-initial-data is successfully run.


In the user mode the user is prompted to select a user operation as follows:

? Please select an option: user

? Which quiz would you like to take: (Use arrow keys)

❯   basic 

    cloze 

On selecting an option, the user will be taken through all of the questions in the .txt file: either basic-flashcards.txt if the basic option is selected or cloze-flashcards.txt if the cloze option is selected.

e.g. basic

? Which quiz would you like to take: basic

? Who delivers presents on Christmas Eve? ANSWER:  Santa Claus

You are correct the answer is:  Santa Claus

? What date is Christmas Day? ANSWER:  25th December

You are correct the answer is:  25th December

? Which reindeer has a red nose? ANSWER:  Blitzer

Incorrect the answer is:  Rudolph

? Name a famous Christmas carol with the word Bells in the title. ANSWER:  Silent Night

Incorrect the answer is:  Jingle Bells

? There were how many wise men in Bethlehem? ANSWER:  Three

You are correct the answer is:  Three

? Do you want to continue? (Y/n) (Y/n) 


Note correct and incorrect answers will be indicated, but there is no score kept. Answers are not case sensitive.

e.g. cloze

? Which quiz would you like to take: cloze

?  ...  delivers presents on christmas eve? ANSWER:  Santa Claus

You are correct the answer is: Santa Claus

?  ...  is the date of christmas day? ANSWER:  25th December

You are correct the answer is: 25th December

?  ...  the reindeer has a red nose. ANSWER:  Comet

Incorrect the answer is: Rudolph

?  ...  is a famous christmas carol with the word bells in the title. ANSWER:  Silent Night

Incorrect the answer is: Jingle Bells

? there were  ...  wise men in bethlehem? ANSWER:  thrre

Incorrect the answer is: three

? Do you want to continue? (Y/n) (Y/n)

As the user adds new flashcards in the admin section these will be populated when the user runs the quiz.

For the close deleted flashcards, if the user inputs a cloze that is not in the statement/question, an error will be presented.

E.g. user entered:

? what do you want to add? cloze

? Please enter the full text for the cloze-deleted Flashcard: It is snowing today.

? Please indicate the cloze part of the previous statement: rain

Flashcard data has been saved.


The error message:

? Error replacing Cloze: It is snowing today. ANSWER:  <user can put anything here and hit enter>

Incorrect the answer is: rain



*  Integration with other libraries

The following libraries were used and those that are not native to node should be included in package.json.

    *   Inquirer
var inquirer = require('inquirer');

Used to present options and to grab user input from the command line. Needs to be added as a dependency in package.json so that it will be installed into node_modules folder when npm install is run.

package.json should include:


"dependencies": {

"inquirer": "^2.0.0"

}

    *   fs
var fs = require('fs');

Used to for all file operations - read, write, delete, exists etc. 


*  Files

The folder structure is flat - all files are in same parent folder.

    *   Application Entry:
main.js                 -	> node main.js

    *   Constructor Modules:
BasicFlashcard.js		  -  	required file, constructor module for basic flashcard.
ClozeFlashcard.js     -	  required file, constructor module for cloze flashcard.

    *   Data Input: 
clozePrototype.js		  - 	contains initial flashcard object data
basicPrototype.js		  -	  contains initial flashcard object data

    *   Output / Data Storage:
basic-flashcards.txt	- 	created at runtime. Main storage file for basic flashcard data.
cloze-flashcards.txt	-	  created at runtime. Main storage file for cloze flashcard data.

    *   Other:
node_modules          -	  folder that contains relevant node modules
package.json          -   created when command ‘npm init’ is run.  Can be modified manually to include dependencies data or automatically when ‘npm install <library> --save’ is run e.g. ‘npm install inquirer --save’
README.md 		        - 	this file containing relevant operational information.

*  License
Flashcard-Generator is released under the MIT license.

