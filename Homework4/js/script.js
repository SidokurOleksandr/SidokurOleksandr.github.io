
const doc=document;
const items=doc.querySelectorAll('.list__item');

const menuBtn=doc.querySelector('.mobileMenu');
const menu=doc.querySelector('.menu');


for(let i =0; i<items.length; i++ ){
items[i].onclick=function(){
    this.classList.toggle('list__item-active');
}
}

menuBtn.onclick=function(){
    menu.classList.toggle('menu-active');
};


