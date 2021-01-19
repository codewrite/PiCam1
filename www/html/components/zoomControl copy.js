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
          lineWidth: 2
        }
    },
    template: /*html*/`
    <div :style="boxStyle" draggable="true" v-on:dragstart="drag(event)" id="zoomBox" :width="width" :height="height">
        <div style="position: absolute; cursor:nw-resize; z-index:10" :width="circleSize*2+lineWidth">
          <svg>
            <circle :cx="circleSize+lineWidth/2" :cy="circleSize+lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <div style="position: absolute">
          <svg>
            <circle style="cursor:ne-resize" :cx="width-circleSize-lineWidth/2" :cy="circleSize+lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <div style="position: absolute">
          <svg>
            <circle style="cursor:sw-resize" :cx="circleSize+lineWidth/2" :cy="height-circleSize-lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <div style="position: absolute">
          <svg>
            <circle style="cursor:se-resize" :cx="width-circleSize-lineWidth/2" :cy="height-circleSize-lineWidth/2" :r="circleSize" stroke="green" :stroke-width="lineWidth" fill="yellow" />
          </svg>
        </div>
        <div style="position: absolute" style="cursor:move">
        <svg>
            <line :x1="circleSize*2+lineWidth" :y1="circleSize" :x2="width-circleSize*2-lineWidth" :y2="circleSize" stroke="green" :stroke-width="lineWidth" />
            <line :x1="circleSize" :y1="circleSize*2+lineWidth" :x2="circleSize" :y2="height-circleSize*2-lineWidth" style="stroke:green;stroke-width:2" />
            <line :x1="width-circleSize" :y1="circleSize*2+lineWidth" :x2="width-circleSize" :y2="height-circleSize*2-lineWidth" style="stroke:green;stroke-width:2" />
            <line :x1="circleSize*2+lineWidth" :y1="height-circleSize" :x2="width-circleSize*2-lineWidth" :y2="height-circleSize" stroke="green" :stroke-width="lineWidth" />
        </svg>
        </div>
    </div>
    `,
    methods: {
        created: function() {
        },
        drag: function(ev) {
            if (ev != undefined)
              ev.dataTransfer.setData("text", ev.target.id);
        }
    },
    computed: {
        boxStyle: function() {
            var styleText = "position: absolute; top:" + this.top + "px; left:" + this.left + "px; opacity:40%"; // border:solid 2px green;";
            return styleText;
        }
    }
})
