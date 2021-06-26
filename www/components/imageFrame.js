Vue.component('image-frame', {
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
      <div>    
        <img v-for="item in imageList" :src="$apiAbsolutePath('media/thumbnail/' + item)" @click="selectImage(item)" style="padding:5px 5px 0 0"/>
      </div>
      <div>    
        <img v-if="currentImage" :src="$apiAbsolutePath('media/image/' + currentImage)" style="padding-top:5px"/>
      </div>
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
      selectImage: function(image) {
        this.currentImage = image;
      },
      getImages: function() {
        this.$callApiGet("media/images", (response) => { this.imageList = response.data; });
      }
    },
    computed: {
    }
})
