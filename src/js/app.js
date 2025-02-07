// import conArr from "./generator";
import { drawCanvas } from "./show";
// const relief = conArr;
const profile = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 31));

console.log('Hello I am app', profile.length);
export default function App() {
    drawCanvas(profile);

    // return (
    //     <div>
    //         <h1>Hello i m App</h1>
    //     </div>
    // );
}


console.log('After drawCanvas');
