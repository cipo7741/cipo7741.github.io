'use strict'

var urlAnswers = 'data/virus-family-baltimore-enveloped-capsid-structure.json';
var jsonDataAnswers;

var loadAnswersJson = function(urlAnswers){
  return new Promise(function(resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', urlAnswers, true);
    xmlhttp.onload = function() {
      if (xmlhttp.status === 200) {
        jsonDataAnswers = JSON.parse(xmlhttp.responseText);
        fill(jsonDataAnswers);
      }
    }
    xmlhttp.onerror = function() {
      Error('Data didn\'t load successfully; error code:' + request.statusText);
    }
    xmlhttp.send();
  });
}

loadAnswersJson(urlAnswers);


var fill = function(arr) {

    for(var i = 0; i < arr.length; i++){
        var textField = document.createElement('p');
        textField.appendChild(document.createTextNode(arr[i].name + " (" + arr[i].family + ")"));
        document.getElementById(arr[i].num).appendChild(textField);
    }        
}
