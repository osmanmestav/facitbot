<template>
  <div class="login">
    <el-row style="width: 100%">
      <el-col :xl="{span: 5}" :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}">
        <el-card>
          <div class="text-center my-5">
            <a class="text-decoration-none  fw-bold display-2 text-dark" href="/">
              <img src="../../assets/logo2.svg" alt="logo" width="180">
            </a>
          </div>
          <div class="text-center h1 fw-bold mt-5">Kimliğinizi doğrulayın!</div>
          <div class="text-center h3 fw-bold mt-5" v-if="sendType=='phone'">Doğrulama kodunuz telefonununza
            gönderilmiştir.
          </div>
          <div class="text-center h3 fw-bold mt-5" v-if="sendType=='email'">Doğrulama kodunuz email adresinize
            gönderilmiştir.
          </div>
          <br>
          <br>


          <el-form
              class="login-form"
              :model="model"
              :rules="rules"
              ref="form"
              @submit.native.prevent="login"
          >
            <el-row>
              <el-col class="number-col">
                <el-input
                    v-model="verifyData.code1"
                    type="text"
                    prefix-icon="fas fa-lock"
                    maxlength="1"
                    autofocus
                    ref="code1"
                    @focus="selec()"
                    @input="handleActivationInput(2)"
                ></el-input>
              </el-col>
              <el-col class="number-col">
                <el-input
                    v-model="verifyData.code2"
                    type="text"
                    prefix-icon="fas fa-lock"
                    maxlength="1"
                    autofocus
                    ref="code2"
                    @input="handleActivationInput(3)"
                ></el-input>
              </el-col>
              <el-col class="number-col">
                <el-input
                    v-model="verifyData.code3"
                    type="text"
                    prefix-icon="fas fa-lock"
                    maxlength="1"
                    autofocus
                    ref="code3"
                    @input="handleActivationInput(4)"
                ></el-input>
              </el-col>
              <el-col class="number-col">
                <el-input
                    v-model="verifyData.code4"
                    type="text"
                    prefix-icon="fas fa-lock"
                    maxlength="1"
                    autofocus
                    ref="code4"
                    @input="verifyCode()"
                ></el-input>
                -
              </el-col>
            </el-row>

          </el-form>


          <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="button"
              block
              @click="verifyCode"
          >
            <i class="el-icon-s-promotion"></i> Gönder
          </el-button>


          <el-button
              :loading="loading"
              class="login-button"
              type="warning"
              native-type="button"
              block
              @click="Login()"
          >
            <i class="el-icon-unlock"></i> FARKLI HESAPLA GİRİŞ YAP
          </el-button>

          <div class="mt-3 text-center text-muted" style="font-size: 12px; margin-top: 20px;">OR</div>


          <el-dropdown trigger="click" class="w-100 text-center"
                       style="margin-top: 20px; color: #4d69f9; cursor: pointer" @command="verificationGenerate">
            <span class="el-dropdown-link">
              Kodu almak için başka bir yöntem kullanın <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="phone">Kodu tekrar gönder</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="email">Kodu e-posta ile gönder</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


        </el-card>


      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name: "verification",
  data() {
    return {
      sendType: null,
      model: {
        email: "",
        password: ""
      },
      verifyData: {
        code1: '',
        code2: '',
        code3: '',
        code4: '',
      },
      loading: false,
      rules: {
        email: [
          {
            required: true,
            message: "Lütfen email giriniz",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Username length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: "Lütfen şifre giriniz", trigger: "blur"},
          {
            message: "Password length should be at least 5 characters",
            trigger: "blur"
          }
        ]
      },
    };
  },
  methods: {
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async verifyCode() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (this.model.email !== '' && this.model.code !== '') {

        this.$store.dispatch("Query", {
          method: "post", url: "auth/verification",
          data: {
            email: localStorage.getItem('email'),
            verifyCode: this.verifyData.code1 + this.verifyData.code2 + this.verifyData.code3 + this.verifyData.code4
          }
        }).then(response => {
          if (response.status == 'success') {
            console.log(response)
            this.$message.success("Verification successfull");
            localStorage.setItem('W_Token', response.data.token);
            localStorage.setItem('Account_id', response.data.id);
            this.$socket.client.io.opts.query.token = response.data.token
            this.$socket.client.connect();
            this.$store.dispatch("sessions", {
              Token: response.data.token,
              Account_id: response.data.id
            })
            this.$router.push("/");
          } else {
            this.$message.error(response.message);
          }
        });


      } else {
        this.$message.error("Please enter the login code");
      }
    },
    handleActivationInput(id) {
      this.$refs[`code${id}`].focus();
      this.$refs[`code${id}`].select();
    },
    verificationGenerate(command) {
      console.log(command)
      if (command === 'email') {
        if (this.model.email) {
          this.$store.dispatch("Query", {
            method: "post", url: "auth/verificationgenerate",
            data: {
              email: this.model.email,
              phone: false,
            }
          }).then(response => {
            if (response.status == 'success') {
              console.log(response)
              this.$message.success("Verification generate successfull");
            } else {
              this.$message.error(response.message);
            }
          });
        }
      }
      if (command === 'phone') {
        if (this.model.email) {
          this.$store.dispatch("Query", {
            method: "post", url: "auth/verificationgenerate",
            data: {
              email: this.model.email,
              phone: true,
            }
          }).then(response => {
            if (response.status == 'success') {
              console.log(response)
              this.$message.success("Verification generate successfull");
            } else {
              this.$message.error(response.message);
            }
          });
        }
      }


    },
    Login() {
      localStorage.removeItem('email');
      this.$router.push('/login');
    },
    selec() {
      console.log(222)
      this.$refs[`code1`].select()
    }
  },
  created() {
    if (!localStorage.getItem('email')) {
      this.$router.push('/login');
    } else {
      this.model.email = localStorage.getItem('email');
      this.sendType = localStorage.getItem('sendType');

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

.number-col {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-wrap: nowrap;
}


</style>
