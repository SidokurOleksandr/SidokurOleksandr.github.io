const doc=document;
const menuBtn=doc.querySelector('.menu__mobile');
const menu=doc.querySelector('.menu');
menuBtn.addEventListener('click',()=>{
    menu.classList.toggle('menu_active');
});
