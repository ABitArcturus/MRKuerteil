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
      console.log("onXRFrame");
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