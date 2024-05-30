var h2 = document.createElement('h1')
h2.innerText = "Please enter your favorite quote"
var input = document.createElement('input')
input.setAttribute('type', 'text')
// document.body.innerText = '';
document.body.appendChild(h2);
document.body.appendChild(input);
// input.addEventListener('input', () => h1.innerText = input.value) //updates as you type
input.addEventListener('change', () => h2.innerText = input.value) //updates after you press enter

//Change the h1 heading on click
const h1 = document.querySelector('h1')
const arr = ['Next Page Domain', 'First Click', 'Second Click', 'Third Click']
const handleClicks = () => {
    switch(h1.innerText) {
        case arr[0]:
            h1.innerText = arr[1];
            break;
        case arr[1]:
            h1.innerText = arr[2];
            break;
        case arr[2]:
            h1.innerText = arr[3];
            break;
        default:
            h1.innerText = arr[0];
    }
}
h1.addEventListener('click', handleClicks)