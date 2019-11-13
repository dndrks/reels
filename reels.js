"use strict";

var WIDTH = 800;
var HEIGHT = 600;

var app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});

function mount() {
  tape.visible = !tape.visible;
}
function resize(app) {
  return function() {
    const vpw = document.documentElement.clientWidth ? document.documentElement.clientWidth  : window.innerWidth;
    const vph = document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight;
    let nvw;
    let nvh;
    if (vph / vpw < HEIGHT / WIDTH) {
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }
    app.renderer.resize(nvw, nvh);
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}

resize(app)();
window.addEventListener("resize", resize(app));
var stage = new PIXI.Container();
var tape = new PIXI.Container();

app.stage.addChild(stage);
PIXI.Loader.shared.add("reel", "assets/reel.png").load(onLoad);
function onLoad() {
  document.body.appendChild(app.view);
  const reel_l = PIXI.Sprite.from("reel");
  const reel_r = PIXI.Sprite.from("reel");
  const graphics = new PIXI.Graphics();
  reel_l.anchor.set(0.5);
  reel_r.anchor.set(0.5);

  reel_l.x = 510 / 2;
  reel_r.x = reel_l.x + 266;
  reel_l.y = reel_r.y = (HEIGHT / 2 ) - 80;
  reel_r.alpha = 0.4;
  reel_l.alpha = 0.4;
  stage.addChild(reel_l);
  stage.addChild(reel_r);
  // tape - l
  graphics.lineStyle(4, 0xFFFFFF, 1);
  graphics.drawCircle(255, 220, 80, 80);
  graphics.lineStyle(4, 0xA3A3A3, 1);
  graphics.drawCircle(255, 220, 76, 76);
  graphics.lineStyle(4, 0x535353, 1);
  graphics.drawCircle(255, 220, 72, 72);

  // tape - r
  graphics.lineStyle(4, 0xFFFFFF, 1);
  graphics.drawCircle(520, 220, 80, 64);
  graphics.lineStyle(4, 0xA3A3A3, 1);
  graphics.drawCircle(520, 220, 76, 60);
  graphics.lineStyle(4, 0x535353, 1);
  graphics.drawCircle(520, 220, 72, 56);
  
  // tape 
  graphics.lineStyle(5, 0xFFFFFF, 1);
  graphics.moveTo(220, 290);
  graphics.lineTo(301, 360);
  graphics.lineTo(315, 360);
  graphics.lineTo(301, 360);
  graphics.lineTo(475, 360);
  graphics.lineTo(560, 290);


  //  graphics.lineTo(570, 350);
  //    graphics.quadraticCurveTo(600, 0, 480, 100);
  //    graphics.lineTo(330, 120);
  //    graphics.lineTo(410, 200);
  //    graphics.lineTo(210, 300);
  graphics.beginFill(0x535353);
  graphics.lineStyle(0);
  graphics.drawCircle(305, 350, 10, 10);
  graphics.drawCircle(470, 350, 10, 10);
  graphics.endFill();

    
  graphics.closePath();
  graphics.endFill();
  tape.addChild(graphics);
  stage.addChild(tape);
  tape.visible = false;

  let count = 0;

  var pixelate = new PIXI.filters.PixelateFilter();
  pixelate.size = [6, 6];
  app.stage.filters = [pixelate];
  
  stage.interactive = true;

  // Shows hand cursor
  stage.buttonMode = true;

  stage.on('pointerdown', mount);



  app.ticker.add(() => {
      count += 0.1;
      reel_l.rotation = count * -0.1;
      reel_r.rotation = count * -0.14;
  });

}
