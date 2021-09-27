'use strict';

// MARK: CONSTRUCTOR FUNCTIONS: we can use constructor functions to build an object using a function. A constructor function always start with a capital letter and We call it with the new operator.

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jose = new Person('Jose', 1971);

/* Whenever we call a constructor function, behind the scenes, these four steps happens:
1) A new empty object {} is created.
2) the function is called and the this keyword will be set to this newly created object, this = {}.
3) {} is linked to the prototype.
4) the object that was created in the beginning is then automatically returned from the constructor function.*/

const pep = new Person('Pep', 1975); //We can use the constructor function to create as many objects as we want

console.log(jose instanceof Person); //JavaScript doesn't really have classes in the sense of traditional OOP. constructor functions are useds to kind of simulate classes. We create object from a constructor function so we can still say that jose here is an instance of person and the same goes for pep.

// MARK: PROTOTYPES
// each and every function in JavaScript automatically has a property called prototype, which is an object inside which we can define any method.

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};
console.log(Person.prototype);

// every object that's created by a certain constructor function will get access (inherit) to all the methods and properties that we define inside the prototype property:
jose.calcAge(); // we can now use the calcAge method the Jose object even though it is not really on the object itself. This happens because of PROTOTYPAL INHERITANCE.
pep.calcAge(); // we can create as many person objects as we like and all of them will then inherit this method, without the method being directly attached to all the objects themselves and this is essential for code performance.
console.log(jose, pep);

console.log(jose.__proto__); //  jose object linked to its prototype via the __proto__ property, this shows the prototype (Not prototype property) of the jose object.
console.log(jose.__proto__ === Person.prototype); // prototype of the Jonas object is essentially the prototype property of the constructor function.
console.log(jose.hasOwnProperty('firstName')); // own properties of an objects are only the ones that are declared directly on the object itself.
console.log(jose.hasOwnProperty('calcAge')); // This doesn't include the inherited properties.

//PROTOTYPE CHAIN: whenever JavaScript can't find a certain property or method in a certain object it's gonna look up into the next prototype in the prototype chain and see if it can find it there. It is similar to the scope chain but instead of working with scopes, it works with properties and methods in objects.
console.log(jose.__proto__.__proto__);

/* MARK: Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h  */

console.log('CODING CHALLENGE 1:');
const Car = function (manufacturer, speed) {
  this.manufacturer = manufacturer;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.manufacturer} is moving at speed of ${this.speed}km/hr`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.manufacturer} is moving at speed of ${this.speed}km/hr`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.brake();
mercedes.brake();
mercedes.accelerate();
console.log('----------------------------------------');

/* MARK: ES6 CLASSES:
We see how to implement prototypal inheritance with constructor functions and then manually setting methods on the constructor functions, prototype property. Now ES6 classes essentially allow us to do the exact same thing but using a nicer and more modern syntax.*/

// class expression
const PersonClassExp = class {};

// class declaration
class PersonClassDec {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //Instance methods: Methods that would be added to .prototype property:
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  //Static methods: not available on the instances:
  static hey() {
    console.log('Hey there');
  }
}
// inside the class, first thing that we need to do is to add a constructor method. This works in a pretty similar way as a constructor function.
// all of the methods that we write inside the class BUT outside of the constructor, will be on the prototype of the objects and not on the objects themselves.

const klopp = new PersonClassDec('Klopp', 1977);
console.log(klopp);
klopp.calcAge();

PersonClassDec.prototype.greetings = function () {
  console.log(`Hello ${this.firstName}!`);
}; // we can also add a method manually to the prototype.
klopp.greetings();

PersonClassDec.hey(); //Calling the static method

console.log('----------------------------------------');

// 1) Classes are NOT hoisted, that means we cannot use them before they are declared in the code.
// 2) classes are also first class citizens, that means is that we can pass them into functions and also return them from functions. That is because classes are really just a special kind of function.
// 3) Classes are executed in strict mode, even if we didn't activate it for our entire script.

/* MARK: OBJECT.CREATE 
A third way of implementing prototypal inheritance or delegation apart from Constructor functions and ES6 Classes is to use a function called Object.create.
With Object.create, there is still the idea of prototypal inheritance. However, there are no prototype properties involved, And also no constructor functions, and no new operator.

So instead, we can use Object.create to manually set the prototype of an object to any other object that we want. For that, first we create an object that we want to be the prototype of all the objects. */

const PersonPrototype = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonPrototype); // Here in Object.create we pass in the object that we want to be the prototype of this new object. So this will now return a brand new object, that is linked to the prototype that we passed in.
steven.init('Steven', 1944);
steven.calcAge();

/* MARK: Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h */

console.log('CODING CHALLENGE 2:');

class CarCl {
  constructor(manufacturer, speed) {
    this.manufacturer = manufacturer;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(
      `The ${this.manufacturer} Car is going at a speed of ${this.speed}km/hr`
    );
  }
  brake() {
    this.speed -= 5;
    console.log(
      `The ${this.manufacturer} Car si going at a speed of ${this.speed}km/hr`
    );
  }
  // GETTER: here we transform a method to a property:
  get speedUS() {
    return this.speed / 1.6;
  }
  // SETTER: needs to take exactly one argument:
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford.speedUS); // we access getter and setter as a property, not call them as a function.
ford.accelerate();
ford.speedUS = 50;
console.log(ford);
