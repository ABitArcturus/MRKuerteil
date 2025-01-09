import { OSC_Controller } from "./synthesizer/audioProcessing/oscController.js";

let isAudioActive = false;
let isClickActive = false;
let beingClicked = false; // for not accidentally triggering mouseup
let isHovering = false;

const controllers = [];
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


}

AFRAME.registerComponent('audio-activator', {
  init: function () {
    const defaultColor = this.el.getAttribute('material').color;

    this.el.addEventListener('click', () => {
      if (!isAudioActive) {
        activateOSC();
      }
    });

    this.el.addEventListener('mouseenter', () => {
      isHovering = true;
      toggleHoverColor(this.el, defaultColor);
    });
    this.el.addEventListener('mouseleave', () => {
      isHovering = false;
      toggleHoverColor(this.el, defaultColor);
    });
  }
});
AFRAME.registerComponent('tone-key', {
  schema: {
    oscIndex: { type: 'int', default: 0 }
  },

  init: function () {
    const el = this.el;
    const defaultColor = el.getAttribute('material').color;
    let beingClicked = false;

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
      toggleHoverColor(el, defaultColor);

      if (!isClickActive) {
        isOSCPlaying[this.data.oscIndex] = true;
        triggerOSC(controllerIndex, isOSCPlaying[this.data.oscIndex]);
      }
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      toggleHoverColor(el, defaultColor);

      if (!isClickActive) {
        el.setAttribute('color', defaultColor);
        isOSCPlaying[this.data.oscIndex] = false;
        console.log("trigger: ", controllerIndex);
        triggerOSC(controllerIndex, isOSCPlaying[this.data.oscIndex]);
      }
    });
  }
});

AFRAME.registerComponent('tone-key0', {//keine großbuchstaben nutzen, sonst funzt nicht
  init: function () {

    var el = this.el;
    var defaultColor = el.getAttribute('material').color;


    this.el.addEventListener('mousedown', () => {
      beingClicked = true;
      if (isClickActive) {
        this.el.setAttribute('color', "#FF0000");
        isOSC1Playing = isOSC1Playing;
        triggerOSC();
      }
    }
    );
    this.el.addEventListener('mouseup', () => {
      if (beingClicked) {
        if (isClickActive) {
          this.el.setAttribute('color', defaultColor);
          /*  isOSC1Playing = !isOSC1Playing;
           triggerOSC(); */
        }
        beingClicked = false;
      }
    }
    );
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      toggleHoverColor(el, defaultColor);

      if (!isClickActive) {
        // el.setAttribute('color', !isClickActive ? "#7054A3" : defaultColor); // Conditional (ternary) operator
        /*   isOSC1Playing = true;
          triggerOSC(); */
      }
    });
    el.addEventListener('mouseleave', () => {
      isHovering = true;
      toggleHoverColor(el, defaultColor);

      if (!isClickActive) {
        el.setAttribute('color', !isClickActive ? defaultColor : "#7054A3");
      }
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
  console.log("osc: ", controllers[controllerIndex]);
  if (isOSCPlaying[controllerIndex]) {
    controllers[controllerIndex].playOSC();
    /* controller.play(); */
  } else {
    controllers[controllerIndex].stopOSC();
    /* controller.stop(); */
  }
  console.log(controllers[controllerIndex].osc.frequency.value);
}

function toggleHoverColor(el, defaultColor) {
  if (!isHovering) {
    el.setAttribute('color', defaultColor);
  } else {
    el.setAttribute('color', "#7054A3");

  }
}
function toggleActiveColor(el, defaultColor) {
  if (isClickActive) {
    el.setAttribute('color', "#FF0000");
  } else {
    el.setAttribute('color', defaultColor);
  }
}