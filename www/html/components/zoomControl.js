Vue.component('zoom-control', {
    props: {
        controlvisible: { type: Boolean, default: true },
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
          circles: []
        }
    },
    template: /*html*/`
    <div :style="{width:framewidth + 'px', height:frameheight + 'px', position:'absolute', opacity:'80%' }"
         @mousedown="mouseDown">
      <div :style="{top:top + circleSize + 'px',left:left + circleSize + 'px', width:width - 2 * circleSize + 'px', height:height - 2 * circleSize + 'px', position:'absolute', cursor:'move'}">
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
<!--
      <div :style="{top:top + 'px',left:left + 'px', width:width + 'px', height:height + 'px', position:'absolute', cursor:'ne-resize', backgroundColor: 'yellow'}">
      </div>
      <div :style="{top:top + 'px',left:left + 'px', width:width + 'px', height:height + 'px', position:'absolute', cursor:'sw-resize', backgroundColor: 'yellow'}">
      </div>
      <div :style="{top:top + 'px',left:left + 'px', width:width + 'px', height:height + 'px', position:'absolute', cursor:'se-resize', backgroundColor: 'yellow'}">
      </div>
-->
<!--
      <div :style="{top:top + 'px',left:left + 'px', width:width + 'px', height:height + 'px', position:'absolute'}">
        <div v-for="n in 4" :style="{top:circlePos(n).y + 'px', left:circlePos(n).x + 'px', position:'absolute', cursor:circlePos(n).cursor}">
          <svg :width="circleSize*2+lineWidth" :height="circleSize*2+lineWidth" style="display:block">
            <circle :cx="circleSize+lineWidth/2" :cy="circleSize+lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <svg :width="width" :height="height">
          <line v-for="n in 4" :x1="circlePos(n).lineX1" :y1="circlePos(n).lineY1" :x2="circlePos(n).lineX2" :y2="circlePos(n).lineY2"
                stroke="green" :stroke-width="lineWidth" />
        </svg>
      </div>
-->
    </div>
    `,
    methods: {
        created: function() {
        },
        mouseDown: function(ev) {
          this.offsetX = ev.offsetX;
          this.offsetY = ev.offsetY;
          this.$emit('zoom-mouse-down', {x: this.offsetX, y: this.offsetY});
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
        divDisplay: {
          get() {
            return ''; // this.controlVisible ? '' : 'none';
          }
        },
        boxClass: function() {
            return {
                position: "absolute",
                top: this.top,
                left: this.left
            }
        },
    }
})
