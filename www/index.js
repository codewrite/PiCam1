//--------------------------------
// Main App
//--------------------------------

var app = new Vue({
    el: '#app',
    props: {
    },
    data: {
    },
    methods: {
      pageVersion: function() {
        if (globalConstants === undefined) { return "" }
          return globalConstants.indexPageVersion;
      },
      lastModified: function() {
        return new Date(document.lastModified).toDateString()
      }
    },
    created: function() {
      var absLocation = window.location.href;
      globalConstants.framePage = 	absLocation.replace(/^.*page=(\w+).*$/, '$1');
  
      if (globalConstants.framePage === absLocation || globalConstants.framePage === 'home') {
        globalConstants.framePage = 'video';
      }
    },
    computed: {
    }
})
