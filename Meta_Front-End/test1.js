var day = "Sunday";

switch (day) {
    case 'Monday':
        console.log("Start of the working week!");
        break;
    case 'Tuesday':
        console.log("It's just getting started.");
        break;
    case 'Wednesday':
        console.log("It's mid-week");
        break;
    case 'Thursday':
        console.log("Keep going! You're almost there.");
        break;
    case 'Friday':
        console.log("The Weekend is here");
        break;
    case 'Saturday':
        console.log("Relaaaaax!");
        break;
    case 'Sunday':
        console.log("Let's go to church.");
        break;
    default:
        console.log("This is not a valid day name")
}

var i = 5;
while (i < 10){
    console.log("&");
    i++;
}
console.log("#")

var cubes = 'ABCDEFG';
//styling console output using CSS with a %c format specifier
for (var i = 0; i < cubes.length; i++) {
    var styles = "font-size: 40px; border-radius: 10px; border: 1px solid blue; background: pink; color: purple";
    console.log("%c" + cubes[i], styles)
}

//for (var i = 1; i <= 10; i++){
    switch (i){
        case 1:
            console.log("Gold medal");
            break;
        case 2:
            console.log("Silver medal");
            break;
        case 3:
            console.log("Bronze medal");
            break;
        default:
            console.log(i);
            break;
    }
//}
