'use strict'

var urlQuestions = 'data/baltimore.json';
var urlAnswers = 'data/family-baltimore.json';
var jsonDataQuestions, jsonDataAnswers;
var numQuests;
var question = 0;
var selection = [];

var loadQuestionsJson = function(urlQuestions){
  return new Promise(function(resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlQuestions, true);
    xmlhttp.onload = function() {
      if (xmlhttp.status === 200) {
        jsonDataQuestions = JSON.parse(xmlhttp.responseText);
        newQuestion(jsonDataQuestions);
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
    numQuests += 1;
    var i = randomSeed(arr.length)
    question = i+1;
    var elm = document.getElementsByTagName('h2')[1].innerHTML += arr[i].desc;
}

var newAnswers = function(arr) {
    numQuests += 1;
    var numQuestions = document.getElementsByTagName('label').length
    for (var i = 0; i<numQuestions; i++){
        var r = randomSeed(arr.length)
        selection.push(r);
        var elm = document.getElementsByTagName('label')[i].innerHTML += arr[r].name;
    }
}

var check = function() {
    for (var i = 0; i<selection.length; i++){
        var num = jsonDataAnswers[selection[i]].num
        var guess = document.getElementsByTagName('input')[i].checked
        if(num === question){
            if(guess){
                var elm = document.getElementsByTagName('label')[i].style.background = "green";
            } else {
                var elm = document.getElementsByTagName('label')[i].style.background = "pink";
            }
            
        } else {
               if(guess){
            var elm = document.getElementsByTagName('label')[i].style.background = "red";} else {
            var elm = document.getElementsByTagName('label')[i].style.background = "lightgreen";    
            }
        }
    }
}

document.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        check();
    }
});
