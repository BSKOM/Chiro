// import data from "./data";
import { getRandomInt } from "./utils";
const arr = Array.from({ length: 10000 }, (_, i) => i); // create an array of 200 elements 
const dataIs = data.map((el) => (el[0])).flat(Infinity);
const unique = arr.filter((el) => !dataIs.includes(el));
const newArr = unique.map((el) => ( [el[0], Date.now(), 0, 0, getRandomInt(10, 30)]));
const conArr = [...newArr, ...data].sort((a, b) => a[0] - b[0]);
export default conArr;
// next plan chnnges in the generator.js file
// 1. check data - it must included elemens with ID=0 AND ID=199
// 4. create a new array that contains the unique elements and the data array,
//  used the data array for found max and min which are using in the getRandomInt function
