const game_board = document.querySelector('#game_board');
const context= game_board.getContext("2d");
const score_text= document.querySelector('#score_text');
const reset_button= document.querySelector('#reset_button');
const game_width= game_board.width;
const game_height= game_board.height;
const board_background= "#b8daff";

const bpm=123;
let global_elapsed_beats=0;
let combo=0;
let timer=0
let camera_shake_x=0
let camera_shake_y=0
let camera_shake_ammount=0
let camera_shake_falloff=0

let running=false;
let score=0;
let tanya_costume= document.getElementById('tanya1')
let tanya_anim_timer=0
const tanya_x=390;
const tanya_y=27;

window.addEventListener('mousedown', gann);
reset_button.addEventListener('click', reset_game);

game_start();

function game_start(){
  running=true;
  score_text.textContent=score;
  draw_tanya();
  game_loop();
};
function game_loop(){
    if(running){
        timer=timer+0.008

      if(Math.round(camera_shake_ammount>0)){
          camera_shake_x=camera_shake_ammount*(Math.random() * 2 - 1);
          camera_shake_y=camera_shake_ammount*(Math.random() * 2 - 1);
          camera_shake_ammount*= camera_shake_falloff;
      }
      if(tanya_anim_timer>0){
        tanya_costume= document.getElementById('tanya2')
        tanya_anim_timer-=1
      }
      else{
        tanya_costume= document.getElementById('tanya1')
      }
      
        clear_board();
        draw_tanya();
        context.drawImage(document.getElementById('cover'), 430, 360, 308 *1.2, 46 *1.2);
        context.drawImage(document.getElementById('crosshair'), 50, 340 +0 +Math.sin((timer+2)*8), 18 *1.2, 21*1.2);
        context.globalAlpha = 0.5;
        context.drawImage(document.getElementById('judgement_line'), 51, 0, 16 *1.2, game_height);
        context.globalAlpha = 1;
        move_note();
        draw_note();
        

        requestAnimationFrame(game_loop);
    }
}
function clear_board(){
  context.fillStyle = board_background;
  context.fillRect(0, 0, game_width, game_height);
};
function create_note(){};
function move_note(){};
function draw_note(){};
function draw_tanya(){
  context.drawImage(tanya_costume, tanya_x + 0 + Math.sin((timer)*10) +camera_shake_x, tanya_y +0 +Math.sin((timer+5)*15) + camera_shake_y, 266 *1.2, 295 *1.2);
};
function gann(){
  camera_shake_ammount=10 +(1.5*combo)
  camera_shake_falloff=0.8
  tanya_anim_timer=15
  
};
function display_score_Screen(){};
function reset_game(){};

