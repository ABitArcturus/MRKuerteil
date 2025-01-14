
import { OSC_Controller } from "./audioProcessing/oscController.js";
import { startWhiteNoise, stopWhiteNoise, setWhiteNoiseGain } from "./audioProcessing/whiteNoiseGen.js";
import { setEQGain } from "./audioProcessing/equalizer.js";

const controllers = [], controllers2 = [];
const isOSCPlaying = [];

for (let i = 0; i < 7; i++) {
    const controller = new OSC_Controller();
    controller.setOSCAttack(0.05)
    controller.setOSCRelease(0.1)
    controller.setOSCGain(0.1);
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
/* controllers[0].setOSCFrequModGain(50);
controllers[0].setOSCFreqModFreq(5.3);
controllers[0].setOSCWaveform("sawtooth"); */

controllers[1].setOSCFrequency(587);
/* controllers[1].setOSCFrequModGain(50);
controllers[1].setOSCFreqModFreq(8.5); */
controllers[1].setOSCWaveform("triangle");

controllers[2].setOSCFrequency(659);
/* controllers[2].setOSCFrequModGain(50);
controllers[2].setOSCFreqModFreq(8.5);
controllers[2].setOSCWaveform("sawtooth"); */

controllers[3].setOSCFrequency(698);
/* controllers[3].setOSCFrequModGain(50);
controllers[3].setOSCFreqModFreq(8.5); */
controllers[2].setOSCWaveform("sine");

controllers[3].toggleOSCRingModFreq();
/* controllers[3].setOSCRingModFreq(50);
controllers[3].setOSCWaveform("sine"); */

controllers[4].setOSCFrequency(784);
/* controllers[4].setOSCFrequModGain(50);
controllers[4].setOSCFreqModFreq(5.3);
controllers[4].setOSCFrequModGain(76);
controllers[4].setOSCFreqModFreq(2.2); */
controllers[4].setOSCWaveform("triangle");

controllers[5].setOSCFrequency(880);
/* controllers[5].setOSCFrequModGain(50);
controllers[5].setOSCFreqModFreq(0.4);
controllers[5].setOSCWaveform("triangle"); */

controllers[6].setOSCFrequency(987);
/* controllers[6].setOSCFrequModGain(50);*/
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



// play (1)
document.getElementById("osc1TogglePlay").addEventListener("click", function () {
    if (isOSCPlaying[0]) {
        controllers[0].stopOSC();
    } else {
        controllers[0].playOSC();
    }
    isOSCPlaying[0] = !isOSCPlaying[0];
});

// waveform (1)
document.getElementById("osc1Waveform").addEventListener("change", function () {
    controllers[0].setOSCWaveform(this.value);
});

// frequency (1)
document.getElementById("osc1Frequency").addEventListener("input", function () {
    controllers[0].setOSCFrequency(parseFloat(this.value));
    document.getElementById("osc1FrequencyValue").textContent = this.value;
});

// gain (1)
document.getElementById("osc1Gain").addEventListener("input", function () {
    controllers[0].setOSCGain(parseFloat(this.value));
    document.getElementById("osc1GainValue").textContent = this.value;
});

// attack (1)
document.getElementById("osc1Attack").addEventListener("input", function () {
    controllers[0].setOSCAttack(parseFloat(this.value));
    document.getElementById("osc1AttackValue").textContent = this.value;
});

// decay (1)
document.getElementById("osc1Decay").addEventListener("input", function () {
    controller[0].setOSCDecay(parseFloat(this.value));
    document.getElementById("osc1DecayValue").textContent = this.value;
});

// sustain (1)
document.getElementById("osc1Sustain").addEventListener("input", function () {
    controllers[0].setOSCSustain(parseFloat(this.value));
    document.getElementById("osc1SustainValue").textContent = this.value;
});

// release (1)
document.getElementById("osc1Release").addEventListener("input", function () {
    controllers[0].setOSCRelease(parseFloat(this.value));
    document.getElementById("osc1ReleaseValue").textContent = this.value;
});

// transpose up (1)
document.getElementById("osc1TransposeUp").addEventListener("click", function () {
    controllers[0].transpose(1);
});

// transpose down (1)
document.getElementById("osc1TransposeDown").addEventListener("click", function () {
    controllers[0].transpose(-1);
});

// freq mod (1)
document.getElementById("osc1ToggleFreqMod").addEventListener("click", function () {
    controllers[0].toggleOSCFreqMod();
});

document.getElementById("osc1FrequModGain").addEventListener("input", function () {
    controllers[0].setOSCFrequModGain(parseFloat(this.value));
    document.getElementById("osc1FrequModGainValue").textContent = this.value;
});

document.getElementById("osc1FreqModFreq").addEventListener("input", function () {
    controllers[0].setOSCFreqModFreq(parseFloat(this.value));
    document.getElementById("osc1FreqModFreqValue").textContent = this.value;
    console.log(this.value);
});

// ring mod (1)
document.getElementById("toggleOSC1RingModFreq").addEventListener("click", function () {
    controllers[0].toggleOSCRingModFreq();
});

document.getElementById("osc1RingModFreq").addEventListener("input", function () {
    controllers[0].setOSCRingModFreq(parseFloat(this.value));
    document.getElementById("osc1RingModFreqValue").textContent = this.value;
});

// noise
document.getElementById("startWhiteNoiseBttn").addEventListener("click", function () {
    startWhiteNoise();
});

document.getElementById("stopWhiteNoiseBttn").addEventListener("click", function () {
    stopWhiteNoise();
});

document.getElementById("whiteNoiseGainSlider").addEventListener("input", function () {
    const gainValue = parseFloat(this.value);
    setWhiteNoiseGain(gainValue);
    document.getElementById("whiteNoiseGainValue").textContent = gainValue.toFixed(2);
});

// eq
document.getElementById("eqBand1").addEventListener("input", (event) => {
    setEQGain(0, event.target.value);
});

document.getElementById("eqBand2").addEventListener("input", (event) => {
    setEQGain(1, event.target.value);
});

document.getElementById("eqBand3").addEventListener("input", (event) => {
    setEQGain(2, event.target.value);
});

document.getElementById("eqBand4").addEventListener("input", (event) => {
    setEQGain(3, event.target.value);
});

document.getElementById("eqBand5").addEventListener("input", (event) => {
    setEQGain(4, event.target.value);
});

document.getElementById("eqBand6").addEventListener("input", (event) => {
    setEQGain(5, event.target.value);
});

document.getElementById("eqBand7").addEventListener("input", (event) => {
    setEQGain(6, event.target.value);
});

document.getElementById("eqBand8").addEventListener("input", (event) => {
    setEQGain(7, event.target.value);
});

/////////////////////////////////////////////////////////////////////

// play (2)
document.getElementById("osc2TogglePlay").addEventListener("click", function () {
    if (isOSCPlaying[1]) {
        controllers[1].stopOSC();
    } else {
        controllers[1].playOSC();
    }
    isOSCPlaying[1] = !isOSCPlaying[1];
});

// waveform (2)
document.getElementById("osc2Waveform").addEventListener("change", function () {
    controllers[1].setOSCWaveform(this.value);
});

// frequency (2)
document.getElementById("osc2Frequency").addEventListener("input", function () {
    controllers[1].setOSCFrequency(parseFloat(this.value));
    document.getElementById("osc2FrequencyValue").textContent = this.value;
    console.log(osc.frequency.value);
});

// gain (2)
document.getElementById("osc2Gain").addEventListener("input", function () {
    controllers[1].setOSCGain(parseFloat(this.value));
    document.getElementById("osc2GainValue").textContent = this.value;
});

// attack (2)
document.getElementById("osc2Attack").addEventListener("input", function () {
    controllers[1].setOSCAttack(parseFloat(this.value));
    document.getElementById("osc2AttackValue").textContent = this.value;
});

// decay (2)
document.getElementById("osc2Decay").addEventListener("input", function () {
    controllers[1].setOSCDecay(parseFloat(this.value));
    document.getElementById("osc2DecayValue").textContent = this.value;
});

// sustain (2)
document.getElementById("osc2Sustain").addEventListener("input", function () {
    controllers[1].setOSCSustain(parseFloat(this.value));
    document.getElementById("osc2SustainValue").textContent = this.value;
});

// release (2)
document.getElementById("osc2Release").addEventListener("input", function () {
    controllers[1].setOSCRelease(parseFloat(this.value));
    document.getElementById("osc2ReleaseValue").textContent = this.value;
});

// transpose up (2)
document.getElementById("osc2TransposeUp").addEventListener("click", function () {
    controllers[1].transpose(1);
});

// transpose down (2)
document.getElementById("osc2TransposeDown").addEventListener("click", function () {
    controllers[1].transpose(-1);
});

// freq mod (2)
document.getElementById("osc2ToggleFreqMod").addEventListener("click", function () {
    controllers[1].toggleOSCFreqMod();
});

document.getElementById("osc2FrequModGain").addEventListener("input", function () {
    controllers[1].setOSCFrequModGain(parseFloat(this.value));
    document.getElementById("osc2FrequModGainValue").textContent = this.value;
});

document.getElementById("osc2FreqModFreq").addEventListener("input", function () {
    controllers[1].setOSCFreqModFreq(parseFloat(this.value));
    document.getElementById("osc2FreqModFreqValue").textContent = this.value;
});

// ring mod (2)
document.getElementById("toggleOSC2RingModFreq").addEventListener("click", function () {
    controllers[1].toggleOSCRingModFreq();
});

document.getElementById("osc2RingModFreq").addEventListener("input", function () {
    controllers[1].setOSCRingModFreq(parseFloat(this.value));
    document.getElementById("osc2RingModFreqValue").textContent = this.value;
});

// keyboard events
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a":
        case "A":
            if (!isOSCPlaying[0]) {
                controllers[0].playOSC();
                isOSCPlaying[0] = true;
            }
            break;
        case "s":
        case "S":
            if (!isOSCPlaying[1]) {
                controllers[1].playOSC();
                isOSCPlaying[1] = true;
            }
            break;
        case "d":
        case "D":
            if (!isOSCPlaying[2]) {
                controllers[2].playOSC();
                isOSCPlaying[2] = true;
            }
            break;
        case "f":
        case "F":
            if (!isOSCPlaying[3]) {
                controllers[3].playOSC();
                isOSCPlaying[3] = true;
            }
            break;
        case "g":
        case "G":
            if (!isOSCPlaying[4]) {
                controllers[4].playOSC();
                isOSCPlaying[4] = true;
            }
            break;
        case "h":
        case "H":
            if (!isOSCPlaying[5]) {
                controllers[5].playOSC();
                isOSCPlaying[5] = true;
            }
            break;
        case "j":
        case "J":
            if (!isOSCPlaying[6]) {
                controllers[6].playOSC();
                isOSCPlaying[6] = true;
            }
            break;

    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
        case "A":
            if (isOSCPlaying[0]) {
                controllers[0].stopOSC();
                isOSCPlaying[0] = false;
            }
            break;
        case "s":
        case "S":
            if (isOSCPlaying[1]) {
                controllers[1].stopOSC();
                isOSCPlaying[1] = false;
            }
            break;
        case "d":
        case "D":
            if (isOSCPlaying[2]) {
                controllers[2].stopOSC();
                isOSCPlaying[2] = false;
            }
            break;
        case "f":
        case "F":
            if (isOSCPlaying[3]) {
                controllers[3].stopOSC();
                isOSCPlaying[3] = false;
            }
            break;
        case "g":
        case "G":
            if (isOSCPlaying[4]) {
                controllers[4].stopOSC();
                isOSCPlaying[4] = false;
            }
            break;
        case "h":
        case "H":
            if (isOSCPlaying[5]) {
                controllers[5].stopOSC();
                isOSCPlaying[5] = false;
            }
            break;
        case "j":
        case "J":
            if (isOSCPlaying[6]) {
                controllers[6].stopOSC();
                isOSCPlaying[6] = false;
            }
            break;
        case " ":
            isRunning = !isRunning;
            run();
            break;

        default:
            return;
    }
});


let isRunning = false;

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