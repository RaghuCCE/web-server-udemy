console.log('Msg from server');


const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msgOnePara = document.querySelector('#message-1');
const msgTwoPara = document.querySelector('#message-2');

weatherForm.addEventListener('submit', ((e) => {
    e.preventDefault();

    const sLocation = searchInput.value;
    if(sLocation.length <= 0) {
        msgTwoPara.textContent = 'Type a location to search'
        return;
    }

    const url = 'http://localhost:3000/weather?address=' + sLocation;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgTwoPara.textContent = 'Location not found';
            }
            else {
                msgTwoPara.textContent = data.summary;
            }
        })
    })

}))

