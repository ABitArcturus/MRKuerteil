/* https://www.w3.org/TR/webxr/ */
const supported = await navigator.xr.isSessionSupported('immersive-vr');
if (supported) {
  // 'immersive-vr' sessions may be supported.
  // Page should advertise support to the user.
} else {
  // 'immersive-vr' sessions are not supported.
}


let canvas = document.createElement("canvas");

// Initialize the GL context
const gl = canvas.getContext("webgl");

 // Only continue if WebGL is available and working
 if (gl === null) {
  alert(
    "Unable to initialize WebGL. Your browser or machine may not support it.",
  );
  return;
}

document.appendChild(canvas);
