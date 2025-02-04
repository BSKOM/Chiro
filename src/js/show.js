//show rev 1.0.0
// Create a canvas element
const canvas = document.createElement('canvas');
canvas.width = 100;
canvas.height = 100;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Example color values (RGB) for each pixel in the picture
const color = new Array(100 * 100).fill(0).map(() => {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
});

// Get the current date
const date = new Date();
const day = date.getDate();

// Change the color of each pixel based on the date
for (let i = 0; i < color.length; i++) {
    color[i].r = (color[i].r + day) % 256;
    color[i].g = (color[i].g + day) % 256;
    color[i].b = (color[i].b + day) % 256;
}

// Draw the picture on the canvas
const imageData = ctx.createImageData(100, 100);
for (let i = 0; i < color.length; i++) {
    const index = i * 4;
    imageData.data[index] = color[i].r;
    imageData.data[index + 1] = color[i].g;
    imageData.data[index + 2] = color[i].b;
    imageData.data[index + 3] = 255; // Alpha channel
}
ctx.putImageData(imageData, 0, 0);