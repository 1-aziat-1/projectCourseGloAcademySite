window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //TIMER

    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60 ),
            arrTimer = {timeRemaining, hours, minutes, seconds};
            for(let key in arrTimer){
                if(arrTimer[key] % 10 === arrTimer[key] ){
                    arrTimer[key] = `0` +  arrTimer[key];
                }
            }
            
            if(timeRemaining > 0){
                return arrTimer;
            }else{
                for(let key in arrTimer){
                    arrTimer[key] = '00';
                }
                return arrTimer;
            }
            
        }

        function updateClock(){
            let timer = (getTimeRemaining());
        
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

        }

        setInterval(function(){
            updateClock();
        }, 10);
        
 
    }

    countTimer('24 november 2021');
    
    //MENU

    const toggleMenu = () =>{
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuLinks = menu.querySelectorAll('ul>li>a'),
            btnScroll = document.querySelector('main>a');

        const handlerMenu = () =>{
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuLinks.forEach((elem) => {
            elem.addEventListener('click', function(e){
                e.preventDefault();
                handlerMenu();
                let href = elem.getAttribute('href').substring(1);
                const targetScroll = document.querySelector(`#${href}`);
                const elementPosition = targetScroll.getBoundingClientRect().top;
                // if(window.scrollTop)
                // let timer = setInterval(function(){  ///////////////////////////////////////////////////??????????????????????????????????????
                //     window.scrollBy(elementPosition);
                // },1000);
                window.scrollBy({
                    top:  elementPosition,
                    behavior: 'smooth'
                });
                
            });}
        );

        btnScroll.addEventListener('click', (e)=>{
            e.preventDefault();

            let href = btnScroll.getAttribute('href').substring(1);
            let targetScroll = document.querySelector(`#${href}`);
            let elementPosition = targetScroll.getBoundingClientRect().top;
            window.scrollBy({
                top: elementPosition,
                behavior: `smooth`
            });
        });


    };

    toggleMenu();

    //POPUP

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');
           

         let animationPopUp = function(){
             let count = popupContent.offsetLeft ;
             let timer = setInterval(function(){
                 count+=1;
                 if(count <=  popup.offsetWidth * 0.38){
                   popupContent.style.left = count + `px`; 
                 }else{
                     clearInterval(timer);
                     count = 0;
                     return;
                 }
             },1);
         };
         
         
        

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if(document.documentElement.clientWidth >= 768){
                    animationPopUp();
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            if(document.documentElement.clientWidth >= 1){
                popupContent.style.left = document.documentElement.clientWidth * (-0.25) + `px`;
            }
        });

        
       


        
    };

    togglePopUp();
});