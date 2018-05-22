$('document').ready(set);
var timeSession =25;
var timeBreak = 5;
var timer;
var timeRemain;
var minRemain;
var secRemain;
var finishTime;
var session = false;
var stop = true;
var transform_styles = ['-webkit-transform',
                        '-ms-transform',
                        'transform'];

function set () {
  $('#sessionTime').text(timeSession);
  $('#breakTime').text(timeBreak);
  $('#time').text(timeSession + ':00');
  barRotation(100);
}

function start() {
  $('.adjust').prop('disabled', true);
  $('#controlBtn').attr('onclick', 'reset()');
  $('#controlBtn').text('Reset');  
  startSession();  
}

function reset() {
  stop = true;
  $('.adjust').prop('disabled', false);
  $('#controlBtn').attr('onclick', 'start()');
  $('#controlBtn').text('Start');
  $('#state').text('');
  $('#time').text(timeSession + ':00');
  $('body').css('background-color', 'transparent');   
  barRotation(100);
}

function startSession() {
  timer = timeSession*1000*60
  finishTime = Date.now() + timer; 
  $('body').css('background-color', 'rgb(90,180,90)');
  $('#state').text('Session');
  session = true;
  stop = false;
  updateTime(); 
  
}

function startBreak () {
  timer = timeBreak*1000*60
  finishTime = Date.now() + timer; 
  $('body').css('background-color', 'rgb(200,80,75)');
  $('#state').text('Break');
  session = false;
  stop = false;
  updateTime();  
}

function sessionMinus() {
  if (timeSession >1) timeSession--;
  $('#sessionTime').text(timeSession);
  $('#time').text(timeSession + ':00');
}

function sessionPlus() {
  timeSession++;
  $('#sessionTime').text(timeSession);
  $('#time').text(timeSession + ':00');
}

function breakMinus() {
  if (timeBreak >1) timeBreak--;
  $('#breakTime').text(timeBreak);
}

function breakPlus() {
  timeBreak++;
  $('#breakTime').text(timeBreak);
}

function updateTime () {
  if (stop) return;
  var timeRemain = finishTime - Date.now();
  var minRemain = Math.floor(timeRemain / 60000);
  var secRemain = Math.floor(timeRemain % 60000 / 1000);
  barRotation(100-(timer-timeRemain)/(timer)*100);
  if (minRemain <= 0 && secRemain <= 0) { 
    if (session) startBreak();                         else startSession();
  }
  else {    
    if (secRemain < 10) secRemain = '0' + secRemain;
    
    $('#time').text(minRemain + ':' + secRemain);
    setTimeout(updateTime, 100);     
   }   
}

function ProgressBar () {   
  //rotation(100-(timer-timeRemain)/(timer)*100);
}

function barRotation(percent) {
 var rotation = Math.floor(percent*18)/10;
 for(i in transform_styles) {
  $('.circle .fill, .circle .mask.full').css(transform_styles[i],
                         'rotate(' + rotation + 'deg)');
   $('.circle .fill.fix').css(transform_styles[i], 'rotate(' + rotation*2 + 'deg)');
 }
}



