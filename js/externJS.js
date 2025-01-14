// main.js
console.log('main.js loaded');

// Custom logic for A-Frame
AFRAME.registerComponent('rotate-box', {
    init: function () {
        console.log('rotate-box component loaded');
      // Rotate the box component when scene is loaded
      let el = this.el;
      el.setAttribute('rotation', { x: 0, y: 45, z: 0 });
    },
    tick: function () {
      // Logic to keep rotating the box
      let rotation = this.el.getAttribute('rotation');
      this.el.setAttribute('rotation', {
        x: rotation.x,
        y: rotation.y + 1,
        z: rotation.z,
      });
    },
  });
  