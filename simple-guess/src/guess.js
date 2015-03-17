var xmlhttp = new XMLHttpRequest();
  var url = "data/java/lang/Math.json";
var method;

  function randomSeed(x) {
    return Math.floor((Math.random() * x));
  }

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var myArr = JSON.parse(xmlhttp.responseText);
          i = randomSeed(myArr.length)
          buildQuest(myArr, i);
          method = myArr[i].Method;
      }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function buildQuest(arr, i) {
      document.getElementById("description").innerHTML = arr[i].Description;
      var guessInput = document.createElement("input");
      guessInput.setAttribute('type', 'text');
      guessInput.setAttribute('id', 'guessInput');
      guessInput.setAttribute('style', 'width: calc(15px *' + arr[i].Method.length +');');
      guessInput = new XMLSerializer().serializeToString(guessInput)
      var guessSubmit = document.createElement("input");
      guessSubmit.setAttribute('type', 'submit');
      guessSubmit.setAttribute('class', 'button');
      guessSubmit.setAttribute('value', '>');
      guessSubmit.setAttribute('onclick', 'check()');
      guessSubmit = new XMLSerializer().serializeToString(guessSubmit)
      document.getElementById("guess").innerHTML = "java.lang.Math."
      document.getElementById("guess").innerHTML += guessInput + arr[i].Arguments + guessSubmit;
  }

  check = function() {
  var text, x;
  x = document.getElementById("guessInput").value;
  if (x === method) {
    text = "Correct";
  } else {
    text = "Wrong, try again.";
  }
  return document.getElementById("result").innerHTML = text;

  
};