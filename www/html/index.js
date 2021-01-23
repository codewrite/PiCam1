//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    props: {
      showZoomControl : { type: Boolean, default: false },
      mouseX: Number,
      mouseY: Number
    },
    data: {
        //videoFeedUrl: "http://" + window.location.hostname + ":5000/media/video_feed/",
        //videoFeedUrl: "http://rpi4:5000/media/video_feed/",
        videoFeedUrl: '/images/BackGarden.jpg',
        videoWidth: { type: Number, default: 100 },
        videoHeight: { type: Number, default: 100 },
        yourName: ''
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
