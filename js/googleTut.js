// Import the required libraries
import * as THREE from 'three';
import { XRManager } from 'three/examples/jsm/webxr/XRManager.js';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});

// Create the XR manager
const xrManager = new XRManager(renderer, {
  disableAutomaticRendering: true
});

// Define the VR and AR modes
const modes = {
  VR: 'immersive-vr',
  AR: 'immersive-ar'
};

// Set the initial mode to VR
let currentMode = modes.VR;

// Create a button to toggle between VR and AR modes
const modeButton = document.getElementById('mode-button');
modeButton.addEventListener('click', () => {
  if (currentMode === modes.VR) {
    currentMode = modes.AR;
    modeButton.textContent = 'Switch to VR';
  } else {
    currentMode === modes.VR;
    modeButton.textContent = 'Switch to AR';
  }
  xrManager.setMode(currentMode);
});

// Create a function to handle XR session initialization
function onXRSessionInit(session) {
  // Add the camera to the scene
  scene.add(camera);

  // Create a cube to render in the scene
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  scene.add(cube);

  // Start the XR session
  xrManager.startSession(session);
}

// Create a function to handle XR frame rendering
function onXRFrame(frame) {
  // Render the scene
  renderer.render(scene, camera);
}

// Initialize the XR session
xrManager.init().then((session) => {
  onXRSessionInit(session);
}).catch((error) => {
  console.error('Error initializing XR session:', error);
});

// Handle XR frame rendering
xrManager.addEventListener('frame', onXRFrame);