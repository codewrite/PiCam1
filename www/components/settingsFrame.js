Vue.component('settings-frame', {
    props: {
    },
    data: function () {
      return {
        pagetitle: ''
      }
    },
    template: /*html*/`
    <div class="settings">
      <div class="row">
        <div class="col-sm-11">
          <input type="text" class="form-control" placeholder="Page Title" v-model="pagetitle">
        </div>
        <div class="col-sm-1">
          <button type="button" class="btn btn-primary">Set</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          Rotation
        </div>
        <div class="col-sm-2">
          <input type="text" class="form-control" placeholder="Angle" v-model="pagetitle">
        </div>
        <div class="col-sm-1">
          <button type="button" class="btn btn-primary">Left</button>
        </div>
        <div class="col-sm-1">
          <button type="button" class="btn btn-primary">Right</button>
        </div>
      </div>
      <div class="row picam-control-row">
        <div class="col-sm-3">
          <a href="/?page=video" class="btn btn-primary">Show Video</a>
        </div>
        <div class="col-sm-9"></div>
      </div>
    </div>
    `,
    mounted() {
    },
    watch: {
    },
    created: function() {
    },
    methods: {
    },
    computed: {
    }
})
