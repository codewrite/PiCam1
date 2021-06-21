Vue.component('frame-page', function (resolve, reject) {
  axios.get("./views/" + globalConstants.framePage
                       + ".html?v=" + globalConstants.lastModifiedTimestamp).then(response => {
    resolve({
      template: response.data,
      props: {
      },
      data: function () {
        return {
          cameraPropertiesUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/properties",
          ViewTitle: "Live stream"
        }
      },
      mounted() {
        if (sessionStorage.cameraProperties) {
          globalConstants.cameraProperties = JSON.parse(sessionStorage.cameraProperties);
        }
        else {
          this.getCameraProperties()
        }
      },
      watch: {
      },
      methods: {
        created: function () {
        },
        getCameraProperties: function () {
          axios
            .get(this.cameraPropertiesUrl)
            .then(response => {
              globalConstants.cameraProperties = response.data;
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => { });
        },
      },
      computed: {
      }
    })
  })
})
