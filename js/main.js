import { OSC_Controller } from "./synthesizer/audioProcessing/oscController.js";

let isAudioActive = false;
let isClickActive = false;

const controllers = [], controllers2 = [];
const isOSCPlaying = [];

function activateOSC() {
  isAudioActive = true;
  console.log('activateOSC');

  for (let i = 0; i < 7; i++) {
    const controller = new OSC_Controller();
    controller.setOSCAttack(0.05)
    controller.setOSCRelease(0.1)

    /* controller.setOSCWaveform("square"); */
    /* controller.setOSCWaveform("triangle"); */
    controller.setOSCWaveform("sawtooth");
    controller.setOSCFrequModGain(50);
    controller.setOSCFreqModFreq(5.3);

    controllers.push(controller);
    isOSCPlaying.push(false);

    const controller2 = new OSC_Controller();
    controller2.setOSCAttack(0.05)
    controller2.setOSCRelease(0.1)

    /* controller.setOSCWaveform("square"); */
    /* controller.setOSCWaveform("triangle"); */
    controller2.setOSCWaveform("sawtooth");
    controller2.setOSCFrequModGain(50);
    controller2.setOSCFreqModFreq(5.3);

    controllers2.push(controller);


  }
  controllers[0].setOSCFrequency(261);


  controllers[1].setOSCFrequency(587);
  controllers[1].setOSCWaveform("triangle");

  controllers[2].setOSCFrequency(659);
  controllers[2].setOSCWaveform("sine");

  controllers[3].setOSCFrequency(698);

  controllers[3].toggleOSCRingModFreq();

  controllers[4].setOSCFrequency(784);
  controllers[4].setOSCWaveform("triangle");

  controllers[5].setOSCFrequency(880);


  controllers[6].setOSCFrequency(987);
  controllers[6].setOSCFreqModFreq(15);
  controllers[6].setOSCWaveform("square");

  //
  controllers2[0].setOSCFrequency(261);


  controllers2[1].setOSCFrequency(587);
  controllers2[1].setOSCWaveform("triangle");

  controllers2[2].setOSCFrequency(659);
  controllers2[2].setOSCWaveform("sine");

  controllers2[3].setOSCFrequency(698);

  controllers2[3].toggleOSCRingModFreq();

  controllers2[4].setOSCFrequency(784);
  controllers2[4].setOSCWaveform("triangle");

  controllers2[5].setOSCFrequency(880);


  controllers2[6].setOSCFrequency(987);
  controllers2[6].setOSCFreqModFreq(15);
  controllers2[6].setOSCWaveform("square");


}



const aFrameScene = document.querySelector('a-scene');
const totalNumberOfKeys = aFrameScene.querySelectorAll('[tone-key]').length;
// for positioning
const middleKey = Math.round(totalNumberOfKeys / 2);
let numberOfKeysLeft = middleKey - 1;

let beingClicked = false; // for not accidentally triggering mouseup
let isHovering = false;


const positionXGap = 0.8;
const positionsX = [];

const positionZGap = 0.2;
const positionsZ = [];

// the middle key is at 0
let positionX = (positionXGap * numberOfKeysLeft) * -1;
// position of the middle key - defines the other keys
let positionYMiddle = 2, positionZMiddle = -3,
  positionY = positionYMiddle, positionZ;

for (let i = 0; i < totalNumberOfKeys; i++) {
  positionsX.push(positionX);
  positionX = positionX + positionXGap;

  positionZ = positionZMiddle + positionZGap * Math.abs(numberOfKeysLeft - i);
  positionsZ.push(positionZ);
}


AFRAME.registerComponent('tone-key', {//keine großbuchstaben nutzen, sonst funzt nicht
  schema: {
    oscIndex: { type: 'int' },
    color: { /* set in html */ },
    hoverColor: { default: '#e5bbbb' },
    position: { default: '0 2 -3' }
  },

  init: function () {
    const el = this.el;
    const normalSize = "" + el.getAttribute('scale').x + " " + el.getAttribute('scale').y + " " + el.getAttribute('scale').z;
    const defaultColor = el.getAttribute('color');;
    const hoverColor = this.data.hoverColor;
    let beingClicked = false;

    // Zugriff auf den Controller und OSC je nach Index
    const controllerIndex = this.data.oscIndex;
    const isPlaying = isOSCPlaying[this.data.oscIndex];

    /* for (let i = middleKey; i < numberOfKeys; i++) {
          console.log("positionX: ", positionX);
        } */


    el.setAttribute('position', `${positionsX[this.data.oscIndex]} ${positionY} ${positionsZ[this.data.oscIndex]}`);



    // Event Listener für mouse / touch Events
    el.addEventListener('mousedown', () => {
      beingClicked = true;
      if (isClickActive) {
        this.el.setAttribute('color', defaultColor);
        isOSCPlaying[this.data.oscIndex] = true;
        triggerOSC(controllerIndex);
      }
    });

    el.addEventListener('mouseup', () => {
      if (beingClicked) {
        if (isClickActive) {
          this.el.setAttribute('color', defaultColor);
          isOSCPlaying[this.data.oscIndex] = false;
          triggerOSC(controllerIndex, isOSCPlaying[this.data.oscIndex]);
        }
        beingClicked = false;
      }
    });

    el.addEventListener('mouseenter', () => {
      isHovering = true;
      el.setAttribute('color', hoverColor);
      el.setAttribute('animation', {
        property: 'scale',
        to: '0.4 0.6 0.2',
        dur: 50
      });
      if (!isAudioActive) {
        activateOSC();
      }
      if (!isClickActive) {
        isOSCPlaying[this.data.oscIndex] = true;
        triggerOSC(controllerIndex, isOSCPlaying[this.data.oscIndex]);
      }
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      el.setAttribute('color', defaultColor);
      el.setAttribute('animation', {
        property: 'scale',
        to: normalSize,
        dur: 50
      });

      if (!isClickActive) {
        el.setAttribute('color', defaultColor);
        isOSCPlaying[this.data.oscIndex] = false;
        triggerOSC(controllerIndex, isOSCPlaying[this.data.oscIndex]);
      }
    });
  }
});
AFRAME.registerComponent('sinewave-box', {

}); 
AFRAME.registerComponent('sinewave', {
  schema: {
    oscIndex: { type: 'int' },
    color: { /* set in html */ },
    hoverColor: { default: '#e5bbbb' }
  },

  init: function () {
    const el = this.el;
    const normalSize = "" + el.getAttribute('scale').x + " " + el.getAttribute('scale').y + " " + el.getAttribute('scale').z;
    const defaultColor = el.getAttribute('color');;
    const hoverColor = this.data.hoverColor;

    const controllerIndex = this.data.oscIndex;


    const waveforms = ["sine", "square", "sawtooth", "triangle"];
    let currentIndex = 0;

    // positioning
    /* el.setAttribute('position', `${positionsX[this.data.oscIndex]} ${positionY + 0.8} ${positionsZ[this.data.oscIndex]}`); */


    el.addEventListener('mouseenter', () => {
      isHovering = true;
      el.setAttribute('color', hoverColor);
      el.setAttribute('animation', {
        property: 'scale',
        to: '0.4 0.4 0.2',
        dur: 50
      });


      controllers[controllerIndex].setOSCWaveform(waveforms[currentIndex]);
      controllers2[controllerIndex].setOSCWaveform(waveforms[currentIndex]);


      currentIndex = (currentIndex + 1) % waveforms.length;

    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      el.setAttribute('color', defaultColor);
      el.setAttribute('animation', {
        property: 'scale',
        to: normalSize,
        dur: 50
      });

    });
  }

});


