import conArr from "./generator";
import { drawCanvas } from "./show";
console.log('Hello i m app.js');
const relief = conArr();
drawCanvas(relief);
console.log('After drawCanvas');
