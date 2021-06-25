Vue.component('zoom-frame', {
    props: {
    },
    data: function () {
      let defaultTop = 40;
      let defaultLeft = 50;
      return {
        videoFeedUrl: window.location.protocol + "//" + window.location.hostname + ":5000/media/video_feed/",
        //videoFeedUrl: '/images/BackGarden.jpg',
        cameraPropertiesUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/properties",
        takeStillShotUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/stillshot",
        showZoomControl: false,
        videoWidth: 640,
        videoHeight: 480,
        zoomPos: { top: defaultTop, left: defaultLeft, width: 200, height: 150 },
        mouseX: defaultTop,
        mouseY: defaultLeft
        }
    },
    template: /*html*/`
    <div>
      <div id="img-container" :style="{width: videoWidth + 'px', height: videoHeight + 'px', position: 'relative'}">
        <img :src="videoFeedUrl" style="position: absolute;min-width:640px"  @load="onImgLoad"/>
        <zoom-control @zoom-mouse-pos-test="zoomControlMousePosTest" @zoom-move="zoomControlMove"
                      :framewidth="videoWidth" :frameheight="videoHeight" :control-visible="showZoomControl"
                      :top="zoomPos.top" :left="zoomPos.left" :width="zoomPos.width" :height="zoomPos.height"></zoom-control>
      </div>
      <div :style="{width: videoWidth + 'px'}">
        <div class="row picam-control-row">
          <div class="col-sm-3">
            <button type="button" @click="takeStillShot" class="btn btn-primary">Take Picture</button>
          </div>
          <div class="col-sm-3">
            <a href="/?page=images" class="btn btn-primary">View Images</a>
          </div>
          <div class="col-sm-6"></div>
        </div>
        <div class="row picam-control-row">
          <div class="col-sm-3 custom-control custom-switch custom-control-override">
            <input type="checkbox" id="zoom-control-checkbox" v-model="showZoomControl" class="custom-control-input">
            <label class="custom-control-label" for="zoom-control-checkbox">Zoom Control</label>
          </div>
          <div class="col-sm-3">
            <button type="button" :disabled="!showZoomControl" @click="zoomIn" class="btn btn-primary">Zoom In</button>
          </div>
          <div class="col-sm-3">
            <button type="button" @click="zoomOut" class="btn btn-primary">Zoom Out</button>
          </div>
          <div class="col-sm-3">
            <button type="button" class="btn btn-danger" @click="clearLocalStorage">Clear Data</button>
          </div>
        </div>
        <div class="row picam-control-row">
          <div class="col-sm-3">Debug:</div>
          <div class="col-sm-3">X: {{ mouseX }}</div>
          <div class="col-sm-3">Y: {{ mouseY }}</div>
        </div>
      </div>
    </div>
    `,
    mounted() {
      if (localStorage.showZoomControl) {
        this.showZoomControl = (localStorage.showZoomControl == String(true));
      }
      if (localStorage.zoomPos) {
        this.zoomPos = JSON.parse(localStorage.zoomPos);
      }
    },
    watch: {
      showZoomControl(newValue) {
        localStorage.showZoomControl = newValue;
      },
      zoomPos: {
        handler(newValue) {
          localStorage.zoomPos = JSON.stringify(newValue);
        },
        deep: true
      }
    },
    methods: {
      created: function () {
      },
      clearLocalStorage: function () {
        //localStorage.clear();
        console.log(app.lastModified());
      },
      doZoom: function (zoomData) {
        axios
          .put(this.cameraPropertiesUrl, zoomData)
          .then(response => {
            this.showZoomControl = false;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => { });
      },
      zoomIn: function () {
        var x = this.zoomPos.left / this.videoWidth;
        var y = this.zoomPos.top / this.videoHeight;
        var rotation = app.cameraProperties.rotation;
        if (rotation == 90 || rotation == 270) {
          [x,y] = [y,x];
          [width, height] = [height, width]
        }
        var width = this.zoomPos.width / this.videoWidth;
        var height = this.zoomPos.height / this.videoHeight;
        var zoomData = { "zoom": [x, y, width, height] }
        this.doZoom(zoomData);
      },
      zoomOut: function () {
        this.doZoom({ "zoom": [0, 0, 1, 1] });
      },
      takeStillShot: function () {
        axios
          .put(this.takeStillShotUrl)
          .then(response => {
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => { });
      },
      onImgLoad: function (ev) {
        this.videoWidth = Math.max(ev.currentTarget.width, 640);
        this.videoHeight = Math.max(ev.currentTarget.height, 480);
      },
      zoomControlMousePosTest: function (data) {
        this.mouseX = data.x;
        this.mouseY = data.y;
      },
      zoomControlMove: function (data) {
        this.zoomPos.left = data.x;
        this.zoomPos.top = data.y;
        this.zoomPos.width = data.width;
        this.zoomPos.height = data.height;
      }
    },
    computed: {
    }
})
