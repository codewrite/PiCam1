Vue.component('frame-page', function (resolve, reject) {
  axios.get("./views/" + globalConstants.framePage
                       + ".html?v=" + globalConstants.lastModifiedTimestamp).then(response => {
    resolve({
      template: response.data,
      props: {
        mouseX: Number,
        mouseY: Number
      },
      data: function () {
        return {
          videoFeedUrl: "http://" + window.location.hostname + ":5000/media/video_feed/",
          //videoFeedUrl: '/images/BackGarden.jpg',
          cameraPropertiesUrl: "http://" + window.location.hostname + ":5000/camera/properties",
          takeStillShotUrl: "http://" + window.location.hostname + ":5000/camera/stillshot",
          showZoomControl: false,
          videoWidth: 640,
          videoHeight: 480,
          zoomPos: { top: 40, left: 50, width: 200, height: 150 }
        }
      },
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
          localStorage.clear();
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
  })
})