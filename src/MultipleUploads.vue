<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
  <div v-if="message" :class="`message ${error ?'is-danger':'is-success'}`">
      <div class="message-body">{{message}}</div>
   </div>
  <div class="field">
      <label for="file" class="label">Upload File</label>
      <input 
      multiple
      type="file"
      ref="files"
      @change="selectFile"
      />
  </div>
  <div class="field">
      <div v-for="(file,index) in uploadFiles" :key="index" class="level">
          <div class="level-left">
              <div class="level-item">
                  {{file.name}}
              </div>
          </div>
          <div class="level-right">
              <div class="level-item">
                <a @click.prevent="files.splice(index,1);uloadFiles.splice(index,1)" class="delete"></a>  
              </div>
          </div>
      </div>
  </div>
  <div class="field">
      <button class="button is-info">Send</button>
  </div>
  </form>
 </template>

<script>
import axios from 'axios';
export default {
  name:"MultipleUpload",
  data(){
      return {
          files:[],
          uploadFiles:[],          
          message:"",
          error:false
      }
  },
  methods:{
      selectFile(){
          const files=this.$refs.files.files;
          this.uploadFiles=[...this.uploadFiles,...files];
         
      },
       sendFile(){
       var i=0;
        const formData=new FormData();
        for(i=0;i<this.uploadFiles.length;i++){
            formData.append('files',this.uploadFiles[i]);
        } 
        try{
              axios.post('/multiple',formData);
              this.message="files has been uploaded";
              
          }
          catch(err){
              this.message=err.response.data.error;
              this.error=true;
          }
          
      }
  }

}
</script>


