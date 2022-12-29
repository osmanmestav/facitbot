<template>
  <div class="login">
    <el-row style="width: 100%">
      <el-col :xl="{span: 5}" :lg="{span: 6}" :md="{span: 12}" :sm="{span: 12}">

        <el-card>
          <div class="text-center my-5">
            <a class="text-decoration-none  fw-bold display-2 text-dark" href="/">
              <!--svg width="200" height="79.25754060324826" viewBox="0 0 2155 854" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M985.058 284.2C953.411 284.2 937.587 301.4 937.587 335.8V355H1025.92V415H939.991V673H864.879V415H812V355H864.879V334.6C864.879 300.2 874.894 273.2 894.924 253.6C914.953 233.6 943.195 223.6 979.65 223.6C1008.49 223.6 1031.13 229.4 1047.55 241L1026.52 297.4C1013.7 288.6 999.88 284.2 985.058 284.2Z"
                    fill="#000"></path>
                <path
                    d="M1193.19 349C1240.46 349 1276.52 360.4 1301.35 383.2C1326.59 405.6 1339.21 439.6 1339.21 485.2V673H1268.3V634C1259.09 648 1245.87 658.8 1228.65 666.4C1211.82 673.6 1191.39 677.2 1167.35 677.2C1143.32 677.2 1122.29 673.2 1104.26 665.2C1086.23 656.8 1072.21 645.4 1062.2 631C1052.58 616.2 1047.78 599.6 1047.78 581.2C1047.78 552.4 1058.39 529.4 1079.62 512.2C1101.26 494.6 1135.11 485.8 1181.18 485.8H1264.1V481C1264.1 458.6 1257.29 441.4 1243.67 429.4C1230.45 417.4 1210.62 411.4 1184.18 411.4C1166.15 411.4 1148.33 414.2 1130.7 419.8C1113.47 425.4 1098.85 433.2 1086.83 443.2L1057.39 388.6C1074.22 375.8 1094.45 366 1118.08 359.2C1141.72 352.4 1166.75 349 1193.19 349ZM1182.98 622.6C1201.81 622.6 1218.43 618.4 1232.85 610C1247.67 601.2 1258.09 588.8 1264.1 572.8V535.6H1186.58C1143.32 535.6 1121.69 549.8 1121.69 578.2C1121.69 591.8 1127.09 602.6 1137.91 610.6C1148.73 618.6 1163.75 622.6 1182.98 622.6Z"
                    fill="#000"></path>
                <path
                    d="M1585.76 677.2C1552.51 677.2 1522.67 670.2 1496.23 656.2C1469.79 642.2 1449.16 622.8 1434.34 598C1419.51 572.8 1412.1 544.4 1412.1 512.8C1412.1 481.2 1419.51 453 1434.34 428.2C1449.16 403.4 1469.59 384 1495.63 370C1522.07 356 1552.11 349 1585.76 349C1617.41 349 1645.05 355.4 1668.68 368.2C1692.72 381 1710.75 399.4 1722.76 423.4L1665.08 457C1655.87 442.2 1644.25 431.2 1630.23 424C1616.61 416.4 1601.58 412.6 1585.16 412.6C1557.12 412.6 1533.88 421.8 1515.46 440.2C1497.03 458.2 1487.81 482.4 1487.81 512.8C1487.81 543.2 1496.83 567.6 1514.86 586C1533.28 604 1556.72 613 1585.16 613C1601.58 613 1616.61 609.4 1630.23 602.2C1644.25 594.6 1655.87 583.4 1665.08 568.6L1722.76 602.2C1710.35 626.2 1692.12 644.8 1668.08 658C1644.45 670.8 1617.01 677.2 1585.76 677.2Z"
                    fill="#000"></path>
                <path
                    d="M1787.69 352.6H1862.81V673H1787.69V352.6ZM1825.55 299.8C1811.93 299.8 1800.51 295.6 1791.3 287.2C1782.09 278.4 1777.48 267.6 1777.48 254.8C1777.48 242 1782.09 231.4 1791.3 223C1800.51 214.2 1811.93 209.8 1825.55 209.8C1839.17 209.8 1850.59 214 1859.8 222.4C1869.02 230.4 1873.62 240.6 1873.62 253C1873.62 266.2 1869.02 277.4 1859.8 286.6C1850.99 295.4 1839.57 299.8 1825.55 299.8Z"
                    fill="#000"></path>
                <path
                    d="M2154.28 655.6C2145.47 662.8 2134.65 668.2 2121.83 671.8C2109.41 675.4 2096.19 677.2 2082.17 677.2C2046.92 677.2 2019.68 668 2000.45 649.6C1981.22 631.2 1971.61 604.4 1971.61 569.2V415H1918.73V355H1971.61V281.8H2046.72V355H2132.65V415H2046.72V567.4C2046.72 583 2050.52 595 2058.13 603.4C2065.75 611.4 2076.76 615.4 2091.18 615.4C2108.01 615.4 2122.03 611 2133.25 602.2L2154.28 655.6Z"
                    fill="#000"></path>
                <path d="M1824.4 200L1879.83 230.098V290.295L1824.4 320.393L1768.97 290.295V230.098L1824.4 200Z"
                      fill="#F35421"></path>
                <rect x="300" width="256" height="256" rx="64" fill="#008060"></rect>
                <circle cx="128" cy="726" r="128" fill="#4D69FA"></circle>
                <rect x="300" y="355" width="256" height="144" fill="#6C5DD3"></rect>
                <path d="M128 24L238.851 216H17.1488L128 24Z" fill="#FFCF52"></path>
                <path d="M128 307L238.851 367.197V487.59L128 547.787L17.1488 487.59V367.197L128 307Z"
                      fill="#F35421"></path>
              </svg-->
              <img src="../../assets/logo2.svg" alt="logo" width="180">
            </a>
          </div>
          <div class="text-center h1 fw-bold mt-5">Hoş Geldiniz,</div>
          <br>
          <div class="text-center h4 text-muted mb-5">Lütfen giriş yapınız!</div>
          <br>
          <br>


          <el-form
              class="login-form"
              :model="model"
              :rules="rules"
              ref="form"
              @submit.native.prevent="login"
          >
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
                  type="warning"
                  native-type="submit"
                  block
              >
                <i class="el-icon-unlock"></i> GİRİŞ YAP
              </el-button>
            </el-form-item>
          </el-form>

          <div class="mt-3 text-center text-muted" style="font-size: 12px">OR</div>
          <router-link
              :loading="loading"
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
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: ""
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
            message: "email length should be at least 5 characters",
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
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (this.model.email !== '' && this.model.password !== '') {
        this.$store.dispatch("Query", {method: "post", url: "auth/signin", data: this.model}).then(response => {
          if (response.status == 'success') {
            this.$message.success("Login successfull");
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('account', JSON.stringify(response.data));
            localStorage.setItem('sendType', response.sendType);
            this.$router.push("/verification");
          } else {
            Object.entries(response.message).forEach((value) => {
              this.$message.error(value[1])
            });
          }
        });
      } else {
        this.$message.error("Username or password is invalid");
      }
    },
  },
};
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
