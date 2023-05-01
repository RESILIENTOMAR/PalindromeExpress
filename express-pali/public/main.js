document.querySelector('#clickMe').addEventListener('click', checkP);

function checkP() {
    let userInput = document.querySelector("#wordInput").value;
    fetch(`/test?input=${userInput}`)
        .then(response => response.json())
        .then((data) => {
            result(data);

            function result(data) {
                if (data.isPali === true) {
                    document.querySelector('#result').innerText = "You Found A Palindrome!";
                } else {
                    document.querySelector('#result').innerText = "Sorry Try Again";
                }
            }

        });
}

