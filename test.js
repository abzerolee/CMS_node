Object.prototype.extends = function(Parent) {
	let F = function() {};
	F.prototype = Parent.prototype;
	this.prototype = new F();
}
  
const Animal = function(name) {
	this.name = name;
}

const Dog = function(name) {
	this.say = function() {
		console.log('wa wa wa!');
	}
}

const Cat = function() {
	this.say = function() {
		console.log('mi mi mi!');
	}
}

Dog.extends(Animal);

let dog = new Dog('bob');

console.log(dog.name);