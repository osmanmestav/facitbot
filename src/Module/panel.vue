<template>
  <div>

    <el-col class="text-center panel p-2" :xs="24" :sm="8" :md="8" :lg="8" :xl="8"
            style="padding: 10px; padding-top: 0;">
      <el-card>
        <h3>Hoş Geldin <br><b style="text-transform:capitalize">{{ account.name + ' ' + account.surname }}</b></h3>
        <br>
        <br>
        <br>
        <img src="../assets/welcome.png" alt="welcome" width="400">
      </el-card>
    </el-col>
    <el-col class="p-0" :xs="24" :sm="4" :md="4" :lg="4" :xl="4" style="padding-right: 0;">
      <div class="m-widget mb-2 border-0 ins1" style="border-radius: 3px 0 0 3px;">
        <i class='bx bx-wallet'></i>
        <div class="m-icerik">
          <h4>{{ credit }}</h4>
          <h5>Toplam Kredi</h5>
        </div>
      </div>
    </el-col>

    <el-col class="p-0" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
      <div class="m-widget mb-2 border-0 ins2">
        <i class='bx bx-money-withdraw'></i>
        <div class="m-icerik">
          <h4>{{ totalCredit }}</h4>
          <h5>Harcanan Kredi</h5>
        </div>
      </div>
    </el-col>

    <el-col class="p-0" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
      <div class="m-widget mb-2 border-0 ins3">
        <i class='bx bx-user'></i>
        <div class="m-icerik">
          <h4>{{ totalDirectory }}</h4>
          <h5>Toplam Kişi</h5>
        </div>
      </div>
    </el-col>

    <el-col class="p-0" :xs="24" :sm="4" :md="4" :lg="4" :xl="4">
      <div class="m-widget mb-2 border-0 ins4" style="border-radius: 0 3px 3px 0;">
        <i class='bx bxs-devices'></i>
        <div class="m-icerik">
          <h4>{{ totalDevice }}</h4>
          <h5>Cihaz Sayısı</h5>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>


export default {

  name: "panel",
  data() {
    return {
      credit: 0,
      totalCredit: 0,
      totalDirectory: 0,
      totalDevice: 0,
      account: null,
    }
  },
  methods: {
    Query() {
      this.$store.dispatch("Query", {method: "get", url: "dashboard"}).then((response) => {
        if (response.status === 'success') {
          this.credit = response.credit
          this.totalCredit = response.sendCount
          this.totalDirectory = response.directoryCount
          this.totalDevice = response.deviceCount
        }
      });
    },
    test() {
      this.$socket.client.disconnect();
      this.$socket.client.io.opts.query.token = this.$store.state.Token
      this.$socket.client.connect();
      console.log(this.$socket.client)
    },
    test1() {
      this.$socket.client.disconnect();
    },
  },
  created() {
    //this.$socket.client.emit('user', {User_id: "1"})
    this.$socket.client.emit('new_user', "gönderdim");
    this.Query();
    this.account = JSON.parse(localStorage.getItem('account'));
  }
}
</script>

<style scoped></style>
