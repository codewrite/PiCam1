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
        //videoFeedUrl: "http://" + window.location.hostname + ":5000/media/video_feed/",
        //videoFeedUrl: "http://rpi4:5000/media/video_feed/",
        videoFeedUrl: '/images/BackGarden.jpg',
        showZoomControl: false,
        videoWidth: 320,
        videoHeight: 160,
        yourName: ''
    },
    mounted() {
      if (localStorage.showZoomControl) {
        this.showZoomControl = (localStorage.showZoomControl == String(true));
      }
    },
    watch: {
      showZoomControl(newValue) {
        localStorage.showZoomControl = newValue;
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
      onImgLoad: function(ev) {
        this.videoWidth = ev.currentTarget.width;
        this.videoHeight = ev.currentTarget.height;
      },
      zoomControlMouseDown: function(data) {
        this.mouseX = data.x;
        this.mouseY = data.y;
      }
    },
    computed: {

    }
})
