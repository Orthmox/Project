let answer = prompt("Please enter your name");
if (typeof(answer) === 'string' && answer.length !== 0) {
    var h1 = document.createElement('h1')
    h1.innerText = "Welcome" + " " + answer;
    document.body.innerText = '';
    document.body.appendChild(h1);
}