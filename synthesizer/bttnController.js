
import { controllers } from "./audioProcessing/oscController.js";
import { startWhiteNoise, stopWhiteNoise, setWhiteNoiseGain } from "./audioProcessing/whiteNoiseGen.js";
import { setEQGain } from "./audioProcessing/equalizer.js";

// OSC 1
const controller1 = controllers[0];
let isOSC1Playing = false;

// play (1)
document.getElementById("osc1TogglePlay").addEventListener("click", function () {
    if (isOSC1Playing) {
        controller1.stopOSC();
    } else {
        controller1.playOSC();
    }
    isOSC1Playing = !isOSC1Playing;
});

// waveform (1)
document.getElementById("osc1Waveform").addEventListener("change", function () {
    controller1.setOSCWaveform(this.value);
});

// frequency (1)
document.getElementById("osc1Frequency").addEventListener("input", function () {
    controller1.setOSCFrequency(parseFloat(this.value));
    document.getElementById("osc1FrequencyValue").textContent = this.value;
});

// gain (1)
document.getElementById("osc1Gain").addEventListener("input", function () {
    controller1.setOSCGain(parseFloat(this.value));
    document.getElementById("osc1GainValue").textContent = this.value;
});

// attack (1)
document.getElementById("osc1Attack").addEventListener("input", function () {
    controller1.setOSCAttack(parseFloat(this.value));
    document.getElementById("osc1AttackValue").textContent = this.value;
});

// decay (1)
document.getElementById("osc1Decay").addEventListener("input", function () {
    controller1.setOSCDecay(parseFloat(this.value));
    document.getElementById("osc1DecayValue").textContent = this.value;
});

// sustain (1)
document.getElementById("osc1Sustain").addEventListener("input", function () {
    controller1.setOSCSustain(parseFloat(this.value));
    document.getElementById("osc1SustainValue").textContent = this.value;
});

// release (1)
document.getElementById("osc1Release").addEventListener("input", function () {
    controller1.setOSCRelease(parseFloat(this.value));
    document.getElementById("osc1ReleaseValue").textContent = this.value;
});

// transpose up (1)
document.getElementById("osc1TransposeUp").addEventListener("click", function () {
    controller1.transpose(1);
});

// transpose down (1)
document.getElementById("osc1TransposeDown").addEventListener("click", function () {
    controller1.transpose(-1);
});

// freq mod (1)
document.getElementById("osc1ToggleFreqMod").addEventListener("click", function () {
    controller1.toggleOSCFreqMod();
});

document.getElementById("osc1FrequModGain").addEventListener("input", function () {
    controller1.setOSCFrequModGain(parseFloat(this.value));
    document.getElementById("osc1FrequModGainValue").textContent = this.value;
});

document.getElementById("osc1FreqModFreq").addEventListener("input", function () {
    controller1.setOSCFreqModFreq(parseFloat(this.value));
    document.getElementById("osc1FreqModFreqValue").textContent = this.value;
});

// ring mod (1)
document.getElementById("toggleOSC1RingModFreq").addEventListener("click", function () {
    controller1.toggleOSCRingModFreq();
});

document.getElementById("osc1RingModFreq").addEventListener("input", function () {
    controller1.setOSCRingModFreq(parseFloat(this.value));
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
// OSC2
// OSC 2
const controller2 = controllers[1];
let isOSC2Playing = false;

// play (2)
document.getElementById("osc2TogglePlay").addEventListener("click", function () {
    if (isOSC2Playing) {
        controller2.stopOSC();
    } else {
        controller2.playOSC();
    }
    isOSC2Playing = !isOSC2Playing;
});

// waveform (2)
document.getElementById("osc2Waveform").addEventListener("change", function () {
    controller2.setOSCWaveform(this.value);
});

// frequency (2)
document.getElementById("osc2Frequency").addEventListener("input", function () {
    controller2.setOSCFrequency(parseFloat(this.value));
    document.getElementById("osc2FrequencyValue").textContent = this.value;
});

// gain (2)
document.getElementById("osc2Gain").addEventListener("input", function () {
    controller2.setOSCGain(parseFloat(this.value));
    document.getElementById("osc2GainValue").textContent = this.value;
});

// attack (2)
document.getElementById("osc2Attack").addEventListener("input", function () {
    controller2.setOSCAttack(parseFloat(this.value));
    document.getElementById("osc2AttackValue").textContent = this.value;
});

// decay (2)
document.getElementById("osc2Decay").addEventListener("input", function () {
    controller2.setOSCDecay(parseFloat(this.value));
    document.getElementById("osc2DecayValue").textContent = this.value;
});

// sustain (2)
document.getElementById("osc2Sustain").addEventListener("input", function () {
    controller2.setOSCSustain(parseFloat(this.value));
    document.getElementById("osc2SustainValue").textContent = this.value;
});

// release (2)
document.getElementById("osc2Release").addEventListener("input", function () {
    controller2.setOSCRelease(parseFloat(this.value));
    document.getElementById("osc2ReleaseValue").textContent = this.value;
});

// transpose up (2)
document.getElementById("osc2TransposeUp").addEventListener("click", function () {
    controller2.transpose(1);
});

// transpose down (2)
document.getElementById("osc2TransposeDown").addEventListener("click", function () {
    controller2.transpose(-1);
});

// freq mod (2)
document.getElementById("osc2ToggleFreqMod").addEventListener("click", function () {
    controller2.toggleOSCFreqMod();
});

document.getElementById("osc2FrequModGain").addEventListener("input", function () {
    controller2.setOSCFrequModGain(parseFloat(this.value));
    document.getElementById("osc2FrequModGainValue").textContent = this.value;
});

document.getElementById("osc2FreqModFreq").addEventListener("input", function () {
    controller2.setOSCFreqModFreq(parseFloat(this.value));
    document.getElementById("osc2FreqModFreqValue").textContent = this.value;
});

// ring mod (2)
document.getElementById("toggleOSC2RingModFreq").addEventListener("click", function () {
    controller2.toggleOSCRingModFreq();
});

document.getElementById("osc2RingModFreq").addEventListener("input", function () {
    controller2.setOSCRingModFreq(parseFloat(this.value));
    document.getElementById("osc2RingModFreqValue").textContent = this.value;
});

// keyboard events
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a":
        case "A":
            if (!isOSC1Playing) {
                controller1.playOSC();
                isOSC1Playing = true;
            }
            break;
        case "d":
        case "D":
            if (!isOSC2Playing) {
                controller2.playOSC();
                isOSC2Playing = true;
            }
            break;
        case "ArrowUp":
            controller2.transpose(1);
            break;
        case "ArrowDown":
            controller2.transpose(-1);
            break;
        case "ArrowLeft":
            controller1.transpose(-1);
            break;
        case "ArrowRight":
            controller1.transpose(1);
            break;
        default:
            return;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
        case "A":
            if (isOSC1Playing) {
                controller1.stopOSC();
                isOSC1Playing = false;
            }
            break;
        case "d":
        case "D":
            if (isOSC2Playing) {
                controller2.stopOSC();
                isOSC2Playing = false;
            }
            break;
        default:
            return;
    }
});