AFRAME.registerComponent('activate-click', {
  init: function () {
    const defaultColor = this.el.getAttribute('material').color;
    this.el.addEventListener('click', () => {
      if (isClickActive) {
        this.el.setAttribute('color', defaultColor);
      } else {
        this.el.setAttribute('color', "#FF0000");
      }
      isClickActive = !isClickActive;
      console.log("isClickActive: ", isClickActive);
    });
    this.el.addEventListener('mouseenter', () => {
      isHovering = true;
      toggleHoverColor(this.el, defaultColor);
    }
    );
    this.el.addEventListener('mouseleave', () => {
      isHovering = false;
      toggleHoverColor(this.el, defaultColor)
    }
    );
  }
});

function triggerOSC(controllerIndex) {
  if (!isAudioActive) {
    return;
  }
  if (isOSCPlaying[controllerIndex]) {
    controllers[controllerIndex].playOSC();
    /* controller.play(); */
  } else {
    controllers[controllerIndex].stopOSC();
    /* controller.stop(); */
  }

}

function toggleActiveColor(el, defaultColor) {
  if (isClickActive) {
    el.setAttribute('color', "#FF0000");
  } else {
    el.setAttribute('color', defaultColor);
  }
}

let isRunning = false;

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      if (!isAudioActive) {
        activateOSC();
      }
      isRunning = !isRunning;
      run();
      break;
    case "q":
      activateOSC();
      break;
  }
});

let waitingTime = 400;
let counter = 0;
let reverse = controllers2.length - 1;

function run() {


  if (isRunning) {
    stop();

    if (counter >= controllers2.length) {
      counter = 0;
    }
    controllers2[counter].playOSC();
    counter++;

    setTimeout(() => {
      run();
    }, waitingTime);
  } else {
    counter = 0;
    stop();
  }
  function stop() {
    for (let i = 0; i < controllers2.length; i++) {
      controllers2[i].stopOSC();
    }
  }
}

/* AFRAME.registerComponent('draw-zigzag-line', {
  init: function () {
    // Erstellen der Punkte für die Zick-Zack-Linie
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(new THREE.Vector3(i, (i % 2 === 0) ? 0 : 1, i));  // Zick-Zack-Bewegung
    }

    // Erstellen des Geometrie-Objekts für die Linie
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Erstellen des Material-Objekts für die Linie
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Erstellen der Linie mit den Geometrie- und Material-Objekten
    const line = new THREE.Line(geometry, material);

    // Setzen der Linie als 3D-Objekt in A-Frame
    this.el.setObject3D('line', line);
  }
});

// Linie zeichnen, wenn die Szene geladen ist
document.querySelector('#triangle').setAttribute('draw-zigzag-line', {});

AFRAME.registerComponent('draw-sinus-wave', {
  init: function () {
    const points = [];
    const frequency = 1; // Frequenz der Sinuswelle (1 Periode)

    // Wir zeichnen die Sinuswelle auf der X-Achse, indem wir Punkte generieren
    for (let i = 0; i <= 100; i++) {
      let x = i / 10; // Schrittgröße
      let y = Math.sin(frequency * x); // Sinusfunktion
      points.push(new THREE.Vector3(x, y, 0)); // Füge den Punkt zur Linie hinzu
    }

    // Erstelle die Geometrie der Linie aus den Punkten
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Material der Linie
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    // Erstelle die Linie
    const line = new THREE.Line(geometry, material);

    // Setze die Linie als 3D-Objekt im A-Frame-Element
    this.el.setObject3D('line', line);
  }
});


document.querySelector('#sinus-line').setAttribute('draw-sinus-wave', {}); */

