function test(size) {
    for(var i = 1; i < size+1; i++){
        console.log('*' * i);
    }
}

var car = {};
car.color = "Red";
car.mileage = 23983;
car.start = function(){
    console.log("Starting Engine...")
    console.log("Engine is running.")
}
car['lightson'] = 0
car.light = function() {
    if (car['lightson'] == 0) {
        console.log("Lights are off. Turning on lights now...");
        this.lightson = 1;
    }
    else {
        console.log("Lights are on. Turning off lights now...");
        this.lightson = 0;
    }
}


car.light()
car.light()