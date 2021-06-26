// define a mixin object
const CameraApi = {
  data: function() {
    return {
      baseUrl: window.location.protocol + "//" + window.location.hostname + ":5000/",
      apiAuth: { username: 'admin', password: 'pwd' }
    }
  },
  created: function () {
  },
  methods: {
    $callApiGet: function (uri, successFn) {
      axios
      .get(this.baseUrl + uri, { auth: this.apiAuth })
      .then(response => successFn(response))
      .catch(error => {
        console.log(error)
      })
      .finally(() => { });
    },
    $callApiPut: function (uri, data, successFn) {
      axios
      .put(this.baseUrl + uri, data, { auth: this.apiAuth })
      .then(response => successFn(response))
      .catch(error => {
        console.log(error)
      })
      .finally(() => { });
    },
    $apiAbsolutePath: function(uri) {
      return this.baseUrl + uri;
    }
  },
  computed: {   
  }
}
