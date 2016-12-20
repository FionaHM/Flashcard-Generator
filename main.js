var basicFC = require('./BasicFlashcard.js');
var clozeFC = require('./ClozeFlashcard.js');



// dummy data
var front = 'Who won the Eurovision Song Contest?';
var back =	'Absolutely no idea!';
//front and back are taken in from some UI
var newBasicFC = new basicFC();
newBasicFC.createBasicFlashcard(front, back);
newBasicFC.displayBasicQuestion();
newBasicFC.displayBasicAnswer();


var text = 'Cubs won the World Series?';
var cloze =	'Cubs';
var newClozeFC = new clozeFC();

newClozeFC.createClozeFlashcard(text, cloze);
newClozeFC.printCloze();
newClozeFC.printPartial();
