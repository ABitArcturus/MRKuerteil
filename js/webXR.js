import xrGlobals from "./xrGlobals";
import { activateVR } from "./vr";
import { activateAR } from "./ar";
// https://developers.google.com/ar/develop/webxr/hello-webxr



document.getElementById("startAR-Bttn").addEventListener("click", () => {
  initXR("ar");
});
/* onclick-Callback-Funktion ohne () übergeben. Der Grund dafür ist, dass du die Funktion nur als Referenz übergeben möchtest, 
damit sie bei einem Klick ausgeführt wird. Wenn du activateXR() mit () schreibst, wird die Funktion sofort aufgerufen, wenn der 
Code ausgeführt wird, statt auf das Klick-Ereignis zu warten. */

document.getElementById("startVR-Bttn").addEventListener("click", () => {
  initXR("vr");
});

async function initXR(newMode) {
  xrGlobals.xrMode = newMode;

  // check webXR support
  if (!navigator.xr) {
    // navigator.xr = globales objekt
    alert("This browser does not support WebXR.");
    return;
  }

  // check webGL support
  if (!xrGlobals.gl) {
    alert("This browser does not support WebGL");
    return;
  }

  const vrSupported = await navigator.xr.isSessionSupported('immersive-vr');
  if (vrSupported) {
    console.log("vr supported: ", vrSupported);
  } else {
    console.log("vr not supported");
  }

  const arSupported = await navigator.xr.isSessionSupported('immersive-ar');
  if (arSupported) {
    console.log("ar supported: ", arSupported);
  } else {
    console.log("ar not supported");
  }

  const canvas = document.createElement("canvas");

  // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
  xrGlobals.gl = canvas.getContext("webgl", { xrCompatible: true });


  canvas.style = "position: absolute; width: 100%; height: 100%; left: 0; top: 0; right: 0; bottom: 0; margin: 0; z-index: -1;"; // we add a simple style to our canvas
  document.body.appendChild(canvas);


  if (xrGlobals.xrMode == "vr") {
    console.log("VR mode");
    return navigator.xr.requestSession('immersive-vr').then((isSession) => {
      xrGlobals.session = isSession;
      xrGlobals.session.isImmersive = true;
      activateVR();
    });

  } else if (xrGlobals.xrMode == "ar") {
    console.log("AR mode");
    return navigator.xr.requestSession('immersive-ar').then((isSession) => {
      xrGlobals.session = isSession;
      xrGlobals.session.isImmersive = true;
      activateAR();
    });
  }

}





