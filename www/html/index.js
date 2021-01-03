//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    data: {
        yourName: ''
    },
    methods: {
      pageVersion: function() {
        if (globalConstants === undefined) { return "" }
        return globalConstants.indexPageVersion;
      },
      lastModified: function() { return new Date(document.lastModified).toDateString() }
      },
      created: function () {
      }
})
