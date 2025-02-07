/**
 * Function to get color based on height with gradient from green to red.
 * The gradient transitions through yellow and brown as well.
 * - Green for height 0 to 10
 * - Yellow for height 10 to 20
 * - Brown for height 20 to 30
 * - Red for height above 30
 *
 * @param {number} height - The height value to get the color for.
 * @returns {string} The RGB color string corresponding to the height.
 */
// function getColor(height) {
//     if (height <= 10) {
//         const green = 255;
//         const red = Math.floor((height / 10) * 255);
//         return `rgb(${red},${green},0)`;
//     } else if (height <= 20) {
//         const green = 255 - Math.floor(((height - 10) / 10) * 255);
//         const red = 255;
//         return `rgb(${red},${green},0)`;
//     } else {
//         const green = 0;
//         const red = 255;
//         const blue = Math.floor(((height - 20) / 10) * 255);
//         return `rgb(${red},${green},${blue})`;
//     }
// }

/**/
// const relief = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 31));

// const canvas = document.

// getElementById('surface-map');
const drawCanvas = function (relief) {
    console.log('Hello i m drawCanvas');
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
    const arGreen = Array.from({ length: 2500 }, () => Green );
    const arRed = Array.from({ length: 2500 }, () => Red);
    const arYellow = Array.from({ length: 2500 }, () => Yellow);
    const arBrown = Array.from({ length: 2500 }, () => Brown);
    const arColor = [...arGreen, ...arYellow, ...arBrown, ...arRed];
    for (let i = 0; i < 10000; i++) {

        ctx.fillStyle = `rgb(${arColor[i][0]},${arColor[i][1]},${arColor[i][2]})`;
        ctx.fillRect(x=i%100, y=Math.trunc(i/100), 1, 1);
    };
};
export { drawCanvas };

// const relief = Array.from({ length: 10000 }, (i) => i%40 ).sort((a,b)=>b-a);

/**
 * Function to get color based on height.
 * The gradient transitions from green to red.
 *
 * @param {number} height - The height value to get the color for.
 * @returns {string} The RGB color string corresponding to the height.
 */
// function getColor(height) {
//     const green = Math.max(0, 255 - Math.floor((height / 30) * 255));
//     const red = Math.min(255, Math.floor((height / 30) * 255));
//     return `rgb(${red},${green},0)`;
// }

// Draw the surface map


// for (let y = 0; y < 100; y++) {
//     for (let x = 0; x < 100; x++) {
//         const height = relief[y * 100 + x];
//         ctx.fillStyle = getColor(height);
//         ctx.fillRect(x, y, 1, 1);
//     }
// }