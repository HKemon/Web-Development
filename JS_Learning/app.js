class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greeting() {
        return (`Hello from ${this.firstName} ${this.lastName}`);
    }
}

class Customer extends Person {
    constructor(firstName, lastName){
        super(firstName, lastName);
    }
}

const john = new Customer('Mr.','john','YO');

console.log(john.greeting());