import { OSC_Controller } from "./synthesizer/audioProcessing/oscController.js";

AFRAME.registerComponent('sliderLine', {

});

AFRAME.registerComponent('slider', {
  schema: {
    minY: { type: 'number', default: -2 }, // Untere Grenze
    maxY: { type: 'number', default: 2 },  // Obere Grenze
  },
  init: function () {
    const el = this.el;
    const data = this.data;
    let dragging = false;

    el.addEventListener('mousedown', () => {
      dragging = true;
    });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('mousemove', (event) => {
      if (!dragging) return;

      // Calculate new position based on mouse movement

      const movementY = event.movementY / 100; // Scale movement
      const currentPosition = el.object3D.position;
      console.log(movementY)

      // Limit movement to minY and maxY
      let newY = currentPosition.y - movementY;
      newY = Math.max(data.minY, Math.min(newY, data.maxY));

      // Set the new position
      el.object3D.position.set(0, newY, -2);

      // Calculate and log slider value (0 to 100)
      const sliderValue = ((newY - data.minY) / (data.maxY - data.minY)) * 100;
      /*       console.log('Slider Value:', Math.round(sliderValue));
       */      /* console.log('Slider Value:', Math.round(sliderValue)); */
    });
  },
});

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

let beingClicked = false; // for not accidentally triggering mouseup
let isHovering = false;


const aFrameScene = document.querySelector('a-scene');
// for positioning
const totalNumberOfKeys = aFrameScene.querySelectorAll('[tone-key]').length;
const middleKeyPos = Math.round(totalNumberOfKeys / 2);
let numberOfKeysLeft = middleKeyPos - 1;



const positionXGap = 0.8;
const positionsX = [];

const positionZGap = 0.3;
const positionsZ = [];

// calculating the X position of the leftmost key - middle key is located at 0
let positionX = (positionXGap * numberOfKeysLeft) * -1;
// position of the middle key - defines the other keys
// set the position here globally
let posYMiddleKey = 2, posZMiddleKey = -3;
let positionY = posYMiddleKey, positionZ;
let rotationMiddleyKey = 0;
let rotationY, rotationYGap = 15;
const rotationsY = [];

// distance to other buttons
let distanceUp = 1, distanceDown = 10;

// saving the xyz coordinates of the keys
for (let i = 0; i < totalNumberOfKeys; i++) {
  positionsX.push(positionX);
  positionX = positionX + positionXGap;

  // z starts closer to cam, gets further until middle, gets closer
  positionZ = posZMiddleKey + positionZGap * Math.abs(numberOfKeysLeft - i);
  positionsZ.push(positionZ);

  rotationY = rotationMiddleyKey + rotationYGap * (numberOfKeysLeft - i);
  rotationsY.push(rotationY);
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
    const defaultColor = el.getAttribute('color');
    const hoverColor = this.data.hoverColor;
    let beingClicked = false;

    el.setAttribute('position', `${positionsX[this.data.oscIndex]} ${positionY} ${positionsZ[this.data.oscIndex]}`);
    el.setAttribute('rotation', `0 ${rotationsY[this.data.oscIndex]} 0`);


    // Zugriff auf den Controller und OSC je nach Index
    const controllerIndex = this.data.oscIndex;
    const isPlaying = isOSCPlaying[this.data.oscIndex];

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
  schema: {
    sinewave: { type: 'string', default: 'oscIndex: 0' },
    oscIndex: { type: 'int' },
    color: { /* set in html */ },
    hoverColor: { default: '#e5bbbb' },
    normalSize: { default: "0.4 0.4 0.1" }
  },

  init: function () {
    const el = this.el,
      box = el.querySelector('a-box'),
      normalSize = this.data.normalSize,
      defaultColor = box.getAttribute('color'),
      hoverColor = this.data.hoverColor,
      text = el.querySelector('a-text');

    const currentIndex = box.getAttribute('oscIndex');


    // positioning
    /*  box.setAttribute('position', `${positionsX[this.data.oscIndex]} ${positionY + distanceUp} ${positionsZ[this.data.oscIndex]}`);
     box.setAttribute('rotation', `0 ${rotationsY[this.data.oscIndex]} 0`);
  */

    const waveforms = ["sine", "square", "sawtooth", "triangle"];
    let currentWaveform = 0;

    el.addEventListener('mouseenter', () => {
      isHovering = true;
      box.setAttribute('color', hoverColor);
      box.setAttribute('animation', {
        property: 'scale',
        to: '0.4 0.4 0.2',
        dur: 50
      });


      controllers[currentIndex].setOSCWaveform(waveforms[currentWaveform]);
      controllers2[currentIndex].setOSCWaveform(waveforms[currentWaveform]);


      currentWaveform = (currentWaveform + 1) % waveforms.length;
/*       text.setAttribute('value', 'New Sine Value');
 */
    });

    /*  el.addEventListener('mouseleave', () => {
       isHovering = false;
       el.setAttribute('color', defaultColor);
       el.setAttribute('animation', {
         property: 'scale',
         to: normalSize,
         dur: 50
       });
 
     }); */
  }

});
AFRAME.registerComponent('sinewavee', {
  schema: {
    oscIndex: { type: 'int' },
    color: { /* set in html */ },
    hoverColor: { default: '#e5bbbb' }
  },

  init: function () {
    const el = this.el,
      normalSize = "" + el.getAttribute('scale').x + " " + el.getAttribute('scale').y + " " + el.getAttribute('scale').z,
      defaultColor = el.getAttribute('color'),
      hoverColor = this.data.hoverColor,
      controllerIndex = this.data.oscIndex,
      textEntity = el.querySelector('a-text');

    // positioning
    el.setAttribute('position', `${positionsX[this.data.oscIndex]} ${positionY + distanceUp} ${positionsZ[this.data.oscIndex]}`);
    el.setAttribute('rotation', `0 ${rotationsY[this.data.oscIndex]} 0`);


    const waveforms = ["sine", "square", "sawtooth", "triangle"];
    let currentIndex = 0;

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

/*       textEntity.setAttribute('value', 'New Sine Value');
 */    });

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
