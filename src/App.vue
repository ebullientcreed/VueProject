 <template>
  <div class="section">
    <div class="container">
     
        
        <Dropzone/>
        
    </div>
  </div>
</template>

<script>
//import SimpleUpload from './SimpleUpload.vue';
//import MultipleUploads from './MultipleUploads.vue';
import Dropzone from './Dropzone.vue';

export default {
  name:"App",
  components:{ Dropzone }
}
</script>