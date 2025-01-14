
AFRAME.registerComponent('name', {
    schema: {
        normalColor: { default: '#000000' },
        hoverColor: { default: '#000000' }
    },
    init: function () {
        const el = this.el;

        const normalColor = el.getAttribute('color');;
        const hoverColor = this.data.hoverColor;

        /*         var defaultColor = this.el.getAttribute('material').color;
         */        /* const ent = this.el; */
        el.addEventListener('mouseenter',
            function () {
                el.setAttribute('color', hoverColor);
            }
        );

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', normalColor);
            /* würde this verwendet werden, funzt nicht, da der Kontext von this im Event-Listener auf das Event-Target (das DOM-Element) verweist, */

        });
    }
});
