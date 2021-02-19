Vue.component('frame-page', function (resolve, reject) {
  axios.get("./views/" + globalConstants.framePage
                       + ".html?v=" + globalConstants.lastModifiedTimestamp).then(response => {
    resolve({
      template: response.data,
      props: {
      },
      data: function () {
        return {
          ViewTitle: "Live stream"
        }
      },
      methods: {
        created: function () {
        }
      },
      computed: {
      }
    })
  })
})
