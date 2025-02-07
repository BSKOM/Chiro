import conArr from "./generator";
import { drawCanvas } from "./show";
const relief = conArr;

console.log('Hello i m app.js');
export default function App() {
    drawCanvas(relief);

    // return (
    //     <div>
    //         <h1>Hello i m App</h1>
    //     </div>
    // );
}


console.log('After drawCanvas');
