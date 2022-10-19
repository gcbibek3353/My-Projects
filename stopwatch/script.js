const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');

var ms = sec = min = hour = 0;
var tf = false;

startBtn.addEventListener("click", function () {
    startBtn.classList.add("active-start");
    stopBtn.classList.remove("active-stop");
    tf = true;
    time();
});

stopBtn.addEventListener("click", function () {
    startBtn.classList.remove("active-start");
    stopBtn.classList.add("active-stop");
    tf = false;

});

resetBtn.addEventListener("click", function () {
    startBtn.classList.remove("active-start");
    stopBtn.classList.remove("active-stop");
  
    tf=false;
    hour = min = sec = ms = 0;

    document.querySelector(".hour").innerHTML = "00";
    document.querySelector(".min").innerHTML = "00";
    document.querySelector(".second").innerHTML = "00";
    document.querySelector(".milli-second").innerHTML = "00";

});

function time(){
    if(tf==true){
        ms++;
        if(ms==100){
            ms =0;
            sec++;
        }
        if(sec==60){
            sec = 0;
            min++;
        }
        if(min==60){
            min=0;
            sec=0;
            hr++;
        }

        var hourString =hour;
        var minString =min;
        var secondString =sec;
        var msString =ms;

        if(hour<10) {hourString = "0" + hourString;}
        if(min<10) {minString = "0" + minString;}
        if(sec<10) {secondString = "0" + secondString;}
        if(ms<10) {msString = "0" + msString;}
        

        document.querySelector(".milli-second").innerHTML = msString;
        document.querySelector(".second").innerHTML = secondString;
        document.querySelector(".min").innerHTML = minString;
        document.querySelector(".hour").innerHTML = hourString;
        setTimeout("time()",10);
    }
}


















// if (tf == true) {
//     setInterval(function time() {
//         ms++;
//         document.querySelector('.milli-second').innerHTML = ms;
//         if (ms == 100) {
//             ms = 0;
//             document.querySelector('.second').innerHTML = sec++;
//             if (sec >= 60) {
//                 sec = 58;// to correct 0
//                 document.querySelector('.min').innerHTML = min++;
//             }
//             if (min >= 60) {
//                 sec = 0;
//                 min = 0;
//                 document.querySelector('.hour').innerHTML = hour++;

//             }
//         }
//     }, 10);
// }






