"use strict";

var WIDTH = 800;
var HEIGHT = 600;

var app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});


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
app.stage.addChild(stage);
PIXI.Loader.shared.add("reel", "assets/reel.png").load(onLoad);
function onLoad() {
  document.body.appendChild(app.view);
  const reel_l = PIXI.Sprite.from("reel");
  const reel_r = PIXI.Sprite.from("reel");
  reel_l.anchor.set(0.5);
  reel_r.anchor.set(0.5);

  reel_l.x = 510 / 2;
  reel_r.x = reel_l.x + 266;
  reel_l.y = reel_r.y = (screen.height / 2 ) - 80;

  stage.addChild(reel_l);
  stage.addChild(reel_r);

  let count = 0;

  var pixelate = new PIXI.filters.PixelateFilter();
  pixelate.size = [6, 6];
  app.stage.filters = [pixelate];


  app.ticker.add(() => {
      count += 0.1;
      reel_l.rotation = count * -0.1;
      reel_r.rotation = count * -0.14;
  });

}
