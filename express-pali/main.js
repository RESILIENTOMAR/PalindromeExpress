document.querySelector('#clickMe').addEventListener('click', checkP);

function checkP() {
  let userInput = document.querySelector("#wordInput").value;
  fetch(`/test?word=${userInput}`)
    .then(response => response.json())
    .then((data) => {
      showResult(data);

      function result(data) {
        if (data.isPal === true) {
          document.querySelector('#result').innerText = "You Found A Palindrome!";
        } else {
          document.querySelector('#result').innerText = "Sorry Try Again";
        }
      }
    });
}

