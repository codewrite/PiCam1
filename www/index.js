//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    props: {
    },
    data: {
      cameraPropertiesUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/properties",
      cameraProperties: {}
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
        axios
          .get(this.cameraPropertiesUrl)
          .then(response => {
            app.cameraProperties = response.data;
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => { });
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
