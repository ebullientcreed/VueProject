<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data">
  <div v-if="message" :class="`message ${error ?'is-danger':'is-success'}`">
      <div class="message-body">{{message}}</div>
   </div>
  <div class="field">
      <label for="file" class="label">Upload File</label>
      <input 
      type="file"
      ref="file"
      @change="selectFile"
      />
  </div>
  <div class="field">
      <button class="button is-info">Send</button>
  </div>
  </form>
 </template>

<script>
import axios from 'axios';
export default {
  name:"SimpleUpload",
  data(){
      return {
          file:"",
          message:"",
          error:false
      }
  },
  methods:{
      selectFile(){
          this.file=this.$refs.file.files[0]
          this.error=false;
          this.message=""
      },
       sendFile(){
          const formData=new FormData();
          formData.append('file',this.file);
          try{
              axios.post('/upload',formData);
              this.message="file has been uploaded";
              this.file="";
              this.error=false;
          }
          catch(err){
              this.message="Something went wrong";
              this.error=true;
          }
          
      }
  }

}
</script>


