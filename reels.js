"use strict";

var WIDTH = 800;
var HEIGHT = 600;

var app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});


function resize(app) {
  return function() {
    const vpw = window.innerWidth;
    const vph = window.innerHeight;
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
PIXI.Loader.shared.add("reel", "assets/reel.png").load(onLoad);

function onLoad() {
  console.log("Done loading resources!");
  document.body.appendChild(app.view);

  const reel_l = PIXI.Sprite.from("reel");
  const reel_r = PIXI.Sprite.from("reel");

  reel_l.scale.set(0.5);
  reel_r.scale.set(0.5);
  reel_l.anchor.set(0.5);
  reel_r.anchor.set(0.5);

  var pos = (screen.width / 4)
  reel_l.x = pos - 80;
  reel_r.x = reel_l.x + 266;
  reel_l.y = reel_r.y = (screen.height / 2 ) - 80;

  app.stage.addChild(reel_l);
  app.stage.addChild(reel_r);

  let count = 0;

  var pixelate = new PIXI.filters.PixelateFilter();
  pixelate.size = [8, 8];
  app.stage.filters = [pixelate];


  app.ticker.add(() => {
      count += 0.1;
      reel_l.rotation = count * -0.1;
      reel_r.rotation = count * -0.2;
  });

}
