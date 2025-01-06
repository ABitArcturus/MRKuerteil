/* 
 https://developers.google.com/ar/develop/webxr/hello-webxr */

/* Starting an immersive WebXR session requires user interaction.
  We start this one with a simple button. */
{/* <button onclick="activateXR()">Start Hello WebXR</button> */ }

let xrMode = null;

document.getElementById("startAR-Bttn").addEventListener("click", () => {
  initXR("ar");
});
/* onclick-Callback-Funktion ohne () übergeben. Der Grund dafür ist, dass du die Funktion nur als Referenz übergeben möchtest, 
damit sie bei einem Klick ausgeführt wird. Wenn du activateXR() mit () schreibst, wird die Funktion sofort aufgerufen, wenn der 
Code ausgeführt wird, statt auf das Klick-Ereignis zu warten. */

document.getElementById("startVR-Bttn").addEventListener("click", () => {
  initXR("vr");
});

//  globals.
let gl = null;
let renderer = null;
let scene = null;
const canvas = document.createElement("canvas");
let isInlineSession = null;
let session = null;
let mode = null;

async function initXR(newMode) {
  mode = newMode;

  if (navigator.xr) {
    /* navigator.xr = globales objekt
     */
    navigator.xr.isSessionSupported('immersive-vr').then((xrSupported) => {
      console.log("vr supported: ", xrSupported);
    });

    navigator.xr.isSessionSupported('immersive-ar').then((xrSupported) => {
      console.log("ar supported: ", xrSupported);
    });

    // Start up an inline session, which should always be supported on
    // browsers that support WebXR regardless of the available hardware.
    navigator.xr.requestSession('inline').then(
      (isSession) => {
        // true or false
        isInlineSession = isSession;
      });



  }

  document.body.appendChild(canvas);

  // Add a canvas element and initialize a WebGL context that is compatible with WebXR.
  gl = canvas.getContext("webgl", { xrCompatible: true });


  /* Inline-Session bezieht sich auf eine WebXR-Session, bei der der Inhalt direkt im Browserfenster (also ohne VR- oder AR-Headset) angezeigt wird
  
  Für AR auf mobilen Geräten:
  
      Wenn du AR auf mobilen Geräten umsetzen möchtest, insbesondere auf Geräten ohne AR-Headset (wie Smartphones oder Tablets), dann ist eine Inline-Session notwendig. Das bedeutet, dass der AR-Inhalt direkt auf dem Bildschirm des Geräts angezeigt wird, anstatt in einer immersiven AR-Umgebung.
      
      Für Web-basierte VR-Ansichten ohne Headset:
  
      Wenn du VR auf einem Desktop oder mobilen Gerät ohne ein VR-Headset starten möchtest, könnte eine Inline-Session sinnvoll sein. Das bedeutet, der VR-Inhalt wird direkt auf dem Bildschirm angezeigt, z. B. durch die Nutzung von 3D-Objekten, die vom Benutzer in der 3D-Umgebung mit der Maus oder Touch-Steuerung navigiert werden können.
      
      */


  onRequestSession();
  //performance besser außerhalb der Funktion? bzgl stack

}



function onRequestSession() {

  if (mode == "vr") {
    console.log("VR wurde aktiviert.");
    return navigator.xr.requestSession('immersive-vr').then((isSession) => {
      session = isSession;
      session.isImmersive = true;
      //activateAR(session);
    });

  } else if (mode == "ar") {
    console.log("AR wurde aktiviert.");
    return navigator.xr.requestSession('immersive-vr').then((isSession) => {
      session = isSession;
      session.isImmersive = true;
      activateAR();
    });
  }

}


async function activateVR() {
  console.log("activateVR");

  //console.log(currentSession);


}

async function activateAR() {
  console.log("activateAR");
  // console.log(currentSession);

  scene = new THREE.Scene();
  /////////////////////////////////////// 2nd step
  // init 3js

  // The cube will have a different color on each side.
/*   const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
  ]; */

  // Create the cube and add it to the demo scene.
  /* const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2), materials);
  cube.position.set(1, 1, 1);
  scene.add(cube); */


 // 2. Erstelle ein großes Objekt (eine leuchtende Kugel), das als unübersehbar betrachtet werden kann.
 const largeSphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1), // Große Kugel mit Radius 1
  new THREE.MeshStandardMaterial({
    color: 0xff0000, 
    emissive: 0xff0000, // Leuchtende rote Farbe
    emissiveIntensity: 1, // Stärke der Leuchtung
    roughness: 0, // Für mehr Glanz
    metalness: 0 // Kein Metall-Effekt
  })
);
largeSphere.position.set(0, 0, -3); // Positioniere die Kugel vor der Kamera, aber etwas weiter entfernt
scene.add(largeSphere);



  //////////////////////////////////////// 3rd step

  // Set up the WebGLRenderer, which handles rendering to the session's base layer.
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl
  });
  renderer.autoClear = false;

  // To be able to view this scene in AR, you'll need a renderer and a camera.

  // The API directly updates the camera matrices.
  // Disable matrix auto updates so three.js doesn't attempt
  // to handle the matrices independently.
  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  ///////////////////////////////////// 4th step
  // Initialize a WebXR session using "immersive-ar".
  // const session = await navigator.xr.requestSession("immersive-ar");
  // in init ausgelagert
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
  });
  // entrypoint to WebXR is through XRSystem.requestSession()

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await session.requestReferenceSpace('local');
  // XRReferenceSpace describes the coordinate system used for objects within the virtual world

  ///////////////////////////////////// 5th step
  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time, frame) => {
    // Queue up the next draw request.
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, session.renderState.baseLayer.framebuffer)

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame.getViewerPose(referenceSpace);
    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setSize(viewport.width, viewport.height)

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      camera.matrix.fromArray(view.transform.matrix)
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      renderer.render(scene, camera)
    }
  }
  session.requestAnimationFrame(onXRFrame);
  //  XRSession.requestAnimationFrame() schedules a callback which is executed when the browser is ready to draw a frame.




}
