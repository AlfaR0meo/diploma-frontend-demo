'use strict';

console.group('INFO по скрипту');
console.log("Hello, diploma!");
console.log("Общий JS для всех страниц");
console.groupEnd();

const pageWrapperElement = document.querySelector('.page-wrapper');
const navElement = document.querySelector('.nav');
pageWrapperElement.style.setProperty('--nav-height', `${navElement.offsetHeight}px`);

// window.addEventListener('scroll', () => {
//     let imageLeft = document.querySelector('.image-fixed.left');
//     let imageRight = document.querySelector('.image-fixed.right');
    
//     let value = window.scrollY; 
    
//     imageLeft.style.translate = `${-value}px 0`;
//     imageRight.style.translate = `${value}px 0`;
    
// });
