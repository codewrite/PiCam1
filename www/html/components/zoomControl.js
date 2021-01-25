Vue.component('zoom-control', {
    props: {
        controlVisible: { type: Boolean, default: true },
        framewidth: { type: Number },
        frameheight: { type: Number },
        top: { type: Number },
        left: { type: Number },
        width: { type: Number },
        height: { type: Number },
        offsetX: { type: Number },
        offsetY: { type: Number }
    },
    data: function() {
        return {
          circleSize: 10,
          lineWidth: 3,
          
        }
    },
    template: /*html*/`
    <div :style="{width:framewidth + 'px', height:frameheight + 'px', position:'absolute', opacity:'80%', display:controlVisible ? '' : 'none' }"
         @mousedown="mouseDown">
      <div :style="{top:top + circleSize + 'px',left:left + circleSize + 'px', width:width - 2 * circleSize + 'px',
                    height:height - 2 * circleSize + 'px', position:'absolute', cursor:'move', opacity: '20%', backgroundColor: 'green'}">
      </div>
      <div :style="{top:top + 'px',left:left + circleSize + 'px', width:width - circleSize * 2 + 'px', height:circleSize + 'px', position:'absolute', cursor:'n-resize'}">
      </div>
      <div :style="{top:top + circleSize + 'px',left:left + 'px', width:circleSize + 'px', height:height - circleSize * 2 + 'px', position:'absolute', cursor:'w-resize'}">
      </div>
      <div :style="{top:top + circleSize + 'px',left:left + width - circleSize + 'px', width:circleSize + 'px', height:height - circleSize * 2 + 'px', position:'absolute', cursor:'e-resize'}">
      </div>
      <div :style="{top:top + height - circleSize + 'px',left:left + circleSize + 'px', width:width - circleSize * 2 + 'px', height:circleSize + 'px', position:'absolute', cursor:'s-resize'}">
      </div>
      <svg :width="framewidth" :height="frameheight">
        <line :x1="left + circleSize" :y1="top + circleSize" :x2="left + width - circleSize" :y2="top + circleSize" stroke-width="2" stroke="green" />
        <line :x1="left + circleSize" :y1="top + circleSize" :x2="left + circleSize" :y2="top + height - circleSize" stroke-width="2" stroke="green" />
        <line :x1="left + width - circleSize" :y1="top + circleSize" :x2="left + width - circleSize" :y2="top + height - circleSize" stroke-width="2" stroke="green" />
        <line :x1="left + circleSize" :y1="top + height - circleSize" :x2="left + width - circleSize" :y2="top + height - circleSize" stroke-width="2" stroke="green" />
      </svg>
    </div>
    `,
    methods: {
        created: function() {
        },
        mouseDown: function(ev) {
          this.width += 10;
          this.$emit('zoom-mouse-down', {x: ev.offsetX, y: ev.offsetY});
        },
        sleep: function(milliseconds) {     // For testing - TODO: remove when not needed
          const date = Date.now();
          let currentDate = null;
          do {
            currentDate = Date.now();
          } while (currentDate - date < milliseconds);
        },
        mouseUp: function(ev) {

        },
        mouseMove: function(ev) {
            if (ev != undefined)
              ev.dataTransfer.setData("text", ev.target.id);
        },
    },
    computed: {
    }
})
