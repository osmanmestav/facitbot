<template>
  <el-row :gutter="24" :style="'height:' + this.Height +'px'">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">
      <el-row :gutter="24">
        <el-col :span="8" style="float: left">
          <h1 class="page-header-title">Ayarlar</h1>
        </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-10">
      <el-card :body-style="{ padding: '20px', width:'100%'}"
               style="display: flex; justify-content: center; width: 100%">
        <div class="el-divider el-divider--horizontal">
          <div class="el-divider__text is-left">API Anahtarı</div>
        </div>
        <el-row :gutter="24">
          <el-col :span="22" style="float: left">
            <el-input size="mini" v-model="token"></el-input>
          </el-col>
          <el-col :span="2" style="float: left">
            <el-button
                @click="createApiKey"
                class="save-button"
                type="primary"
                block
                size="mini"
            >Api Key Oluştur
            </el-button>
          </el-col>
        </el-row>
        <div class="el-divider el-divider--horizontal">
          <div class="el-divider__text is-left">WebHook</div>
        </div>
        <el-row :gutter="24">
          <el-form
              label-position="top"
              label-width="150px"
              :model="Form"
              ref="ruleForm"
              size="mini"
              @submit.native.prevent="submitForm('ruleForm')"
          >


            <el-col :span="11" style="float: left">

              <el-form-item label="Api Url" prop="url"
                            :rules="[{required: true, message: 'Api Url giriniz', trigger: 'blur'}]"
                            size="mini">
                <el-input v-model="Form.url"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" style="float: left">
              <el-form-item label="Api Key" prop="api"
                            :rules="[{required: true, message: 'Api Key giriniz', trigger: 'blur'}]"
                            size="mini">
                <el-input v-model="Form.api"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="float: left">
              <el-button
                  class="save-button"
                  type="primary"
                  native-type="submit"
                  block
                  size="mini"
                  style="margin-top: 30px;"
              >Kaydet
              </el-button>
            </el-col>
          </el-form>

        </el-row>
      </el-card>
    </el-col>
    <img src="../assets/setting.png" alt="message"
         style="position:absolute; bottom: 0px; left: calc(50% - 100px);width: 200px;">
  </el-row>

</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      token: '',
      Height: 300,
      Form: {
        api: null,
        url: null,
      }
    }
  },
  created() {
    this.Height = window.innerHeight - 100;
    this.Query();
  },
  methods: {
    reload() {
      this.listLoading = true;
      this.Query();
    },
    Query() {
      this.$store.dispatch("Query", {method: "get", url: "settings"}).then((response) => {
        this.token = response.token.token;
        this.Form.api = response.api;
        this.Form.url = response.url;
      });
    },
    createApiKey() {
      this.$store.dispatch("Query", {method: "post", url: "settings/apikey"}).then((response) => {
        console.log(response);
        this.token = response.token;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          this.$store.dispatch("Query", {method: "post", url: "settings/webhook", data: this.Form}).then((response) => {
            console.log(response);
            if (response.status === 'success') {
              this.$message.success("Kayıt Başarılı.");
            } else {
              if (response.message) {
                if (response.message.api) this.$message.error(response.message.api)
                if (response.message.url) this.$message.error(response.message.url)
              }
            }
          });
        } else {
          return false;
        }
      });

    },

  },

}
</script>

<style scoped>

</style>
