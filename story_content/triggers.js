function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5qeoGDWSm33":
        Script1();
        break;
      case "5rdWG7rnZR7":
        Script2();
        break;
      case "65G7lqlkdMg":
        Script3();
        break;
      case "6LUcuS0ayRf":
        Script4();
        break;
      case "5kmjhEnhbg9":
        Script5();
        break;
      case "61lY7OI4yif":
        Script6();
        break;
      case "6D20vxiUDf5":
        Script7();
        break;
      case "6GRAl4Qb6AF":
        Script8();
        break;
      case "5X2sGDLv8OB":
        Script9();
        break;
      case "6a9epzwq2PQ":
        Script10();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  const target = object('5sNVyOQkcWx');
const duration = 750;
const easing = 'ease-out';
const id = '6eU2buY45KN';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script2 = function()
{
  const target = object('5sNVyOQkcWx');
const duration = 750;
const easing = 'ease-out';
const id = '6eU2buY45KN';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script3 = function()
{
  const target = object('6SZIFAUkbVF');
const duration = 750;
const easing = 'ease-out';
const id = '6eU2buY45KN';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

window.Script4 = function()
{
  const target = object('6SZIFAUkbVF');
const duration = 750;
const easing = 'ease-out';
const id = '6eU2buY45KN';
const pulseAmount = 0.07;
player.addForTriggers(
id,
target.animate(
[ {scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' }, 
{scale: `${1 + pulseAmount}` }, 
{scale: '1' } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
