<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
  <div v-if="message" 
    :class="`message ${error ?'is-danger':'is-success'}`">
      <div class="message-body">{{message}}</div>
   </div>
   
  <div class="Dropzone">
      <input
      type="file"
      class="input-file"
      ref="file"
      @change="sendFile"
      />
      <p v-if="!uploading" class="call-to-action">
         Drag your files here
    </p>
    
  </div>
   <div class="content">
          <div class="columns ismultiline">
          <div class="drag">
                <draggable :list="uploadedFiles">
                <transition-group>
                   
                        <div v-for="element in uploadedFiles" :key="element">
                            <figure class="image">
                                <ul class="list-group">
                                    <li class="list-group-item"><img :src="element" alt=""></li>
                                </ul>
                            </figure>
                        </div>
                 
                </transition-group>
                </draggable>
            </div>
          </div>
     </div>
     
      
     
    
      
  
 
  
  </form>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
export default {
  name:"Dropzone",
  data(){
      return {
          file:"",
          message:"",
          error:false,
          uploading:false,
          uploadedFiles: [],
          progress: 0,
          options: {
                handle: '.handle',
                filter: '.disabled'
            }
      }
  },
  components: {
    draggable
    }, 
  methods:{
      
       async sendFile(){
         this.file=this.$refs.file.files[0];
          const formData=new FormData();           
          formData.append("file",this.file);
          try{  
              const res=await axios.post('/dropzone',formData);
              this.uploadedFiles.push(res.data.file);
          }
          catch(err){
              this.message=err.response.data.error;
              this.error=true;
          }
          
      }
  }

}
</script>

<style scoped>
    .Dropzone{
        min-height: 200px;
        padding: 10px 10px;
        position: relative;
        cursor:pointer;
        outline:2px dashed grey;
        outline-offset: -10px;
        background:turquoise;
        color: grey;
    }
    .input-file{
        opacity:0;
        width:100%;
        height: 200px;
        position:absolute;
        cursor:pointer;
    }
    .Dropzone:hover{
        background:teal;
     }
    .Dropzone .call-to-action{
         font-size:1.2rem;
         text-align:center;
         padding: 70px 0;
     }
    
</style>

