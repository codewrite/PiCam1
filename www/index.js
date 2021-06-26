//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    mixins: [CameraApi],
    props: {
    },
    data: {
      cameraProperties: {},
    },
    mounted() {
      if (sessionStorage.cameraProperties) {
        this.cameraProperties = JSON.parse(sessionStorage.cameraProperties);
      }
      else {
        this.getCameraProperties()
      }
    },
    methods: {
      pageVersion: function() {
          return initGlobals.indexPageVersion;
      },
      lastModified: function() {
        return new Date(document.lastModified).toDateString()
      },
      getCameraProperties: function () {
        this.$callApiGet("camera/properties", (response) => { app.cameraProperties = response.data; })
      },
    },
    created: function() {
      var absLocation = window.location.href;
      initGlobals.framePage = 	absLocation.replace(/^.*page=(\w+).*$/, '$1');
  
      if (initGlobals.framePage === absLocation || initGlobals.framePage === 'home') {
        initGlobals.framePage = 'video';
      }
    },
    computed: {
    }
})
