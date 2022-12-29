<template>
  <div class="register">
    <el-row style="width: 100%">
      <el-col :xl="{span: 5}" :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}">
        <el-card style="border: none">
          <div class="text-center my-5">
            <a class="text-decoration-none  fw-bold display-2 text-dark" href="/">
              <img src="../../assets/logo2.svg" alt="logo" width="180">
            </a>
          </div>
          <div class="text-center h1 fw-bold mt-5">Hesap Oluştur</div>
          <br>

          <br>
          <br>
          <el-form
              v-loading="loading"
              class="login-form"
              :model="model"
              :rules="rules"
              ref="form"
              @submit.native.prevent="login"
          >
            <el-form-item prop="name">
              <el-input v-model="model.name" placeholder="Adınız" prefix-icon="fas fa-user"></el-input>
            </el-form-item>
            <el-form-item prop="surname">
              <el-input v-model="model.surname" placeholder="Soyadınız" prefix-icon="fas fa-user"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input v-model="model.phone" placeholder="Telefon" prefix-icon="fas fa-user" maxlength="12"
                        show-word-limit></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="model.email" placeholder="Email" prefix-icon="fas fa-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model="model.password"
                  placeholder="Şifre"
                  type="password"
                  prefix-icon="fas fa-lock"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                  :loading="loading"
                  class="login-button"
                  type="primary"
                  native-type="submit"
                  block
              >
                <i class="el-icon-s-shop"></i> KAYIT OL
              </el-button>
            </el-form-item>
          </el-form>

          <div class="mt-2 text-center text-muted" style="font-size: 12px">OR</div>
          <router-link
              :loading="loading"
              class="el-button login-button el-button--warning"
              to="/login"
          >
            <i class="el-icon-unlock"></i> GİRİŞ YAP
          </router-link>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      validCredentials: {
        email: "lightscope",
        password: "lightscope"
      },
      model: {
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        token: "regiter-token",
      },
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: "Lütfen adınız giriniz.",
            trigger: "blur"
          }
        ],
        surname: [
          {
            required: true,
            message: "Lütfen soyadınız giriniz.",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "Lütfen telefonunuzu giriniz.",
            trigger: "blur"
          }, {min: 12, max: 12, message: '12 haneli giriniz', trigger: 'blur'}
        ],
        email: [
          {
            required: true,
            message: "Lütfen email giriniz.",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: "Lütfen şifre giriniz.", trigger: "blur"},
          {
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      if (this.model.email !== '' && this.model.password !== '') {
        this.$store.dispatch("Query", {method: "post", url: "auth/signup", data: this.model}).then(response => {
          this.loading = false;
          if (response.status == 'success') {
            this.$message.success("Register successfull");
            this.model = {
              name: "",
              surname: "",
              phone: "",
              email: "",
              password: "",
              token: "regiter-token",
            };
            this.$router.push("/login");
          } else {
            Object.entries(response.message).forEach((value) => {
              this.$message.error(value[1])
            });
          }
        });
      } else {
        this.$message.error("Error");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-card__body {
  text-align: center;
  align-items: center;
}

.text-center {
  text-align: center;
}

.register {
  background-color: #4d69fa !important;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-button {
  width: 100%;
  margin-top: 20px;
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


.el-button--warning {
  color: #000 !important;
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

.el-card__body {
  border-top: none !important;
}
</style>
