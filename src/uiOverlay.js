import * as THREE from "three";
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


class UIOverlay {

	constructor( uiScene, width, height ) {
    this.uiScene = uiScene;
    this.width = width;
    this.height = height;

    // Erstelle Overlays
    this.overlay1 = this.createOverlay('overlay1', `
      <div>AIR COMBAT MANEUVERING (ACM)</div>
    `);

    this.overlay2 = this.createOverlay('overlay2', `
      <div>..................Air1</div>
      <div>Altitude....(ft): <span id="AC1_Alt"></span></div>
      <div>Speed......(mph): <span id="AC1_Spd"></span></div>
      <div>Heading....(deg): <span id="AC1_Hdg"></span></div>
      <div>Turn Rate..(deg): <span id="AC1_Trn"></span></div>
      <div>Pitch......(deg): <span id="AC1_Pit"></span></div>
      <div>AoA........(deg): <span id="AC1_AoA"></span></div>
      <div>Bank.......(deg): <span id="AC1_Bnk"></span></div>
      <div>INTERCEPT INFORMATION</div>
      <div>Off Pos.Y..(deg): </div>
      <div>Off Rot.Y..(deg): </div>
      <div>Off Pos.X..(deg): </div>
      <div>Off Rot.X..(deg): </div>
    `);

    this.overlay3 = this.createOverlay('overlay3', `
      <div>Air2</div>
      <div><span id="AC2_Alt">12000</span></div>
      <div><span id="AC2_Spd">480</span></div>
      <div><span id="AC2_Hdg">270</span></div>
      <div><span id="AC2_Trn">2</span></div>
      <div><span id="AC2_Pit">3</span></div>
      <div><span id="AC2_AoA">1</span></div>
      <div><span id="AC2_Bnk">-5</span></div>
      <div>----</div>
      <div><span id="AC2_InY">0</span></div>
      <div><span id="AC2_OfY">0</span></div>
      <div><span id="AC2_InX">0</span></div>
      <div><span id="AC2_OfX">0</span></div>
    `);

    this.overlay4 = this.createOverlay('overlay4', `
      <div>Press Arrow Keys to Pitch and Bank Airplane</div>
      <div>Press Z or X to Yaw Left or Right</div>
      <div>Press P to Pause</div>
      <div>Press V to Change Camera View</div>
    `);

    // Positioniere Overlays
    this.setPositions();

    // Füge der Szene hinzu
    this.uiScene.add(this.overlay1);
    this.uiScene.add(this.overlay2);
    this.uiScene.add(this.overlay3);
    this.uiScene.add(this.overlay4);
  }

  createOverlay(className, htmlContent) {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = htmlContent;
    return new CSS2DObject(div);
  }

  setPositions() {
    this.overlay1.position.set( 200, this.height - 30, 0 );
    this.overlay2.position.set( 145, this.height - 200, 0 );
    this.overlay3.position.set( 400, this.height - 200, 0 );
    this.overlay4.position.set( 260, 60, 0 );
  }


  updateAC1Altitude(value) {
    const span = this.overlay2.element.querySelector('#AC1_Alt');
    if (span) span.textContent = value;
  }

  // Weitere Update-Methoden analog ...
}


export { UIOverlay }
