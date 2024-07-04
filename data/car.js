class Car {

  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  };

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}`);
    console.log(`Speed: ${this.speed} km/h`);

    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`Trunk: ${trunkStatus}`);
  };

  go() {
    if(this.isTrunkOpen) {
      
      this.speed += 5;
      
      if(this.speed > 200) {
        this.speed = 200;
      }
     }
    };

  brake() {
    this.speed -= 5;
    
    if(this.speed < 0) {
      this.speed = 0;
    }
  };

  openTrunk() {
    this.isTrunkOpen = true;
  };

  closeTrunk() {
    this.isTrunkOpen = false;
  };

};

class RaceCar extends Car {

  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if(this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  };

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  };

};

/*

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});


console.log(car1);
car1.displayInfo();

console.log(car2);
car2.go();
car2.go();
car2.go();
car2.brake();
car2.go();
car2.displayInfo();

*/

const raceCar = new RaceCar({
  brand: 'Mclaren',
  model: 'F1',
  acceleration: 20
});

console.log(raceCar);

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();