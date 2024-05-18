class Car {
    constructor(color, manufacturer, model, year, engineOn){
        this.color = color;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
        this.engineOn = engineOn;
    }
    engineStartStop(){
        this.engineOn = !this.engineOn;
    }
    engineStatus(){
        if (this.engineOn == true){
            console.log("Engine is running.")
        }
        else{
            console.log("Engine is off!")
        }
    }
    getself(){
        console.log(this);
    }
    getPrototype(){
        console.log(Object.getPrototypeOf(this));
    }
}

var car1 = new Car("white", "Mercedes", "G Wagon", 2018, false)
// car1.engineStatus()
// car1.engineStartStop()
// car1.engineStatus()
// car1.engineStartStop()
// car1.engineStatus()
// car1.getself()
// car1.getPrototype()
// console.log(car1)

// 

// console.log("abcd".match(/d/))

class Supercar extends Car{
    constructor(passengers, turboOn, color, engineOn){
        super(color, engineOn);
        this.passengers = passengers;
        this.turboOn = turboOn;
    }
    toggleTurbo(){
        this.turboOn = !this.turboOn;
        console.log("Turbo status:", this.turboOn)
    }
    engineStartStop(){
        super.engineStartStop()
        super.engineStatus()
        console.log("Engine is 100% functional.")
    }
}

var car2 = new Car("Blue", "Ford", "Escape", 2020, false)
var supercar1 = new Supercar(2, false, "Yellow", false)

supercar1.getPrototype()
console.log(Object.getPrototypeOf(supercar1))

class Animal {
    speak() {
      console.log('Animal makes a sound');
    }
  }
  
  class Dog extends Animal {
    bark() {
      console.log('Dog barks');
    }
  }
  
  const dog = new Dog();
  
//   

class Anima {
    constructor(lg) {
        this.legs = lg;
    }
}

class Dogs extends Anima {
    constructor() {
        super(4);
    }
}

var result = new Dogs();
console.log(result.legs);