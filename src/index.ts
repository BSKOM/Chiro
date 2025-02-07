// import image from './images/lazy.png';
import App from './js/app';

// const createImage = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
//   const img = new Image();
//   img.onload = () => res(img);
//   img.onerror = rej;
//   img.src = src;
// });
// const  async function render() {
//   const subHeader = document.createElement('h2');
//   subHeader.innerHTML = 'This elements was created by js';
//   // const myImage = await createImage(image);
//   document.body.appendChild(subHeader);
//   // document.body.appendChild(myImage);
// }
App();

// render();
