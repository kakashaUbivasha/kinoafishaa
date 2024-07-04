<template>
  <div class="block max-w-[500px] m-auto">
    <form @submit.prevent="sendSupport" action="#" enctype="multipart/form-data">
      <div @click.stop class="">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <img class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/support.svg">
              <div class="text-3xl mt-5 mb-3">Напишите в поддержку</div>
              <div class="form__modal">
                <div class="form-modal__item">
                  <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Описание проблемы</label>
                  <textarea
                      v-model="support_form.description"
                      id="regular-form-2"
                      type="textarea"
                      class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-green-600 rounded mb-1.5"
                      placeholder="Напишите полное описание проблемы"
                      required
                  />
                </div>
                <div class="form-modal__item mb-3">
                  <label for="inputFile" class="block text-left mb-3 text-slate-400">Прикрепите файл</label>
                  <v-input
                      class="input__file"
                      @change="support_form.file = $event.target.files[0]"
                      id="inputFile"
                      type="file"/>
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button type="submit" class="w-28 p-3 bg-sky-600 rounded-3xl text-white hover:bg-sky-700 transition-all ease-in-out duration-300">Отправить</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VInput from "../../components/template/UI/vInput.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TechnicalSupport",
  components: {VInput},
  data(){
    return {
      support_form: {
        description: '',
        file: ''
      }
    }
  },
  setup() {
    const sendTechSupport = () => {
      toast.success("Ваша проблема была успешно отправлена!", {
        autoClose: 1000,
      });
    }
    return { sendTechSupport };
  },
  methods: {
    ...mapActions(['createSupport']),
    sendSupport(){
      let fd = new FormData();
      fd.append('description', this.support_form.description);
      if (this.support_form.file)
        fd.append('file', this.support_form.file);
      let par = {fd:fd}
      this.createSupport(par);
      this.support_form.description = '';
      document.querySelector('input[type=file]').value = '';
    }
  },
  mounted() {
    if(!localStorage.getItem('token')){
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>

</style>