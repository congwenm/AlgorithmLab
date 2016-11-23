/*
  https://books.google.com/ebooks/app#reader/CQEQCAAAAEAJ/GBS.PA139.w.0.0.0.4
*/

var black='#222'; var sections = document.querySelectorAll('#reader-container > div > div > div'); sections.forEach(n => {n.style.background = black; n.style.color='white'; });
var vertical = document.querySelector('#reader-container table table td'); vertical.style.background="#333"