// Import drawCanvas function from show.js and use it in app.js to draw a canvas with the profile data.
const drawCanvas = function (relief) {
     console.log('Hello i m drawCanvas', 'relief lenght:', relief.length);
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const Green = [0, 255, 0]; // RGB for our color
    const Red = [255, 0, 0]; // RGB for our color
    const Yellow = [255, 255, 0]; // RGB for our color
    const Brown = [139, 69, 19]; // RGB for our color
    const White = [255, 255, 255]; // RGB for our color

// create an array of 10000 random numbers
    const arGreen = Array.from({ length: 2500 }, () => Green );
    const arRed = Array.from({ length: 2500 }, () => Red);
    const arYellow = Array.from({ length: 2500 }, () => Yellow);
    const arBrown = Array.from({ length: 2500 }, () => Brown);
    const arColor = [...arGreen, ...arYellow, ...arBrown, ...arRed];
// show the data on the canvas
    for (let i = 0; i < 10000; i++) {        
        ctx.fillStyle = `rgb(${arColor[i][0]},${arColor[i][1]},${arColor[i][2]})`;
        ctx.fillRect(i%100, Math.trunc(i/100), 1, 1);
    };
};

export { drawCanvas };