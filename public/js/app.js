const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    message.textContent = "Loading..."

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
    
        if(data.error) {
            message.textContent = data.error;
        } else {
            message.textContent = `${data.location}: ${data.forecast}`
        }
    })
})
// hi
})


