function* sayName() {
    yield 'Jack';
    yield 'John';
    yield 'Mick';
}

const name = sayName();

console.log(name.next().value);
console.log(name.next().value);
console.log(name.next().value);

function* nextNumber() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const next = nextNumber();

console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);
console.log(next.next().value);