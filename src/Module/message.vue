<template>
  <div>
    <el-row :gutter="24" :style="'height:' + this.Height +'px'">

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">
        <el-row :gutter="24">
          <el-col :span="8" style="float: left">
            <h1 class="page-header-title">Mesaj Yönetimi</h1>
          </el-col>
          <el-col :span="14" style="display: flex;float: right;align-content: center;justify-content: flex-end;">
            <el-button
                type="primary"
                native-type="submit"
                block
                size="mini"
                @click="reload"
            >
              <i class="el-icon-refresh"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-col>


      <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" class="mb-10">
        <el-card :body-style="{ padding: '20px', width:'100%'}"
                 style="display: flex; justify-content: center; width: 100%">
          <el-form
              label-position="top"
              label-width="150px"
              :model="FormMessage"
              ref="ruleForm"
              size="mini"
              v-loading="formLoading"
              @submit.native.prevent="submitForm('ruleForm')"
          >

            <el-form-item label="Cihaz Seçiniz"
                          :rules="[{required: true, message: 'Cihaz Seçiniz.', trigger: 'blur'}]" prop="device">
              <el-select v-model="FormMessage.device" placeholder="Cihaz Seçiniz" style="width: 100%" size="mini">
                <el-option
                    v-for="item in devices"
                    :key="item.id"
                    :label="item.phone"
                    :value="item.phone">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Resim" size="mini">
              <el-upload
                  class="avatar-uploader"
                  :action="$store.getters.ApiUrl+'upload'"
                  ref="file"
                  accept=" .jpg, .jpeg, .png"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="{
                    'Authorization': 'barer '+$store.getters.Token,
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Cache-Control': 'no-cache'
                  }"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="Mesajınız" :rules="[{required: true, message: 'Mesajınızı giriniz', trigger: 'blur'}]"
                          prop="message" size="mini">
              <el-input ref="message" type="textarea" maxlength="900" :rows="10" v-model="FormMessage.message"
                        show-word-limit></el-input>
            </el-form-item>


            <el-button size="mini" @click="setValue('[NameSurname]')" native-type="button" v-if="directoryStatus">
              Ad Soyad
            </el-button>


            <!--div class="el-divider el-divider--horizontal">
              <div class="el-divider__text is-left">Değişkenler</div>
            </div>
            <el-button-group>
              <el-button type="default" size="mini">Ad Soyad</el-button>
              <el-button type="default" size="mini">Telefon</el-button>
            </el-button-group-->

            <br>
            <div class="el-divider el-divider--horizontal">
              <div class="el-divider__text is-left">Mesaj Kurgusu</div>
            </div>


            <el-form-item label="Rehberden Gönder">
              <el-switch
                  size="mini"
                  v-model="directoryStatus"
                  active-color="#4caf4f"
                  inactive-color="#e91e63">
              </el-switch>
            </el-form-item>


            <div class="block" v-if="directoryStatus==true">
              <el-cascader
                  size="mini"
                  placeholder="Kişi Seçiniz"
                  style="width: 100%"
                  collapse-tags
                  :options="options"
                  :props="{multiple: true}"
                  v-model="FormMessage.directory"
                  clearable></el-cascader>
            </div>

            <el-form-item label="Telefon No" prop="phone" v-if="directoryStatus==false"
                          :rules="[{required: true, message: 'Telefon no giriniz', trigger: 'blur'},{min: 12, max: 12, message: '12 haneli giriniz', trigger: 'blur'}]"
                          size="mini">
              <el-input v-model="FormMessage.phone" maxlength="12" show-word-limit></el-input>
            </el-form-item>

            <el-button
                class="save-button"
                type="primary"
                native-type="submit"
                block
                size="mini"
            >Kaydet
            </el-button>
          </el-form>


        </el-card>
        <!--img src="../assets/message.png" alt="message"
             style="position:absolute; bottom: -600px; left: calc(15% - 150px);width: 300px;"-->
      </el-col>


      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" style="padding: 0 10px;">

        <el-col class="p-0" :xs="24" :sm="6" :md="6" :lg="6" :xl="6" style="padding-right: 0;">
          <div class="m-widget mb-2 border-0 ins1" style="border-radius: 3px 0 0 3px;">
            <i class='bx bx-wallet'></i>
            <div class="m-icerik">
              <h4>{{ credit }}</h4>
              <h5>Toplam Kredi</h5>
            </div>
          </div>
        </el-col>

        <el-col class="p-0" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="m-widget mb-2 border-0 ins2">
            <i class='bx bx-money-withdraw'></i>
            <div class="m-icerik">
              <h4>{{ totalItem }}</h4>
              <h5>Harcanan Kredi</h5>
            </div>
          </div>
        </el-col>

        <el-col class="p-0" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="m-widget mb-2 border-0 ins3">
            <i class='bx bx-user'></i>
            <div class="m-icerik">
              <h4>{{ (directory ? directory.length : '0') }}</h4>
              <h5>Toplam Kişi</h5>
            </div>
          </div>
        </el-col>

        <el-col class="p-0" :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="m-widget mb-2 border-0 ins4" style="border-radius: 0 3px 3px 0;">
            <i class='bx bxs-devices'></i>
            <div class="m-icerik">
              <h4>{{ (devices ? devices.length : '0') }}</h4>
              <h5>Cihaz Sayısı</h5>
            </div>
          </div>
        </el-col>

        <div style="margin-top: 60px;">
          <el-table class="TableSmall" :data="messages" v-loading="listLoading">
            <el-table-column prop="sectionHeader" width="60">
              <template slot-scope="scope">
                <el-tag type="info"
                        style="background-color: #2b314a;border-color: #2b314a;color: #f8f8f8;width: 35px; text-align: center;">
                  {{ scope.row.name[0] }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Oluşturma Tarihi" prop="sectionHeader">
              <template slot-scope="scope">
                {{ Dates(scope.row.created) }}
              </template>
            </el-table-column>
            <el-table-column label="Cihaz" prop="device"></el-table-column>
            <el-table-column label="Adı Soyadı" prop="name"></el-table-column>
            <el-table-column label="Telefon" prop="phone"></el-table-column>
            <el-table-column label="Mesaj" prop="message">
              <template slot-scope="scope">
                <el-popover
                    title="Gönderilen Mesaj"
                    placement="top-start"
                    trigger="hover"
                    width="500"
                    :content="scope.row.message">
                  <p slot="reference" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                    {{ scope.row.message }}</p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Gönderim Tarihi" prop="sendDate"></el-table-column>
            <el-table-column prop="status" width="60">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="Gönderiliyor" placement="top">
                  <img v-if="scope.row.status == 0" src="../assets/ACK_PENDING.svg" alt="check" width="25px">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Gönderildi" placement="top">
                  <img v-if="scope.row.status == 1" src="../assets/ACK_SERVER.svg" alt="check" width="25px">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="İletildi" placement="top">
                  <img v-if="scope.row.status == 2" src="../assets/ACK_DEVICE.svg" alt="check" width="25px">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Okundu" placement="top">
                  <img v-if="scope.row.status == 3" src="../assets/ACK_READ.svg" alt="check" width="25px">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Hata" placement="top">
                  <img v-if="scope.row.status == 4" src="../assets/ACK_ERROR.svg" alt="check" width="25px">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Kayıtlı Değil" placement="top">
                  <img v-if="scope.row.status == 5" src="../assets/ACK_ERROR.svg" alt="check" width="25px">
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="bottomTotal">Toplam: {{ totalItem }} Mesaj</div>
    </el-col>
    <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17" class="pagination">
      <el-pagination
          v-if="total>1"
          style="position: relative; bottom: 0"
          background
          @size-change="page"
          @current-change="page"
          layout="prev, pager, next"
          :page-count="total"
          :current-page.sync="currentPage"
      >
      </el-pagination>
    </el-col>

  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      phone: '',
      credit: 0,
      devices: [],
      directoryData: [],
      formLoading: false,
      LoadingStatus: false,
      FormMessage: {
        phone: '',
        message: '',
        media: null,
        directory: [],
      },
      messages: [],
      directory: null,
      directoryStatus: false,
      options: [],
      listLoading: true,
      total: 0,
      totalItem: 0,
      currentPage: 1,
      Height: 300,
      imageUrl: '',
      /*testData: {
        device: '908508402109',
        message: [{phone: '905388847849', message: 'test'},{phone: '908508402109', message: 'test1'}]
      }*/
    }
  },
  created() {
    this.Query();
    this.DeviceList();
    this.groupLists();
    this.DirectorList();
    this.directoryAll();
    this.directoryList();
    this.Height = window.innerHeight - 600;
  },
  methods: {
    reload() {
      this.listLoading = true;
      this.Query();
    },
    Query(page = 1) {
      this.$store.dispatch("Query", {method: "get", url: "message/" + page}).then((response) => {
        this.credit = response.data.credit;
        this.listLoading = false;
        this.messages = response.data.data;
        this.total = response.data.totalPage
        this.totalItem = response.data.totalItem
        this.currentPage = response.data.currentPage
      });
    },
    test() {
      this.$socket.client.emit('device', {token: this.$store.getters.Token})
    },
    DeviceList() {
      this.$store.dispatch("Query", {method: "get", url: "device"}).then((response) => {
        this.devices = response.data;
      });
    },
    directoryAll() {
      this.$store.dispatch("Query", {method: "get", url: "directory/all"}).then((response) => {
        this.directory = response.data;
      });
    },
    directoryList() {
      this.$store.dispatch("Query", {method: "get", url: "directory/list"}).then((response) => {
        this.options = response.data;
      });
    },
    //Gönderilen Mesajlar
    messageList() {
      this.$socket.client.emit('getMessage', {token: this.$store.getters.Token})
    },
    groupLists() {
      this.$socket.client.emit('groupList', {token: this.$store.getters.Token})
    },
    ChatList() {
      //this.$socket.client.emit('device', {token: this.$store.getters.Token})
      this.$socket.client.emit('getContacts', {phone: this.phone})
      //this.$socket.client.emit('getChats', {phone: "908508402109"})
    },
    DirectorList(id = null) {
      if (!id) id = 'all';
      this.$socket.client.emit('directorList', {token: this.$store.getters.Token, id: id})
    },

    submitForm(formName) {
      if (this.crediCalculation()) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formLoading = true;
            this.$store.dispatch("Query", {method: "post", url: "message", data: this.FormMessage}).then((response) => {
              this.formLoading = false;
              if (response.status === 'success') {
                this.FormMessage.message = '';
                this.FormMessage.media = null;
                this.FormMessage.phone = '';
                this.FormMessage.device = '';
                this.imageUrl = '';
                this.Query();
                this.$message.success("Kayıt Başarılı.");
                if (this.FormMessage.directory) this.credit = (this.credit - this.FormMessage.directory.length);
                if (!this.FormMessage.directory) this.credit = this.credit - 1;
                console.log(this.credit)
              } else {
                console.log(response)
                if (response.message) {
                  if (response.message.device) this.$message.error(response.message.device)
                  if (response.message.message) this.$message.error(response.message.message)
                  if (response.message.directory) this.$message.error(response.message.directory)
                  if (response.message.phone) this.$message.error(response.message.phone)
                  if (response.message.credit) this.$message.error(response.message.credit)
                }
              }
            });
          } else {
            return false;
          }
        });
      } else {
        this.$message.error("Krediniz yeterli değildir.");
      }
    },

    status(status, type = false) {
      if (type == false) {
        if (status == 0) return 'Gönderiliyor';
        if (status == 1) return 'Gönderildi';
        if (status == 2) return 'İletildi';
        if (status == 3) return 'Okundu';
        if (status == 4) return 'Hata';
        if (status == 5) return 'Kayıtlı Değil';
      } else {
        if (status == 0) return 'primary';
        if (status == 1) return 'warning';
        if (status == 2) return 'success';
        if (status == 3) return 'success';
        if (status == 4) return 'danger';
        if (status == 5) return 'warning';
      }
    },

    Dates(date) {
      var formatdate = new Date(date);
      return formatdate.toLocaleDateString() + ' ' + formatdate.toLocaleString().substr(formatdate.toLocaleString().indexOf(":") - 2, 8);
    },

    page(page) {
      this.listLoading = true;
      this.Query(page)
    },
    crediCalculation() {
      if (this.credit < this.FormMessage.directory.length) {
        return false;
      } else {
        return true;
      }
    },


    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.FormMessage.media = file.name;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('2MB!');
      }
      return isLt2M;
    },
    setValue(value) {
      this.$refs.message.focus();
      this.FormMessage.message = this.FormMessage.message + ' ' + value;
    },
  },
  sockets: {
    getContacts(data) {
      this.tableData = data;
    },
    deviceList(data) {
      this.phone = data[0].phone;
      this.devices = data
    },
    groupList(data) {
      if (this.$store.getters.Token == data.token) {
        this.Groups = data.group;
        this.Groups.unshift({name: 'Tümü', _id: 'all', user_id: this.Groups[1].user_id})
      }
    },
    createGroup(data) {
      this.Groups.push(data);
    },
    directorList(data) {
      this.directoryData = data.directory
    },
    createDirectory(data) {
      this.directoryStatus = false;
      this.FormMessage = {};
      this.directoryData.push(data);
    },
    directorGroup(data) {
      this.directoryData.push(data);
    },
    message_ack(data) {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].refId == data.refId) {
          this.messages[i].status = data.status;
          this.messages[i].name = data.name;
        }
      }
    },
    message_ack_refId(data) {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].id == data.id) {
          this.messages[i].refId = data.refId;
          this.messages[i].sendDate = data.sendDate;
        }
      }
    },

  },
}
</script>

<style scoped>
.el-button.el-button--mini {
  padding: 5px 8px;
}

.el-button--mini, .el-button--small {
  font-size: 10px !important;
}

.save-button {
  width: 100%;
  height: 35px;
  margin-top: 30px;
}

</style>
