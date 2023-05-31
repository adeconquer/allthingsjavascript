//Iterator Example
// function nameIterator(names) {
//     let nextIndex = 0;
//     return {
//         next: function() {
//             return nextIndex < names.length ? { value: names[nextIndex++], done: false } : { done: true }
//         }
//     }
// }

//create array of name
// const namesArray = ['jack', 'Jill', 'John'];
//Init iterator and pass in the names array
// const names = nameIterator(namesArray);

// console.log(names.next());

//Generator example
// function* sayName() {
//     yield 'Jack';
//     yield 'Jill';
//     yield 'John';
// }

// const name = sayName();
// console.log(name.next())

//ID creator
function* createIds() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const gen = createIds();
console.log(gen.next())