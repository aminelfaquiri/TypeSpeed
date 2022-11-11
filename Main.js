// my element selector :
let ChosingLevel = document.querySelector(".game .chosing")
let levelElem = document.querySelector(".container .message .lvl") ;
let SecondsElem = document.querySelector(".container .message .seconds") ;
let start = document.querySelector(".container a");
let myWordEl = document.querySelector(".container .the-word");
let time = document.querySelector(".container .control .time span");
let upcomingWordsElm = document.querySelector(".container .upcoming-words");
let input = document.querySelector(".container .input");
let scoreSpan = document.querySelectorAll(".container .control .score span");
let finish = document.querySelector(".container .finish");

// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
  ];
  
  // Setting Levels
  const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
  };

let LevelName  ;
let Second = lvls[LevelName];
let levelWord ;

///////////////
// من الأفضل أن تفرق بين الأفنت كل واحدة على حد 
// ////////////
// chosing Level :
ChosingLevel.onclick = function(e){
  if(e.target.tagName === "SPAN"){
    LevelName = e.target.id; // select Level Here
    this.remove();
    document.querySelector(".container").style.display = "block";
    // Update Array Word :
    levelWord = newArray(LevelName,words) ;
    // set second :
    Second = lvls[LevelName];
    // set Message 
    levelElem.innerHTML = LevelName ; 
    SecondsElem.innerHTML = Second ;
    // Time Left :
    time.innerHTML = Second;
    // disable Past Event :
    input.onpaste = function(){
      return false ;
    }
    // set Score Total :
    scoreSpan[1].innerHTML = levelWord.length ;
    // Start Play :
    start.onclick = function(){
  // creat Element CounDown Strat :
    let counter = document.createElement("div");
    counter.className = "counter" ;
    counter.innerHTML = "3";
    counter.style.cssText = `
      text-align: center;
      margin: 15px;
      font-size: 50px;
      font-weight: bold;
      color: var();
    `
    this.replaceWith(counter);
      // start CountDown :
      let startCount =  setInterval(() => {
      counter.innerHTML--;
      
      if(counter.innerHTML == "0"){
        clearInterval(startCount);
        counter.remove();
        // start Game :
        this.remove();
        input.focus();
        genWords(levelWord)
    }

  },1000);
   
}

}}
// ////////////


function genWords(array){
    // get Random Word From array :
    let RandomWord = array[Math.trunc(Math.random() * array.length)] ;
    myWordEl.innerHTML = RandomWord ;
    // get Index :
    let WordIndex = array.indexOf(RandomWord) ;
    array.splice(WordIndex,1);
    // upcoming Word :
    upcomingWordsElm.innerHTML = "";
    for(let wrd in array){
      let span = document.createElement("span");
      span.appendChild(document.createTextNode(array[wrd]));
      upcomingWordsElm.appendChild(span);
    }
    startPlay();
}

// دائما حاول أولا معالجة مشكلة في أصلها لكي تستخدمها
//  سليمة في الأماكل الأخرى مثل مشكلة الوقت هنا
function startPlay(){
  time.innerHTML = Second;
  let start = setInterval(()=>{
    time.innerHTML-- ;
    if(time.innerHTML == 0 ){
      clearInterval(start);
      // compare input :
      if(input.value === myWordEl.innerHTML.toLowerCase()){
        input.value = "";
        scoreSpan[0].innerHTML++;

        // call Generat word ;
        if(levelWord.length > 0){
          genWords(levelWord);
        }
        else{
          finishMessage("good","You Are The Best ")
        }
      }
      //  Game Over :
      else{
        finishMessage("bad","Game Over")
      }
    }
  },1000)



}
// تأكد دائما أن القيم المتغيرات أو الفنكشن التي أنت تريدها موضوعة في أماكنها الصحيحة 
// يمكنك استخدام القيمة من HTML سيكون ذالك أسهل 
// ------
// دائما ضع الإفنت  في أماكن إنشاء العنصر المراد عمل عليه الاكشن
// لتفادي مشكلة إنشياليز
function finishMessage(cls,Message){
  myWordEl.remove()
  upcomingWordsElm.remove()
  input.remove()
  document.querySelector(".message").remove();
  document.querySelector(".control").remove();
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(Message));
  span.className = cls;
  finish.style.display = "flex";
  finish.appendChild(span);
  let playAgain = document.createElement("button") ;
  playAgain.innerHTML = "Try Again" ;
  playAgain.className = "playAgain";
  finish.appendChild(playAgain)
  // try Again :
  playAgain.onclick = function(){
    location.reload();
  }
  ///////////////
}

function newArray(level,array){
  if(level === "Easy"){
    array = array.filter((e)=>{if(e.length <= 5 ){return e ;}})
  }
  if(level === "Normal"){
    array = array.filter((e)=>{if(e.length > 4 && e.length <= 7 ){return e ;}})
  }
  if(level === "Hard"){
    array = array.filter((e)=>{if(e.length >= 7 ){return e ;}})
  }
  return array ;
}
