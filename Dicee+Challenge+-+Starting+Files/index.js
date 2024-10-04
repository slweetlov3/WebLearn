var randomNumber1= Math.floor(Math.random() * 7);

if (randomNumber1 === 1) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice1.png");
}
else if (randomNumber1 === 2) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice2.png");
} 
else if (randomNumber1 === 3) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice3.png");
} 
else if (randomNumber1 === 4) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice4.png");
} 
else if (randomNumber1 === 5) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice5.png");
} 
else if (randomNumber1 === 6) {
    document.getElementsByClassName("img1")[0].setAttribute("src","./images/dice6.png");
}

var randomNumber2 = Math.floor(Math.random() * 7);

if (randomNumber2 === 1) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice1.png");
}
else if (randomNumber2 === 2) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice2.png");
} 
else if (randomNumber2 === 3) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice3.png");
} 
else if (randomNumber2 === 4) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice4.png");
} 
else if (randomNumber2 === 5) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice5.png");
} 
else if (randomNumber2 === 6) {
    document.getElementsByClassName("img2")[0].setAttribute("src","./images/dice6.png");
}

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 WIN";
} else {
    document.querySelector("h1").innerHTML = "Player 2 WIN";
}