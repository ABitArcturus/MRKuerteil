/* 
https://immersive-web.github.io/webxr/explainer.html
Lifetime of a VR web app

The basic steps most WebXR applications will go through are:

    Query to see if the desired XR mode is supported.
    If support is available, advertise XR functionality to the user. - benachrichtigen
    A user-activation event indicates that the user wishes to use XR.
    Request an immersive session from the device
    Use the session to run a render loop that updates sensor data, and produces graphical frames to be displayed on the XR device.
    Continue producing frames until the user indicates that they wish to exit XR mode.
    End the XR session.

    inline session =
    Vorschau oder Simulation von XR-Inhalten, bevor die immersive Session gestartet wird.
    Browserbasierte Erfahrungen, die ohne spezielle Hardware laufen.
    Für Geräte, die XR-Hardware nicht unterstützen (z. B. Desktop-PCs ohne VR-Headset).

*/
import { WebXRButton } from './util/webxr-button.js';

function initXR() {
  console.log("test");
  console.log("test2");
  xrButton = new WebXRButton({
    onRequestSession: onRequestSession,
    onEndSession: onEndSession
  });
  document.querySelector('header').appendChild(xrButton.domElement);

  // MR UEB 4 inline session
  xrButton2 = new WebXRButton({
    onRequestSession: onRequestSession2,
    onEndSession: onEndSession,
    textEnterXRTitle: "START AR",
    textXRNotFoundTitle: "AR NOT FOUND",
    textExitXRTitle: "EXIT  AR",
  });
  document.querySelector('header').appendChild(xrButton2.domElement);

  // MR UEB 4 inline session
  if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
      xrButton.enabled = supported;
    });

    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      xrButton2.enabled = supported;
    });

    // Start up an inline session, which should always be supported on
    // browsers that support WebXR regardless of the available hardware.
    navigator.xr.requestSession('inline').then((session) => {
      inlineSession = session;
      onSessionStarted(session);
      updateFov();
    });
  }
}

initXR();