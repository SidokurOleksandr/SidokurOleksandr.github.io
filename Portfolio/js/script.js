const doc=document;
const menuBtn=doc.querySelector('.menu__mobile');
const menu=doc.querySelector('.menu');
const slides=doc.querySelectorAll('.slider__slide');
const counters=doc.querySelectorAll('.counters__item');

const quote=doc.querySelectorAll('.quotes__slide');
const qcounter=doc.querySelectorAll('.counter');

function slider(slider,count,activeCounter,activeSlide){
    for(let i = 0;i<count.length;i++){
        count[i].addEventListener('click', ()=>{
            for(let j=0;j<count.length;j++){
                count[j].classList.remove(activeCounter);
                slider[j].classList.remove(activeSlide);
            }
            count[i].classList.add(activeCounter);
            slider[i].classList.add(activeSlide);
        });
    }
}
slider(slides,counters,'counters__item_active','slider__slide_active');
slider(quote,qcounter,'counter_active','quotes__slide_active');

menuBtn.addEventListener('click',()=>{
    menu.classList.toggle('menu_active');
});
