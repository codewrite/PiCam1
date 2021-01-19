function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  
Vue.component('zoom-control', {
    props: {
        top: { type: Number },
        left: { type: Number },
        width: { type: Number },
        height: { type: Number } 
    },
    data: function() {
        return {
          circleSize: 10,
          lineWidth: 2,
          circles: []
        }
    },
    template: /*html*/`
    <div :style="{top:top + 'px',left:left + 'px', width:width + 'px', height:height + 'px', position:'absolute', cursor:'move', opacity:'80%'}"
         draggable="true" v-on:dragstart="dragBox(event)" v-on:dragstart="dragBox(event)">
        <div v-for="n in 4" :style="{top:circlePos(n).y + 'px', left:circlePos(n).x + 'px', position:'absolute', cursor:circlePos(n).cursor}"
             draggable="true" v-on:dragstart="dragCircle(event)">
          <svg :width="circleSize*2+lineWidth" :height="circleSize*2+lineWidth" style="display:block">
            <circle :cx="circleSize+lineWidth/2" :cy="circleSize+lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <svg :width="width" :height="height">
          <line v-for="n in 4" :x1="circlePos(n).lineX1" :y1="circlePos(n).lineY1" :x2="circlePos(n).lineX2" :y2="circlePos(n).lineY2"
                stroke="green" :stroke-width="lineWidth" />
        </svg>
        </div>
    </div>
    `,
    methods: {
        created: function() {
        },
        // Using "draggable" probably isn't the best solution, but it is quite fast and relatively lightweight
        dragCircle: function(ev) {
          if (ev != undefined)
            ev.dataTransfer.setData("text", ev.target.id);
        },
        dropCircle: function(ev) {

        },
        dragBox: function(ev) {
            if (ev != undefined)
              ev.dataTransfer.setData("text", ev.target.id);
        },
        dropBox(ev) {

        },
        circlePos: function(n) {
          var top = {};
          switch (n) {
            case 1:
              top.x = 0;
              top.y = 0;
              top.cursor = 'nw-resize';
              top.lineX1 = this.circleSize * 2 + this.lineWidth;
              top.lineY1 = this.circleSize;
              top.lineX2 = this.width - this.circleSize * 2 - this.lineWidth;
              top.lineY2 = this.circleSize;
              break;
            case 2:
              top.x = this.width - this.circleSize * 2 - this.lineWidth;
              top.y = 0;
              top.cursor = 'ne-resize';
              top.lineX1 = this.circleSize;
              top.lineY1 = this.circleSize * 2 + this.lineWidth;
              top.lineX2 = this.circleSize;
              top.lineY2 = this.height - this.circleSize * 2 - this.lineWidth;
              break;
            case 3:
              top.x = 0;
              top.y = this.height - this.circleSize * 2 - this.lineWidth;
              top.cursor = 'sw-resize';
              top.lineX1 = this.width - this.circleSize - this.lineWidth / 2;
              top.lineY1 = this.circleSize * 2 + this.lineWidth;
              top.lineX2 = this.width - this.circleSize - this.lineWidth / 2;
              top.lineY2 = this.height - this.circleSize * 2 - this.lineWidth;
              break;
            case 4:
              top.x = this.width - this.circleSize * 2 - this.lineWidth;
              top.y = this.height - this.circleSize * 2 - this.lineWidth;
              top.cursor = 'se-resize';
              top.lineX1 = this.circleSize * 2 + this.lineWidth;
              top.lineY1 = this.height - this.circleSize - this.lineWidth / 2;
              top.lineX2 = this.width - this.circleSize * 2 - this.lineWidth;
              top.lineY2 = this.height - this.circleSize - this.lineWidth / 2;
              break;
            default:
              top.x = 0;
              top.y = 0;
              top.cursor = 'nw-resize';
              top.lineX1 = 0;
              top.lineY1 = 0;
              top.lineX2 = 10;
              top.lineY2 = 10;
              break;
          }
          return top;
        },
    },
    computed: {
        boxClass: function() {
            return {
                position: "absolute",
                top: this.top,
                left: this.left
            }
        },
    }
})
