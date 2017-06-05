// Initialize global variables
var questionCount = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var countdown = 30;
var correct = false;

$('.results').hide();
$('#multipleChoice').hide();

// Create trivia object to hold questions
// ==================================================
var trivia = {
	"questions" : [
		{
			"question" : "Who was the first emperor of China?",
			"answer" : "Emperor Qin Shi Huang",
			"multipleChoice" : [
				"Emperor Song Taizu", "Emperor Qin Shi Huang", "Emperor Yongle", "Emperor Tang Taizong"
			]
		},
		{
			"question" : "How long did the Tang Dynasty reign?",
			"answer" : "288 Years",
			"multipleChoice" : [
				"112 Years", "452 Years", "288 Years", "326 Years"
			]
		},
		{
			"question" : "Who were the Sent Down Youth? ",
			"answer" : "Red Guards sent to the countryside",
			"multipleChoice" : [
				"Red Guards sent to the countryside", "Children in Beijing", "A Chinese punk band", "Empress Dowager Cixi's children"
			]
		},
		{
			"question" : "What island was conceded in the treaty of Nanking?",
			"answer" : "Hong Kong",
			"multipleChoice" : [
				"Macau", "Taiwan", "Diayou", "Hong Kong"
			]
		},
		{
			"question" : "Who is the father of the Republic of China?",
			"answer" : "Sun Yatsen",
			"multipleChoice" : [
				"Chang Kaishek", "Mao Zedong", "Sun Yatsen", "Li Zongren"
			]
		},
		{
			"question" : "What two dynasties were not of the Han ethnicity?",
			"answer" : "Yuan and Qing",
			"multipleChoice" : [
				"Yuan and Qing", "Song and Tang", "Han and Sui", "Ming and Qin"
			]
		},
		{
			"question" : "Which Ming Emperor sent voyages to Africa?",
			"answer" : "Yongle Emperor",
			"multipleChoice" : [
				"Tianqi Emperor", "Yongle Emperor", "Hongwu Emperor", "Xian Emperor"
			]
		}
	]
}
		

//display end result
function results () {
	
	$('#showCountDown').hide();
	$('#triviaQuestion').hide();
	$('.choices').hide();
	$('.results').show();
	$('#correct').html("Correctly Answered " + correctAnswers);
	$('#wrong').html("Wrongly Answered " + incorrectAnswers);
	$('#unanswered').html("Unanswered " + unanswered);
	$('.resetButton').show();
}	

//game start
function start() {

	$('.resetButton').hide();
	askQuestion(questionCount);
	counter = setInterval(nextQuestionCount,1000);
}

//question display
function askQuestion(questionCount) {
	countdown = 30;
	$('#multipleChoice').show();
	if( questionCount < 7 ) {
		console.log(trivia.questions[questionCount].question);
		$('#triviaQuestion').html(trivia.questions[questionCount].question);

		//multiple choice display
		$('#a').html(trivia.questions[questionCount].multipleChoice[0]);
		$('#b').html(trivia.questions[questionCount].multipleChoice[1]);
		$('#c').html(trivia.questions[questionCount].multipleChoice[2]);
		$('#d').html(trivia.questions[questionCount].multipleChoice[3]);
	}

	else {
		clearInterval(counter);
		results();
	}
}

//correct or incorrect
function checkIfCorrect(guessed) {
	if( guessed === trivia.questions[questionCount].answer) {
		return true;
	}

	else {
		return false;
	}
}

//listen for start
$('.startButton').on('click', function(){
	$('.startButton').hide();
	questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 30;

	start();
});

//listen for answers
$('.list-group-item').on('click', function(){

	if (checkIfCorrect($(this).html()) === true) {
		correctAnswers++;
		console.log(" # of Correct Answers: " + correctAnswers);
		questionCount++;
		askQuestion(questionCount);
	}

	else if (checkIfCorrect($(this).html()) === false){
		incorrectAnswers++;
		console.log(" # of Incorrect Answers: " + incorrectAnswers);
		questionCount++;
		askQuestion(questionCount);
	}
});


//timer
function nextQuestionCount() {
	countdown--;

    $('#showCountDown').html('<h4>Time Remaining: ' + countdown + ' seconds</h4>');

    if (countdown === 0){

        clearInterval(counter);

        //time up
        unanswered++;
        console.log(" # of Unanswered: " + unanswered);
        console.log('Your Time is Up!')

        questionCount++;

        if ( questionCount == 7 ) {
        	clearInterval(counter);
        	results();
        }

        else {
	        askQuestion(questionCount);

	        countdown = 30;

	        counter = setInterval(countDownToNextQuestion,1000);
        }
    }
}

//reset
$(document).ready(function() {
    $('.resetButton').click(function() {
        location.reload();
    });
});  
