var work = document.querySelector(".work"),
    breakTime = document.querySelector(".break"),
    timer = document.querySelector(".timer"),
    start = document.querySelector(".start"),
    reset = document.querySelector(".reset"),
    workUp = document.querySelector(".work-up"),
    workDown = document.querySelector(".work-down"),
    breakUp = document.querySelector(".break-up"),
    breakDown = document.querySelector(".break-down"),
    sound = document.querySelector("select"),
    playM = document.querySelector(".play"),
    intervals = document.querySelector(".intervals"),
    placeHolderWork = 25,
    placeHolderBreak = 5,
    intervalHolder,
    totalTime,
    toggle = 0,
    itCroudSounds = {
      "theme" : "https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/The_IT_Crowd_Opening_Theme.mp3",
      "Moss Rington" : "https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/Moss_ringtone.mp3",
      "I Lie" : 'https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/I_lie.mp3',
      "New Emergency Number" : 'https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/New_Emergency_Number.mp3',
      "80 million people" : 'https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/80_million_people.mp3',
      "It cant be done" : 'https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/It_cant_be_done.mp3',
      "Forcing unexpected reboot" : 'https://raw.githubusercontent.com/Hartecode/theItCrowdPomodoro/master/sounds/Forcing_unexpected_reboot.mp3'
    };


work.textContent = placeHolderWork;
breakTime.textContent = placeHolderBreak;
upDateTimer();

//work up button
workUp.addEventListener("click", function(){
  placeHolderWork++;
  haltInterval();
  work.textContent = placeHolderWork;
  upDateTimer();
});

//work down button
workDown.addEventListener("click", function(){
  //this will lower work until it reaches 1
  if(placeHolderWork > 1){
    placeHolderWork--;
    haltInterval();
    work.textContent = placeHolderWork;
    upDateTimer();
  }
});

//break up button
breakUp.addEventListener("click", function(){
  placeHolderBreak++;
  breakTime.textContent = placeHolderBreak;
});

//break down button
breakDown.addEventListener("click", function(){
  //this will lower break until it reaches 1
  if(placeHolderBreak > 1){
    placeHolderBreak--;
    breakTime.textContent = placeHolderBreak;
  }
});

//start button
start.addEventListener("click", function(){
  haltInterval();
  intervals.textContent = "Working...";
  startTimer(minToSec(placeHolderWork), timer);
});

//stop button
reset.addEventListener("click", function(){
  haltInterval();
  upDateTimer();
});

//play music
playM.addEventListener("click", function(){
  audioPlay();
});

//updates the
function upDateTimer(){
  intervals.textContent = "Session";
  var hours = Math.floor(placeHolderWork/60);
  var min = placeHolderWork - (hours * 60);
  formateTime(hours, min, 0);

}

//formating the timer
function formateTime(h, m, s){
  if(h > 0){
    timer.textContent = h + ":" + addZero(m) + ":" + addZero(s);
  } else {
    timer.textContent = m + ":" + addZero(s);
  }
}

///adds a zero infront sing numbers
function addZero(x){
  if(x < 10){
    return "0" + x;
  }else {
    return x;
  }
}

//this function stops interval
function haltInterval() {
  clearInterval(intervalHolder);
}

//this function starts the count down until it reaches 0
function startTimer(duration) {
    totalTime = duration;
    intervalHolder = setInterval(function () {
        var hours = Math.floor(totalTime/3600),
        minutes = Math.floor(totalTime/60) - (hours*60),
        seconds = totalTime - (((hours*60) + minutes)*60);

        formateTime(hours, minutes, seconds);

        if (totalTime === 0) {
            haltInterval();
            audioPlay();
            change();
        } else {
          totalTime--;
        }

    }, 1000);
}

///turns min to sec
function minToSec(min) {
    return 60 * min;
};

//switch back and forth from work to break. An alarm is played at the end of every count down
function change(){
  if(toggle === 0){
    toggle++;
    intervals.textContent = "Break!";
    startTimer(minToSec(placeHolderBreak));
  } else {
    toggle--;
    intervals.textContent = "Working...";
    startTimer(minToSec(placeHolderWork));
  }
}

//audio
function audioPlay() {
   var audio = new Audio(itCroudSounds[sound.options[sound.selectedIndex].textContent]);
   return audio.play();
}
