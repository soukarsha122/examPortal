// your code
var score = 0;
var currentIndex = 0;
var options, questions, firstOptions, secondOptions, thirdOptions, fourthOptions, correctAnswers;
var selectedAnswers = new Array(0);



function loadPortal() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            {
                myFunction(this);

            }
        }
    };
    xhttp.open("GET", "question_paper.xml", true);
    xhttp.send();

}

function myFunction(xml) {


    var xmlDoc = xml.responseXML;

    if (!xmlDoc) {
        console.error('XML document is null or undefined');
        return;
    }

    questions = xmlDoc.getElementsByTagName('text'); // stores all questions
    firstOptions = xmlDoc.getElementsByTagName('opt1'); // stores all option1s
    secondOptions = xmlDoc.getElementsByTagName('opt2'); // stores all option2s
    thirdOptions = xmlDoc.getElementsByTagName('opt3'); // stores all option3s
    fourthOptions = xmlDoc.getElementsByTagName('opt4'); // stores all option4s
    correctAnswers = xmlDoc.getElementsByTagName('correctAnswer'); // stores all correct answers

    // arr[i] stores the current answer of question i as provided by the candidate
    if (selectedAnswers.length == 0) {
        selectedAnswers = new Array(questions.length).fill("");
    }

    // If the candidate is presently on the last question then the next button will
    // become submit button
    if (currentIndex == questions.length - 1)
        document.getElementById("next").innerHTML = "Submit";
    else
        document.getElementById("next").disabled = false;

    // If the candidate is presently on the first question then the previous button will
    // be disabled
    if (currentIndex == 0)
        document.getElementById("prev").disabled = true;
    else
        document.getElementById("prev").disabled = false;


    // Fill the screen
    document.getElementById("ques").innerHTML = currentIndex + 1 + ")        " + questions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt1").innerHTML = firstOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt2").innerHTML = secondOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt3").innerHTML = thirdOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt4").innerHTML = fourthOptions[currentIndex].childNodes[0].nodeValue;

    // radios store the options
    options = document.getElementsByName("--Options--");

    for (var i = 0; i < options.length; i++) {

        // Get the label assosciated with radio button i
        var str = document.querySelector("label[for='" + options[i].id + "']").innerHTML;

        // If the current option is equal to the option 
        // provided by the user then check the option
        if (str == selectedAnswers[currentIndex]) {
            {
                options[i].checked = true;
            }
        }
    }


}


function next() {

    // ans stores the correct answer for the present question
    var ans = correctAnswers[currentIndex].childNodes[0].nodeValue;

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            // Fetch the answer provided by the candidate
            selectedAnswers[currentIndex] = document.querySelector("label[for='" + options[i].id + "']").innerHTML;
            break;
        }
    }

    currentIndex++;

    for (var i = 0; i < options.length; i++) {
        // Uncheck all radio buttons
        if (options[i].checked) {
            options[i].checked = false;
            break;
        }
    }
    if (currentIndex == questions.length) {

        // Once you click submit disable the buttons
        document.getElementById("next").disabled = true;
        document.getElementById("prev").disabled = true;

        // Evaluate Score
        for (var i = 0; i < selectedAnswers.length; i++) {
            console.log(selectedAnswers[i] + " " + correctAnswers[i].childNodes[0].nodeValue + "<br>");
            if (selectedAnswers[i] == correctAnswers[i].childNodes[0].nodeValue) {
                score++;
            }
        }
        document.getElementById("score").innerHTML = "Your Score is " + score + " out of " + questions.length;

    }
    else {

        loadPortal();
    }
}

function prev() {
    var ans = correctAnswers[currentIndex].childNodes[0].nodeValue;

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedAnswers[currentIndex] = document.querySelector("label[for='" + options[i].id + "']").innerHTML;
            break;
        }
    }
    // when on last question
    // going to the previous question must change the Submit button to next button
    if (document.getElementById("next").innerHTML == "Submit") {
        document.getElementById("next").innerHTML = "Next"
    }

    currentIndex--;

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            options[i].checked = false;
            break;
        }
    }
    loadPortal();

}
