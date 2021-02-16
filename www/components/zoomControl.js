const ZoomCursorEnum = Object.freeze({
    "North":    { name:"North",    id:1, cursor:"n-resize" },
    "East":     { name:"East",     id:2, cursor:"e-resize" },
    "South":    { name:"South",    id:3, cursor:"s-resize" },
    "West":     { name:"West",     id:4, cursor:"w-resize" },
    "Move":     { name:"Move",     id:5, cursor:"move" },
    "Default":  { name:"Default",  id:6, cursor:"default" }
  });

Vue.component('zoom-control', {
    props: {
        controlVisible: { type: Boolean, default: true },
        framewidth: { type: Number },
        frameheight: { type: Number },
        top: { type: Number },
        left: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    data: function() {
        return {
          zoomBorderSize: 10,
          lineWidth: 4,
          currentCursor: ZoomCursorEnum.Default,
          currentDrag: ZoomCursorEnum.Default,
          startXY: undefined,
          startCursorOffset: undefined
        }
    },
    template: /*html*/`
    <div id="zoom-control"
         :style="{ width:framewidth + 'px', height:frameheight + 'px', position:'absolute', display:controlVisible ? '' : 'none', cursor:cursorStyle }"
         @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <svg :width="framewidth" :height="frameheight">
        <rect :x="left" :y="top" :width="width" :height="height" :style="{ fill:'blue', stroke:'green', strokeWidth:lineWidth, fillOpacity:'0.1', strokeOpacity:'0.8' }" />
      </svg>
    </div>
    `,
    methods: {
      getCursor: function(x, y) {
        var cursor;
        if (x >= this.left + this.zoomBorderSize && x < this.left + this.width - this.zoomBorderSize &&
            y >= this.top && y < this.top + this.zoomBorderSize) {
          cursor = ZoomCursorEnum.North;
        } else if (x >= this.left + this.zoomBorderSize && x < this.left + this.width - this.zoomBorderSize &&
          y >= this.top + this.height - this.zoomBorderSize && y < this.top + this.height) {
          cursor = ZoomCursorEnum.South;
        } else if (x >= this.left && x < this.left + this.zoomBorderSize &&
          y >= this.top + this.zoomBorderSize && y < this.top + this.height - this.zoomBorderSize) {
          cursor = ZoomCursorEnum.West;
        } else if (x >= this.left + this.width - this.zoomBorderSize && x < this.left + this.width &&
          y >= this.top + this.zoomBorderSize && y < this.top + this.height - this.zoomBorderSize) {
          cursor = ZoomCursorEnum.East;
        } else if (x >= this.left && x < this.left + this.width &&
          y >= this.top && y < this.top + this.height) {
          cursor = ZoomCursorEnum.Move;
        }
        else {
          cursor = ZoomCursorEnum.Default;
        }
        return cursor;
      },
      getMouseCoOrdsFromTouchCoOrds: function(x, y) {
        var offset = $('#zoom-control').offset();
        var x = Math.round(x) - offset.left;
        var y = Math.round(y) - offset.top;
        return { x: x, y: y };
      },
      zoomChanged: function(x, y) {
        var newPos = { x: this.startXY.x - this.startCursorOffset.x,
                       y: this.startXY.y - this.startCursorOffset.y,
                       width: this.width,
                       height: this.height
                     };
        switch (this.currentCursor) {
          case ZoomCursorEnum.Move:
            newPos.x = Math.max(0, x);
            newPos.y = Math.max(0, y);
            break;
          case ZoomCursorEnum.North:
            newPos.y = Math.max(0, y);
            newPos.height = this.startXY.height - y + this.startXY.y - this.startCursorOffset.y;
            newPos.width = Math.round(this.framewidth * newPos.height / this.frameheight);
            break;
          case ZoomCursorEnum.East:
            newPos.width = this.startXY.width + x - this.startXY.x + this.startCursorOffset.x;
            newPos.height = Math.round(this.frameheight * newPos.width / this.framewidth);
            break;
          case ZoomCursorEnum.South:
            newPos.height = this.startXY.height + y - this.startXY.y + this.startCursorOffset.y;
            newPos.width = Math.round(this.framewidth * newPos.height / this.frameheight);
            break;
          case ZoomCursorEnum.West:
            newPos.x = Math.max(0, x);
            newPos.width = this.startXY.width - x + this.startXY.x - this.startCursorOffset.x;
            newPos.height = Math.round(this.frameheight * newPos.width / this.framewidth);
            break;
          default:
            break;
        }
        this.$emit('zoom-move', { x: newPos.x, y: newPos.y, width: newPos.width, height: newPos.height });
      },
      created: function() {
      },
      mouseDown: function(ev) {
        if (!this.dragInProgress && ev.button == 0) {
          this.startXY = { x: ev.offsetX, y: ev.offsetY, width: this.width, height: this.height };
          this.startCursorOffset = { x: ev.offsetX - this.left, y: ev.offsetY - this.top };
          this.$emit('zoom-mouse-pos-test', this.startXY);
          this.currentDrag = this.currentCursor;
        }
      },
      mouseMove: function(ev) {
        if (this.dragInProgress) {
          this.$emit('zoom-mouse-pos-test', { x: ev.offsetX, y: ev.offsetY });
          this.zoomChanged(ev.offsetX - this.startCursorOffset.x, ev.offsetY - this.startCursorOffset.y);
        }
        else {
          this.currentCursor = this.getCursor(ev.offsetX, ev.offsetY);
        }
      },
      mouseUp: function(ev) {
        if (this.dragInProgress && ev.button == 0) {
          this.currentDrag = ZoomCursorEnum.Default;
        }
      },
      touchStart: function(ev) {
        if (!this.dragInProgress && ev.touches.length == 1) {
          var pos = this.getMouseCoOrdsFromTouchCoOrds(ev.touches[0].clientX, ev.touches[0].clientY);
          if (pos.x >= this.left && pos.x < this.left + this.width && pos.y >= this.top && pos.y < this.top + this.height) {
            this.startXY = { x: pos.x, y: pos.y, width: this.width, height: this.height };
            this.startCursorOffset = { x: pos.x - this.left, y: pos.y - this.top };
            this.$emit('zoom-mouse-pos-test', this.startXY);
            this.currentCursor = this.getCursor(pos.x, pos.y);
            this.currentDrag = this.currentCursor;
            ev.preventDefault();
          }
        }
      },
      touchMove: function(ev) {
        if (this.dragInProgress && ev.touches.length == 1) {
          var pos = this.getMouseCoOrdsFromTouchCoOrds(ev.touches[0].clientX, ev.touches[0].clientY);
          this.$emit('zoom-mouse-pos-test', { x: pos.x, y: pos.y });
          this.zoomChanged(pos.x - this.startCursorOffset.x, pos.y - this.startCursorOffset.y);
          ev.preventDefault();
        }
      },
      touchEnd: function(ev) {
        if (this.dragInProgress && ev.touches.length == 0) {
          this.currentDrag = ZoomCursorEnum.Default;
          ev.preventDefault();
        }
      },
    },
    computed: {
      cursorStyle: function() {
        return this.currentCursor.cursor;
      },
      dragInProgress: function() {
        return this.currentDrag != ZoomCursorEnum.Default;
      }
    }
})
