// async function myFunction() {
//     return 'Hello';
// }
//
// console.log(myFunction());

// async function myFunction() {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('Hello'),1000);
//     });
//
//     return await promise;
// }
//
// myFunction()
//     .then(response => console.log(response));

const http = new EasyHTTP;

// GET
// http.get('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// POST
const user = {
    name: 'emon',
    username: 'emon007',
    email: 'emon@gmail.com'
};

// http.post('https://jsonplaceholder.typicode.com/users', user)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// http.put('https://jsonplaceholder.typicode.com/users/2', user)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// http.delete('https://jsonplaceholder.typicode.com/users/2')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));