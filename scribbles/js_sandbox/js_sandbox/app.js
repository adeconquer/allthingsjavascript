// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// Person.prototype.greeting = function() {
//     return `Hello There ${this.firstName} ${this.lastName}`;
// }

// const person1 = new Person("john", "Doe");

// function Customer(firstName, lastName, phone, membership) {
//     Person.call(this, firstName, lastName);
//     this.phone = phone;
//     this.membership = membership;
// }

// Customer.prototype = Object.create(Person.prototype);

// Customer.prototype.constructor = Customer;

// Customer.prototype.greeting = function() {
//     return `Something else`
// }

// const customer1 = new Customer("Tom", "Smith", "555-555-5555", "Standard")

// console.log(customer1);
// console.log(customer1.greeting());

// const personPrototypes = {
//     greeting: function() {
//         return `Hello there ${this.firstName} ${this.lastName}`
//     },
//     getsMarried: function(newLastName) {
//         this.lastName = newLastName;
//     }

// }

// const mary = Object.create(personPrototypes);
// mary.firstName = "Mary";
// mary.lastName = "Williams";
// mary.age = 30;
// mary.getsMarried("Thompson");

// console.log(personPrototypes);
// console.log(mary.greeting());

// const brad = Object.create(personPrototypes, {
//     firstName: { value: "Brad" },
//     lastName: { value: "Traversy" },
//     age: { value: 36 }
// })

// console.log(brad);
// console.log(brad.greeting())

//ES6 classes

// class Person {
//     constructor(firstName, lastName, dob) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.birthday = new Date(dob);

//     }

//     calculateAge() {
//         const diff = new Date() - this.birthday.getTime();
//         const ageDate = new Date(diff);
//         return Math.abs(ageDate.getUTCFullYear() - 1970)
//     }

//     getsMarried(newLastName) {
//         this.lastName = newLastName;
//     }



// }

// const mary = new Person("Mary", "Jane", "11-13-1980");

// mary.getsMarried("Thompson");

// console.log(mary);
// console.log(Person.numberInstatiated());

//Inheritance, extending classes

// class Person {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName
//     }

//     greeting() {
//         return `Hello there ${this.firstName} ${this.lastName}`;
//     }
// }

// class Customer extends Person {
//     constructor(firstName, lastName, phone, membership) {
//         super(firstName, lastName)
//         this.phone = phone;
//         this.membership = membership;
//     }
// }

// const john = new Customer("John", "Doe", "555-555-5555", "Standard");

// console.log(john)

// class
// class ClassCar {
//     drive() {
//         console.log('Vroom!');
//     }
// }

// const car1 = new ClassCar();
// console.log(car1.drive());


// // constructor
// function ConstructorCar() {}

// ConstructorCar.prototype.drive = function() {
//     console.log('Vroom!');
// };

// const car2 = new ConstructorCar();
// console.log(car2.drive());


// // factory
// const proto = {
//     drive() {
//         console.log('Vroom!');
//     }
// };

// const factoryCar = () => Object.create(proto);

// const car3 = factoryCar();
// console.log(factoryCar());
// console.log(car3.drive());

// Constructor
// function Person(name, age) {
//     this.name = name;
//     this.age = age
// }

// //ES5
// Person.prototype.sayHi = function() {
//     console.log(`Hi, my name is ${this.name}`)
// }


// const Ben = new Person('Ben', 30)
// console.log(Ben)
// console.log(Ben.sayHi())

//Factory Function
// function Person(name, age) {
//     return {
//         name,
//         age,
//         sayHi: function() { console.log(`Hi, my name is ${name}`) }
//     }
// }

// const Ken = Person('Ken', 31)
// console.log(Ken)
// console.log(Ken.sayHi())

//Class

// class Person {
//     constructor(name, age) {
//         this.name = name,
//             this.age = age
//     }
//     sayHI() {
//         return console.log(`Hi, my name is ${this.name}`);
//     }
// }
// const Pen = new Person('Pen', 32)
// console.log(Pen)
// console.log(Pen.sayHI())