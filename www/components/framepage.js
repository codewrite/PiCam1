Vue.component('frame-page', function (resolve, reject) {
  axios.get("./views/" + initGlobals.framePage
                       + ".html?v=" + initGlobals.lastModifiedTimestamp).then(response => {
    resolve({
      template: response.data,
      props: {
      },
      data: function () {
        return {
        }
      },
      mounted() {
      },
      watch: {
      },
      methods: {
        created: function () {
        },
      },
      computed: {
      }
    })
  })
})
