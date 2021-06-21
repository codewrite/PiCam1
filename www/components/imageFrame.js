Vue.component('image-frame', {
    props: {
    },
    data: function () {
      return {
        windowProtocol: window.location.protocol,
        videoFeedUrl: window.location.protocol + "//" + window.location.hostname + ":5000/media/video_feed/",
        //videoFeedUrl: '/images/BackGarden.jpg',
        hostUrl: window.location.hostname,
        cameraPropertiesUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/properties",
        takeStillShotUrl: window.location.protocol + "//" + window.location.hostname + ":5000/camera/stillshot",
        imagesUrl: window.location.protocol + "//" + window.location.hostname + ":5000/media/images",
        imageList: [],
        currentImage: undefined
      }
    },
    template: /*html*/`
    <div>
      <div>    
        <img v-for="item in imageList" :src="windowProtocol + '//' + hostUrl + ':5000/media/thumbnail/' + item" @click="selectImage(item)" style="padding:5px 5px 0 0"/>
      </div>
      <div>    
        <img v-if="currentImage" :src="windowProtocol + '//' + hostUrl + ':5000/media/image/' + currentImage" style="padding-top:5px"/>
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
          axios
          .get(this.imagesUrl)
          .then(response => {
            this.imageList = response.data;
          })
          .catch(error => {
              console.log(error)
          })
          .finally(() => { });
          }
    },
    computed: {
    }
})
