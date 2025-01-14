import { connectNodeToEQ, initEQ } from "./equalizer.js";

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 4096;

// after audioCtx and analyser are created
initEQ();


class OSC_Controller {
    constructor() {
        this.osc = audioCtx.createOscillator();
        this.osc.type = "sine";

        // oscillator start flag
        this.oscStarted = false;

        // gain
        this.oscGain = audioCtx.createGain();
        this.oscCurrentGain = 1; // default 1
        this.oscGain.gain.value = this.oscCurrentGain;

        // adsr parameters
        this.oscAttack = 0, this.oscDecay = 0, this.oscSustain = 1, this.oscRelease = 0;

        // frequency modulator
        this.oscFreqMod = audioCtx.createOscillator();
        this.oscFreqModGain = audioCtx.createGain();
        this.oscFreqModCurrentGain = 0;
        this.oscFreqMod.connect(this.oscFreqModGain).connect(this.osc.frequency);
        this.oscFreqModFrequency = 2;
        this.oscFreqMod.frequency.value = this.oscFreqModFrequency;
        this.oscFreqModOn = true;

        // ringmodulator
        this.oscRingMod = audioCtx.createOscillator();
        this.oscRingModGain = audioCtx.createGain();
        this.oscRingMod.connect(this.oscRingModGain).connect(this.oscGain.gain);
        this.oscRingModFrequency = 0;
        this.oscRingMod.frequency.value = this.oscRingModFrequency;
        this.oscRingModOn = false;

        // connections
        this.osc.connect(this.oscGain);
        connectNodeToEQ(this.oscGain);
    }

    /**
    * Sets the waveform of the oscillator.
    *
    * @param {string} type - The type of waveform to set.
    * @return {void}
    */
    setOSCWaveform(type) {
        this.osc.type = type;
    }
    /**
     * Gets the waveform of the oscillator.
     *
     * @return {string} - The type of waveform of the oscillator.
     */
    getOSCWaveform() {
        return this.osc.type;
    }

    setOSCFrequency(freq) {
        this.osc.frequency.value = freq;
    }

    setOSCGain(gain) {
        this.oscCurrentGain = gain;
        this.oscGain.gain.value = this.oscCurrentGain;
    }

    setOSCAttack(attack) {
        this.oscAttack = attack;
    }

    setOSCDecay(decay) {
        this.oscDecay = decay;
    }

    setOSCSustain(sustain) {
        this.oscSustain = sustain;
    }

    setOSCRelease(release) {
        this.oscRelease = release;
    }

    /**
    * Transposes the frequency of the oscillator by a given interval in semitones.
    *
    * @param {number} semitones - The number of semitones by which the frequency should be transposed.
    * @return {void}
    */
    transpose(semitones) {
        const factor = Math.pow(2, semitones / 12);
        this.osc.frequency.value *= factor;
    }
    /**
    * Switches the frequency modulation on/off.
    *
    * @return {void}
    */
    toggleOSCFreqMod() {
        if (this.oscFreqModOn) {
            this.oscFreqMod.frequency.value = 0;
            this.oscFreqModOn = false;
        } else {
            this.oscFreqMod.frequency.value = this.oscFreqModFrequency;
            this.oscFreqModOn = true;
        }
        console.log(this.oscFreqModOn);
    }

    setOSCFrequModGain(gain) {
        this.oscFreqModCurrentGain = gain;
        if (this.oscFreqModOn) {
            this.oscFreqModGain.gain.value = this.oscFreqModCurrentGain;
        }
    }

    setOSCFreqModFreq(freq) {
        this.oscFreqMod.frequency.value = freq;
    }
    getOSCFreqModFreq() {
        return this.oscFreqMod.frequency.value;
    }

    setOSCRingModFreq(freq) {
        this.oscRingModFrequency = freq;
        if (this.oscRingModOn) {
            this.oscRingMod.frequency.value = freq;
        }
    }

    toggleOSCRingModFreq() {
        if (this.oscRingModOn) {
            this.oscRingMod.frequency.value = 0;
            this.oscRingModOn = false;
        } else {
            this.oscRingMod.frequency.value = this.oscRingModFrequency;
            this.oscRingModOn = true;
        }
    }

    /**
    * Plays the oscillator with the frequency modulator and the ring modulator if they are on.
    *
    *  @return {void}
    */
    playOSC() {
        if (!this.oscStarted) {
            this.osc.start();
            this.oscFreqMod.start();
            this.oscRingMod.start();
            this.oscStarted = true;
        }

        let time = audioCtx.currentTime;
        this.oscGain.gain.cancelScheduledValues(time);
        this.oscGain.gain.setValueAtTime(0, time);
        // attack
        this.oscGain.gain.linearRampToValueAtTime(this.oscCurrentGain, time + this.oscAttack);
        this.oscGain.gain.setValueAtTime(this.oscCurrentGain, time + this.oscAttack);
        // decay, sustain
        this.oscGain.gain.linearRampToValueAtTime(this.oscSustain * this.oscCurrentGain, time + this.oscAttack + this.oscDecay);

        this.oscRingModGain.gain.setValueAtTime(1, time);
    }

    stopOSC() {
        const time = audioCtx.currentTime;
        this.oscGain.gain.cancelScheduledValues(time);
        this.oscGain.gain.setValueAtTime(this.oscGain.gain.value, time);
        this.oscGain.gain.linearRampToValueAtTime(0, time + this.oscRelease);

        this.oscRingModGain.gain.setValueAtTime(0, time);
    }
}


export { OSC_Controller, audioCtx, analyser };