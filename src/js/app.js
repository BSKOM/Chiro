import showTestImage from "../img/show-test.jpg";
import { drawCanvas } from "./show";

const profile = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 31));

export default function app() {
    drawCanvas(profile);
    console.log(showTestImage); // This will log the path to the image
};