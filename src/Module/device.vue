<template>
  <div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">

        <el-row>
          <el-col :span="8" style="float: left">
            <h1 class="page-header-title">Cihaz Yönetimi</h1>
          </el-col>

          <el-col :span="14" style="display: flex;float: right;align-content: center;justify-content: flex-end;">
            <el-button type="warning" size="mini" @click="outerVisible = true">
              <i class="el-icon-plus"></i> Cihaz Ekle
            </el-button>
          </el-col>
        </el-row>
      </el-col>


      <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4" v-for="(device, index) in devices" :key="index"
              style="padding: 10px">
        <el-card :body-style="{ padding: '10px'}">
          <div style="height: 220px"><img :src="device.image" class="image"></div>
          <br>
          <br>
          <br>
          <br>
          <h5 class="card-title" style="text-align: center">{{ device.phone }}</h5>
          <p class="text-muted truncate-line-2">{{ device.description }}</p>


          <el-row :gutter="24">
            <el-col :span="12">
              <div class="grid-content bg-purple battery" style="margin-left: 10px" v-if="device.battery">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em"
                     class="svg-icon--material svg-icon" data-name="Material--Battery20"
                     style="font-size: calc(1vh + 1vw);" @click="battery(device.phone,device.Status)">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path d="M7 17v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17H7z"></path>
                  <path d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h10V5.33z"
                        fill-opacity="0.3"></path>
                </svg>
                <time class="time">%{{ device.battery }}</time>
              </div>
              <div class="grid-content bg-purple battery" style="margin-left: 10px" v-if="!device.battery"
                   @click="battery(device.id,device.status)">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" width="1em"
                     class="svg-icon--material svg-icon" data-name="Material--BatteryAlert"
                     style="font-size: calc(1vh + 1vw);">
                  <path d="M0 0h24v24H0V0z" fill="none"></path>
                  <path
                      d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"></path>
                </svg>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple" style="float: right; margin-right: 20px">
                <el-button type="info" size="mini" icon="el-icon-delete" circle
                           @click="deleteDevice(device)"></el-button>
              </div>
            </el-col>
          </el-row>


        </el-card>
      </el-col>


    </el-row>


    <div>
      <el-dialog
          title="Yeni Cihaz Ekle"
          :visible.sync="outerVisible"
          style="border-radius: 20px !important;"
          width="40%"
          :close-on-click-modal="false"
          :show-close="false"
          append-to-body
      >

        <el-steps :active="active" finish-status="success">
          <el-step title="Cihaz Bilgileri" icon="el-icon-edit"></el-step>
          <el-step title="Qr" icon="el-icon-loading"></el-step>
          <el-step title="Sonuç" icon="el-icon-circle-check"></el-step>
        </el-steps>
        <br>
        <br>

        <el-form label-position="top" label-width="150px" :model="Form" ref="ruleForm" v-if="active==1"
                 @submit.native.prevent="submitForm('ruleForm')"
                 :v-loading="LoadingStatus">
          <el-form-item
              label="Telefon"
              prop="phone"
              :rules="[{required: true, message: 'Telefon giriniz', trigger: 'blur'},{min: 12, max: 12, message: '12 haneli giriniz', trigger: 'blur'}]">
            <div data-v-09a5dfb0="" class="el-input">
              <the-mask mask="## ### ### ## ##" v-model="Form.phone" :masked="false" class="el-input__inner"></the-mask>
            </div>


          </el-form-item>
          <el-form-item label="Açıklama">
            <el-input type="textarea" v-model="Form.description"></el-input>
          </el-form-item>
        </el-form>

        <el-row class="text-center" v-if="active==2">
          <img :src="qr" alt="qr" width="250px"
               style="border-radius: 20px; box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);">
          <br>
          <h5>Lütfen qr kodu okutunuz.</h5>
        </el-row>

        <el-row class="text-center" v-if="active==3">
          <h2>Başarılı</h2>
          <img :src="require('../assets/success.jpg')" alt="qr" width="250px"
               style="border-radius: 20px; box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);">
          <br>
          <br>
          <br>
          <el-button @click="outerVisible = false,active=1" size="small">Kapat</el-button>
        </el-row>


        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false" size="mini" v-if="active==1">İptal</el-button>
          <el-button type="success" size="mini" @click="submitForm('ruleForm')" v-if="active==1">Kaydet
          </el-button>
        </div>
      </el-dialog>
    </div>

    <img src="../assets/device.png" alt="device"
         style="position:absolute; bottom: 0; left: calc(50% - 200px);width: 400px;">
  </div>

