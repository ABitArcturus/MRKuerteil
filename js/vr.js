import xrGlobals from "./xrGlobals";
import * as THREE from "three";


async function activateVR() {
    console.log("activateVR");

    if (!xrGlobals.session) {
        console.error("No valid VR session found!");
        return;
    }

    xrGlobals.scene = new THREE.Scene();


    const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);  // Ein Würfel mit Seitenlängen von 0.5
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,  // Grüne Farbe
        emissive: 0x00ff00,  // Leuchtende Farbe
        emissiveIntensity: 1  // Leuchtintensität
    });


    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -2);  // Positioniere den Würfel vor der Kamera
    scene.add(cube);


    // 4. Einen Renderer erstellen, wenn er noch nicht existiert
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.autoClear = false;

    // 5. Eine Kamera erstellen, wenn sie noch nicht existiert
    const camera = new THREE.PerspectiveCamera();
    camera.matrixAutoUpdate = false;  // Um die automatische Matrix-Aktualisierung zu verhindern

    // Koordinatenraum, der als Bezugssystem dient, um die Position und Orientierung von Objekten und Benutzerbewegungen in der realen oder virtuellen Umgebung zu definieren.
    const referenceSpace = await xrGlobals.session.requestReferenceSpace('local');

    // 7. Den WebXR-Renderer mit einer VR-BaseLayer aktualisieren
   xrGlobals.session.updateRenderState({
        baseLayer: new XRWebGLLayer(xrGlobals.session, xrGlobals.gl)
    });

    // 8. Ein Render-Loop erstellen, der kontinuierlich die Szene rendert
    const onXRFrame = (time, frame) => {
        console.log("onXRFrame");
        xrGlobals.session.requestAnimationFrame(onXRFrame);

       
        // Die Pose des Geräts abrufen
        const pose = frame.getViewerPose(referenceSpace);
        if (pose) {
            const view = pose.views[0];

            // Den Viewport basierend auf den aktuellen XR-Daten setzen
            const viewport = xrGlobals.session.renderState.baseLayer.getViewport(view);
            renderer.setSize(viewport.width, viewport.height);

            // Die Transformations- und Projektionsmatrix der Kamera aktualisieren
            camera.matrix.fromArray(view.transform.matrix);
            camera.projectionMatrix.fromArray(view.projectionMatrix);
            camera.updateMatrixWorld(true);

            // Die Szene rendern
            renderer.render(scene, camera);
        }
    };

    // Die Render-Schleife starten
    xrGlobals.session.requestAnimationFrame(onXRFrame);
}