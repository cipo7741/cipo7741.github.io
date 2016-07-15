'use strict'

var urlQuestions = 'data/enveloped.json';
var urlAnswers = 'data/virus-family-baltimore-enveloped-capsid-structure.json';
var jsonDataQuestions, jsonDataAnswers;
var numQuests = 0;
var numPoints = 0;
var question = 0;
var selection = [];
var checkFlag = false;

var loadQuestionsJson = function(urlQuestions){
  return new Promise(function(resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlQuestions, true);
    xmlhttp.onload = function() {
      if (xmlhttp.status === 200) {
        jsonDataQuestions = JSON.parse(xmlhttp.responseText);
        newQuestion(jsonDataQuestions);
        document.getElementById("submit").addEventListener("click", check);
      }
    }
    xmlhttp.onerror = function() {
      Error('Data didn\'t load successfully; error code:' + request.statusText);
    }
    xmlhttp.send();
  });
}

var loadAnswersJson = function(urlAnswers){
  return new Promise(function(resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlAnswers, true);
    xmlhttp.onload = function() {
      if (xmlhttp.status === 200) {
        jsonDataAnswers = JSON.parse(xmlhttp.responseText);
        newAnswers(jsonDataAnswers);
      }
    }
    xmlhttp.onerror = function() {
      Error('Data didn\'t load successfully; error code:' + request.statusText);
    }
    xmlhttp.send();
  });
}

loadQuestionsJson(urlQuestions);
loadAnswersJson(urlAnswers);

var randomSeed = function(x) {
    return Math.floor((Math.random() * x));
}

var randomSeeds = function(x, n) {
    var results = []
    var i = 0
    while (i<n){
        if (results.length === n){
            return results;
        }
        else if (results.c) {
            results.push(randomSeed(x));
        }
    }
    return results;
}

var newQuestion = function(arr) {
    var i = randomSeed(arr.length)
    question = i;
    var elm = document.getElementsByTagName('h2')[1].innerHTML = arr[i].desc;
}

var newAnswers = function(arr) {
    selection = []
    var numQuestions = document.getElementsByTagName('label').length
    for (var i = 0; i<numQuestions; i++){
        var r = randomSeed(arr.length)
        selection.push(r);
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "check";
        var label = document.getElementsByTagName('label')[i];
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(arr[r].name + " (" + arr[r].family + ")"));
    }
}

var check = function() {
    if(checkFlag){
        clean();
        newQuestion(jsonDataQuestions);
        newAnswers(jsonDataAnswers);
        checkFlag = false;
        document.getElementById('submit').value = 'check';
    } else{
        numQuests += 1;
        color();
        checkFlag = true;
        document.getElementById('submit').value = 'next';
    }
}

var color = function() {
    document.getElementsByName('check').disabled = true;
    var numRightAnswers = 0;
    for (var i = 0; i<selection.length; i++){
        var enveloped = jsonDataAnswers[selection[i]].enveloped
        var guess = document.getElementsByTagName('input')[i].checked
        if(enveloped === question){
            if(guess){
                document.getElementsByTagName('label')[i].style.background = "lightgreen";
                document.getElementsByClassName('virus-box')[i].style.background = "green";
                numRightAnswers += 1;
            } else {
                document.getElementsByTagName('label')[i].style.background = "pink";
                document.getElementsByClassName('virus-box')[i].style.background = "green";
            }
        } else {
            if(guess){
                var elm = document.getElementsByTagName('label')[i].style.background = "pink";
            } else {
               numRightAnswers += 1;
            }
        }
    }
    if (numRightAnswers === 6) {numPoints += 1;}
    showPoints();
}

var showPoints = function() {
    document.getElementById('points').innerHTML = "<p>"+ numPoints +"/"+ numQuests +"</p>";
}


var clean = function() {
    document.getElementsByName('check').disabled = false;
    var labels = document.getElementsByTagName('label')
    for (var i = 0; i<labels.length; i++){
        document.getElementsByClassName('virus-box')[i].style.background = "white";    
        var elm = document.getElementsByTagName('label')[i].style.background = "white";
        document.getElementsByTagName('label')[i].innerHTML = "";
    }
    
}

document.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        check();
    }
});
