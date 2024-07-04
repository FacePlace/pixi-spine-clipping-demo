import { Application, Assets, Renderer } from 'pixi.js';
import { Pane } from 'tweakpane';
import { Spine } from '@pixi/spine-pixi';

const app = new Application<Renderer<HTMLCanvasElement>>();

(async () => {
  await app.init({
    autoDensity: true,
    resolution: window.devicePixelRatio,
    hello: true,
    backgroundColor: 0x1099bb,
  })

  document.body.appendChild(app.canvas);

  Assets.add({ alias: "spineboyData", src: "./assets/Spineboy.json" });
  Assets.add({ alias: "spineboyAtlas", src: "./assets/Spineboy.atlas" });
  await Assets.load(["spineboyData", "spineboyAtlas"]);

  const spineboy = Spine.from({
    skeleton: "spineboyData",
    atlas: "spineboyAtlas",
    scale: 0.5,
  })

  spineboy.position.set(app.screen.width / 2 + 150, app.screen.height);
  
  app.stage.addChild(spineboy);

  spineboy.state.setAnimation(0, "portal-no-clipping", true);

  const panel = new Pane({
    title: 'Settings',
    expanded: true,
  });
  panel.addBinding(
    { clipping: false },
    'clipping'
  ).on('change', (binding) => {
    const animation = binding.value ? "portal-clipping" : "portal-no-clipping";
    spineboy.state.setAnimation(0, animation, true);
  });

})()
