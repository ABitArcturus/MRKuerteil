import xrGlobals from "./xrGlobals.js";
import * as THREE from "../node_modules/three/build/three.module.js";

async function activateAR() {
    console.log("activateAR");
    
    xrGlobals.scene = new THREE.Scene();
  
    // 2. Erstelle ein großes Objekt (eine leuchtende Kugel), das als unübersehbar betrachtet werden kann.
    const largeSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1), // Große Kugel mit Radius 1
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
   
      })
    );
    largeSphere.position.set(0, 0, -3); // Positioniere die Kugel vor der Kamera, aber etwas weiter entfernt
    xrGlobals.scene.add(largeSphere);
  
  
  
  
    // Set up the WebGLRenderer, which handles rendering to the session's base layer.
    xrGlobals.renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      canvas: xrGlobals.canvas,
      context: xrGlobals.gl
    });
    xrGlobals.renderer.autoClear = false;
  
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
    xrGlobals.session.updateRenderState({
      baseLayer: new XRWebGLLayer(xrGlobals.session, xrGlobals.gl)
    });
    // entrypoint to WebXR is through XRSystem.requestSession()
  
    // A 'local' reference space has a native origin that is located
    // near the viewer's position at the time the session was created.
    const referenceSpace = await xrGlobals.session.requestReferenceSpace('local');
    // XRReferenceSpace describes the coordinate system used for objects within the virtual world
  
    ///////////////////////////////////// 5th step
    // Create a render loop that allows us to draw on the AR view.
    const onXRFrame = (time, frame) => {
      console.log("onXRFrame");
      // Queue up the next draw request.
      xrGlobals.session.requestAnimationFrame(onXRFrame);
  
      // Bind the graphics framebuffer to the baseLayer's framebuffer
      xrGlobals.gl.bindFramebuffer(xrGlobals.gl.FRAMEBUFFER, xrGlobals.session.renderState.baseLayer.framebuffer)
  
      // Retrieve the pose of the device.
      // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
      const pose = frame.getViewerPose(referenceSpace);
      if (pose) {
        // In mobile AR, we only have one view.
        const view = pose.views[0];
  
        const viewport = xrGlobals.session.renderState.baseLayer.getViewport(view);
        xrGlobals.renderer.setSize(viewport.width, viewport.height)
  
        // Use the view's transform matrix and projection matrix to configure the THREE.camera.
        camera.matrix.fromArray(view.transform.matrix)
        camera.projectionMatrix.fromArray(view.projectionMatrix);
        camera.updateMatrixWorld(true);
  
        // Render the scene with THREE.WebGLRenderer.
        xrGlobals.renderer.render(xrGlobals.scene, camera)
      }
    }
    xrGlobals.session.requestAnimationFrame(onXRFrame);
    //  XRSession.requestAnimationFrame() schedules a callback which is executed when the browser is ready to draw a frame.
  
  
  
  
  }

  export {  activateAR };