</template>

<script>
export default {
  name: "device",
  data() {
    return {
      Form: {
        phone: '',
        description: '',
      },
      labelPosition: 'top',

      devices: [],
      outerVisible: false,
      active: 1,
      qr: require('../assets/loading.jpg'),
      LoadingStatus: false,
    }
  },
  created() {
    this.Query();
    this.startDevice();
    //this.DeviceList();
    this.qr = require('../assets/loading.jpg');
    this.devices = [];
    this.Form = {};
    this.active = 1;
  },
  methods: {
    Query() {
      this.$store.dispatch("Query", {method: "get", url: "device"}).then((response) => {
        this.startDevice()
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].status == 0) {
            response.data[i].image = require('../assets/loading.jpg');
          } else {
            this.battery(response.data[i].id, response.data[i].status);
            response.data[i].image = require('../assets/success.jpg');
          }
          response.data[i].battery = 0;
        }
        this.devices = response.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.LoadingStatus = true;
          this.$store.dispatch("Query", {method: "post", url: "device", data: this.Form}).then((response) => {
            if (response.status === 'success') {
              this.Query();
              this.active = 2;
              this.$message.success("Kayıt Başarılı.");
              this.startDevice();
            } else {
              this.$message.error(response.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    startDevice() {
      this.$socket.client.emit('startDevice', {token: this.$store.getters.Token})
    },
    battery(id, status) {
      if (status == 1) {
        this.$store.dispatch("Query", {method: "post", url: "device/battery", data: {id: id}}).then((response) => {
          if (response.status === 'success') {
            for (let i = 0; i < this.devices.length; i++) {
              if (this.devices[i].id == id) this.devices[i].battery = response.data.battery;
            }
          } else {
            this.$message.error(response.message);
          }
        });
      }
    },
    deleteDevice(device) {
      this.$store.dispatch("Query", {method: "delete", url: "device", data: {id: device.id}}).then((response) => {
        if (response.status === 'success') {
          this.Query();
          this.$message.success("İşlem Başarılı.");
          this.startDevice();
        } else {
          this.$message.error(response.message);
        }
      });
    }
  },
  sockets: {
    qr(data) {
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].phone == data.phone) {
          this.devices[i].image = data.src;
        }
      }
      this.qr = data.src;
      this.$forceUpdate();
    },
    ready(data) {
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].phone == data.phone) {
          this.devices[i].image = require('../assets/success.jpg');
          this.$message.success("Kurulumuz başarıyla gerçekleşti");
        }
      }
      this.active = 3;
      this.$forceUpdate();
    },
    battery(data) {
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].phone == data.phone) this.devices[i].battery = data.battery.battery;
      }
      this.$forceUpdate();
    },
    disconnected(data) {
      for (let i = 0; i < this.devices.length; i++) {
        if (this.devices[i].phone == data.phone) {
          this.$message.error(data.phone + " nolu telefon çıkış işlemi gerçekleştirilmiştir.");
        }
      }
      this.$forceUpdate();
    },
  },

}
</script>

<style scoped>

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  border-radius: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  border-radius: 2rem;
  box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
}

.el-card.is-always-shadow:before {
  -webkit-backdrop-filter: blur(.5rem);
  backdrop-filter: blur(0.5rem
  );
  will-change: backdrop-filter;
  z-index: -1;
  top: 1rem;
  right: 1rem;
  left: 1rem;
  position: absolute;
  height: 100%;
  border-radius: inherit;
  box-shadow: none;
  content: "";
  transition: all .2s ease-in-out;
}

.el-card.is-always-shadow:after {
  position: absolute;
  height: 100%;
  border-radius: inherit;
  box-shadow: none;
  content: "";
  transition: all .2s ease-in-out;
}

.card-title {
  font-weight: 700;
  font-size: 1rem;
}

.battery {
  cursor: pointer;
}

.el-dialog {
  margin-top: 15% !important;
  border-radius: 20px !important;
}

.el-card__body {
  width: 100%;
}
</style>
