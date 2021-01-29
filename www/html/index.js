//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    props: {
      mouseX: Number,
      mouseY: Number
    },
    data: {
        videoFeedUrl: "http://" + window.location.hostname + ":5000/media/video_feed/",
        //videoFeedUrl: "http://rpi4:5000/media/video_feed/",
        //videoFeedUrl: '/images/BackGarden.jpg',
        showZoomControl: false,
        videoWidth: 320,
        videoHeight: 160,
        zoomPos: { top: 40, left: 50, width: 200, height: 150 },
        yourName: ''
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
      pageVersion: function() {
        if (globalConstants === undefined) { return "" }
        return globalConstants.indexPageVersion;
      },
      lastModified: function() { return new Date(document.lastModified).toDateString()
      },
      created: function () {
      },
      clearLocalStorage: function() {
        localStorage.clear();
      },
      zoomIn: function() {

      },
      zoomOut: function() {

      },
      onImgLoad: function(ev) {
        this.videoWidth = ev.currentTarget.width;
        this.videoHeight = ev.currentTarget.height;
      },
      zoomControlMouseDown: function(data) {
        this.mouseX = data.x;
        this.mouseY = data.y;
      },
      zoomControlMove: function(data) {
        this.zoomPos.left = data.x;
        this.zoomPos.top = data.y;
        this.zoomPos.width = data.width;
        this.zoomPos.height = data.height;
      }
    },
    computed: {
    }
})
