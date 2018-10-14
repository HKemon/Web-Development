// async function myFunction() {
//     return 'Hello';
// }
//
// console.log(myFunction());

async function myFunction() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Hello'),1000);
    });
    
    return await promise;
}

myFunction()
    .then(response => console.log(response));