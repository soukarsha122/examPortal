
var score = 0;
var currentIndex = 0;
var options, questions, firstOptions, secondOptions, thirdOptions, fourthOptions, correctAnswers;
var selectedAnswers = new Array(0);

const curentExecution = (xml) => {

    var xmlDoc = xml.responseXML;

    questions = xmlDoc.getElementsByTagName('text');
    firstOptions = xmlDoc.getElementsByTagName('opt1');
    secondOptions = xmlDoc.getElementsByTagName('opt2');
    thirdOptions = xmlDoc.getElementsByTagName('opt3');
    fourthOptions = xmlDoc.getElementsByTagName('opt4');
    correctAnswers = xmlDoc.getElementsByTagName('correctAnswer');

    document.getElementById("ques").innerHTML = questions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt1").innerHTML = firstOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt2").innerHTML = secondOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt3").innerHTML = thirdOptions[currentIndex].childNodes[0].nodeValue;
    document.getElementById("optt4").innerHTML = fourthOptions[currentIndex].childNodes[0].nodeValue;

    if (!selectedAnswers.length) {

        selectedAnswers = new Array(questions.length).fill("");
    }
    if (currentIndex == questions.length - 1)
        document.getElementById("next").innerHTML = "Submit";
    else
        document.getElementById("next").disabled = false;
    if (currentIndex == 0)
        document.getElementById("prev").disabled = true;
    else
        document.getElementById("prev").disabled = false;


    options = document.getElementsByName("--Options--");
    for (var i = 0; i < options.length; i++) {
        if (document.querySelector("label[for='" + options[i].id + "']").innerHTML == selectedAnswers[currentIndex]) {
            {
                options[i].checked = true;
            }
        }
    }
}

const loadXML = () => {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            {
                curentExecution(this);
            }
        }
    };
    xhttp.open("GET", "question_paper.xml", true);
    xhttp.send();
}

const fetchAnswer = () => {

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedAnswers[currentIndex] = document.querySelector("label[for='" + options[i].id + "']").innerHTML;
            return;
        }
    }
}

const resetAllOptions = () => {

    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            options[i].checked = false;
            break;
        }
    }
}

const evaluateScore = () => {
    for (var i = 0; i < selectedAnswers.length; i++) {
        console.log(selectedAnswers[i] + " " + correctAnswers[i].childNodes[0].nodeValue + "<br>");
        if (selectedAnswers[i] == correctAnswers[i].childNodes[0].nodeValue) {
            score++;
        }
    }
    return score;
}

document.getElementsByTagName("body")[0].onload = loadXML();

document.getElementById("prev").onclick = () => {

    fetchAnswer();
    if (currentIndex == questions.length - 1) {
        document.getElementById("next").innerHTML = "Next"
    }
    currentIndex--;
    resetAllOptions();
    loadXML();

}

document.getElementById("next").onclick = () => {

    fetchAnswer();
    currentIndex++;
    resetAllOptions();
    if (currentIndex == questions.length) {

        document.getElementById("next").disabled = true;
        document.getElementById("prev").disabled = true;
        document.getElementById("score").innerHTML = "Your Score is " + evaluateScore(); + " out of " + questions.length;

    }
    else {
        loadXML();
    }

}