<template>
  <div class="login" v-loading="loading">
    <el-row style="width: 100%">
      <el-col :xl="{span: 5}" :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}">

        <el-card class="text-center">
          <div class="text-center my-5">
            <a class="text-decoration-none  fw-bold display-2 text-dark" href="/">
              <img src="../../assets/logo2.svg" alt="logo" width="180">
            </a>
          </div>
          <img v-if="status==='success'" src="../../assets/verify.png" alt="verfy" width="200">
          <img v-if="status==='failure'" src="../../assets/verify-not.png" alt="verfy" width="200">
          <br>
          <br>
          <br>
          <div v-if="status==='success'" class="h1 fw-bold mt-5">Aktivasyon Başarılı,</div>
          <div v-if="status==='failure'" class="h1 fw-bold mt-5">Aktivasyon Başarısız,</div>
          <br>
          <div v-if="status==='success'" class="h4 text-muted mb-5">E-posta doğrulandı. Giriş yapabilirsiniz.</div>
          <div v-if="status==='failure'" class="h4 text-muted mb-5">E-posta doğrulanamıyor.</div>
          <br>


          <router-link
              v-if="status==='success'"
              class="el-button login-button el-button--warning"
              to="/login"
          >
            <i class="el-icon-unlock"></i> Giriş Yap
          </router-link>
          <br>
          <router-link
              v-if="status==='failure'"
              class="el-button register-button el-button--primary"
              to="/register"
          >
            <i class="el-icon-s-shop"></i> KAYIT OL
          </router-link>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "verify",
  data() {
    return {
      status: 'failure',
      loading: false,
    }
  },
  methods: {
    verification() {
console.log(this.$route.params.id)
      if (this.$route.params.id) {
        this.$store.dispatch("Query", {
          method: "get",
          url: "auth/verify/" + this.$route.params.id,
          data: this.model
        }).then(response => {
          console.log(response)
          this.status = response.status;
          if (response.status == 'success') {
            this.$message.success("E-posta doğrulandı.");
          } else {
            this.$message.error("E-posta doğrulanamıyor.");
          }
        });
      } else {
        this.$message.error("E-posta doğrulanamıyor.");
      }
    }
  },
  created() {
    this.verification();
  }
}
</script>

<style scoped>
.el-card__body {
  text-align: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

.login {
  background-color: #ffcf52 !important;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}

.register-button {
  width: 100%;
  margin-top: 20px;
}

.el-row {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.forgot-password {
  margin-top: 10px;
}

.el-button--primary {
  color: #fff;
  background-color: #4d69fa !important;
  border-color: #4d69fa !important;
  box-shadow: unset !important;
}

.el-button--primary {
  background: #007c89;
  border-color: #007c89;
}

.el-button--primary:hover, .el-button--primary.active, .el-button--primary:focus {
  background: #009cad;
  border-color: #009cad;
}

.login .el-input__inner:hover {
  border-color: #007c89;
}

.login .el-input__prefix {
  background: #eeedea;
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
}

.login .el-input__prefix .el-input__icon {
  width: 30px;
}

.login .el-input input {
  padding-left: 35px;
}

.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}

h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}

a {
  color: #007c89;
  text-decoration: none;
}

a:hover, a:active, a:focus {
  color: #009cad;
}


.btn {
  display: inline-block;
  font-weight: 600;
  line-height: 1.5;
  color: #323232;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-light-dark {
  color: #1f2128;
  background-color: #e9e9ea;
  border-color: #e9e9ea;
  box-shadow: unset;
}

.btn-dark {
  color: #fff;
  background-color: #1f2128;
  border-color: #1f2128;
  box-shadow: unset;
}

.el-card {
  --bs-card-border-color: rgba(222, 226, 230, 0.5);
  margin-bottom: calc(1.275rem + 0.3vw);
  border: 0 solid var(--bs-card-border-color);
  background-color: #fff;
  box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: 0 solid #dee2e6;
  border-radius: 2rem;
}

.el-button {
  display: inline-block;
  font-weight: 600;
  color: #323232;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border-radius: 1rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.el-button--warning {
  color: #000;
  background-color: #ffcf52;
  border-color: #ffcf52;
  box-shadow: unset;
}

.el-button--primary {
  color: #fff;
  background-color: #4d69fa !important;
  border-color: #4d69fa !important;
  box-shadow: unset !important;
  background: #007c89;
  border-color: #007c89;
}

.el-button.el-button--primary:hover, .el-button.el-button--primary:focus {
  color: #fff;
  background-color: #6880fb !important;
  border-color: #5f78fb !important;
}

.el-button.el-button--warning:hover, .el-button--warning:focus {
  color: #000;
  background-color: #ffd66c;
  border-color: #ffd463;
}

.my-5 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.h1 {
  line-height: 1.2;
  font-weight: 700;
  font-size: 2rem;
}

.h4, h4 {
  font-size: 1.1rem;
}

.text-muted {
  --bs-text-opacity: 1;
  color: #6c757d !important;
}
</style>
