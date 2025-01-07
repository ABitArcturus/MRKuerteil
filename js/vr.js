import xrGlobals from "./xrGlobals.js";
import * as THREE from "../node_modules/three/build/three.module.js";


async function activateVR() {
    console.log("activateVR");

    if (!xrGlobals.session) {
        console.error("No valid VR session found!");
        return;
    }
    
    xrGlobals.scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    // camera.matrixAutoUpdate = false;  // Um die automatische Matrix-Aktualisierung zu verhindern - nötig?


    xrGlobals.renderer = new THREE.WebGLRenderer({
        canvas: xrGlobals.canvas,
        context: xrGlobals.gl,
        powerPreference: 'high-performance',
    });

    

    xrGlobals.renderer.setClearColor(0x222222); // Set the background color to a dark gray
    // cgpt
    // xrGlobals.renderer = new THREE.WebGLRenderer({ canvas: xrGlobals.canvas });
    // xrGlobals.renderer.autoClear = false; // nötig?


    // Create a new cube mesh
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,


    });
    const cube = new THREE.Mesh(geometry, material);

    xrGlobals.scene.add(cube);

    // Position the cube in front of the camera
    cube.position.set(0, 10, -10);




    // Koordinatenraum, der als Bezugssystem dient, um die Position und Orientierung von Objekten und Benutzerbewegungen in der realen oder virtuellen Umgebung zu definieren.
    const referenceSpace = await xrGlobals.session.requestReferenceSpace('local');

    // 7. Den WebXR-Renderer mit einer VR-BaseLayer aktualisieren
    xrGlobals.session.updateRenderState({
        baseLayer: new XRWebGLLayer(xrGlobals.session, xrGlobals.gl)
    });

    // 8. Ein Render-Loop erstellen, der kontinuierlich die Szene rendert
    const onXRFrame = (time, frame) => {
        console.log("onXRFrame");


        // Die Pose des Geräts abrufen
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
            const view = pose.views[0];

            // Den Viewport basierend auf den aktuellen XR-Daten setzen
            /*   const viewport = xrGlobals.session.renderState.baseLayer.getViewport(view);
              xrGlobals.renderer.setSize(viewport.width, viewport.height); */

            // Die Transformations- und Projektionsmatrix der Kamera aktualisieren
            camera.matrix.fromArray(view.transform.matrix);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);

            // Die Szene rendern
            xrGlobals.renderer.render(xrGlobals.scene, camera);
        }
        // Request the next frame
        xrGlobals.session.requestAnimationFrame(onXRFrame);
    };


    // Die Render-Schleife starten
    xrGlobals.session.requestAnimationFrame(onXRFrame);
}

export { activateVR };