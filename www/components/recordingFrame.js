
// TODO: Make this recordings, not images

Vue.component('recording-frame', {
    mixins: [CameraApi],
    props: {
      },
      data: function () {
        return {
          recordingList: [],
        }
      },
      template: /*html*/`
      <div>
        <div>    
          <img v-for="recording in recordingList" :src="$apiAbsolutePath('media/thumbnail/' + item)" @click="selectImage(item)" style="padding:5px 5px 0 0"/>
        </div>
      </div>
      `,
      mounted() {
      },
      watch: {
      },
      created: function() {
          this.getRecordings();
      },
      methods: {
        getRecordings: function() {
          this.$callApiGet("media/images", (response) => { this.imageList = response.data; });
        }
      },
      computed: {
      }
  })
  