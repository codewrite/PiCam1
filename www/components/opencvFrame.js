Vue.component('opencv-frame', {
  mixins: [CameraApi],
  props: {
    },
    data: function () {
      return {
        imageList: [],
        currentImage: undefined
      }
    },
    template: /*html*/`
    <div>
      <p>Open CV Test Page</p>
    </div>
    `,
    mounted() {
    },
    watch: {
    },
    created: function() {
        this.getImages();
    },
    methods: {
    },
    computed: {
    }
})
