// Your favorite number
let favoriteNumber = 7;

// Make a request to get a fact about your favorite number
fetch(`http://numbersapi.com/${favoriteNumber}?json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.body.innerHTML += `<p>${data.text}</p>`;
    })
    .catch(err => console.log('Error:', err));


// Array of numbers you want facts about
let numbers = [3, 7, 21];

// Make a request to get facts about these numbers
fetch(`http://numbersapi.com/${numbers}?json`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let num in data) {
            document.body.innerHTML += `<p>${data[num]}</p>`;
        }
    })
    .catch(err => console.log('Error:', err));


// Make 4 requests to get facts about your favorite number
let promises = [];
for (let i = 0; i < 4; i++) {
    promises.push(fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(response => response.json()));
}

Promise.all(promises)
    .then(facts => {
        facts.forEach(fact => {
            document.body.innerHTML += `<p>${fact.text}</p>`;
        });
    })
    .catch(err => console.log('Error:', err));
