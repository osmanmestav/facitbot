<template>
  <el-dialog
      :title="Baslik"
      :visible.sync="Modal"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      append-to-body>
    <el-form v-loading="lo" label-position="top" ref="Form" :model="Form" :rules="formError"
             @submit.native.prevent="Gonder">
      <el-row :gutter="20">

        <el-col :span="24">
          <el-form-item label="Grup" prop="group_id">
            <el-select v-model="Form.group_id" autocomplete="nope" clearable filterable placeholder="Grup Seçiniz"
                       class="w-100">
              <el-option
                  v-for="item in Groups"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-if="item.id!='all'"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="Kişi Adı Soyadı" prop="name">
            <el-input v-model="Form.name" autocomplete="nope" placeholder="Kişi Adı Soyadı"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="Telefon" prop="phone">
            <el-input v-model="Form.phone" placeholder="Telefon"
                      autocomplete="nope" maxlength="12" show-word-limit></el-input>
          </el-form-item>
        </el-col>


      </el-row>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button-group size="mini">
        <el-button type="success" size="mini" @click="Save()" :loading="lo">Kaydet</el-button>
      </el-button-group>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'New Directory Modal',
  props: ['Modal', 'FormData', 'groups'],
  data() {
    return {
      lo: false,
      Baslik: 'KİŞİ EKLE',
      Groups: null,
      Form: {
        id: null,
        name: null,
        phone: null,
        group_id: null,
      },
      formError: {
        name: [{required: true, message: 'Adı soyadı giriniz'}],
        phone: [{required: true, message: 'Telefon giriniz'}, {
          min: 12,
          max: 12,
          message: '12 haneli giriniz',
          trigger: 'blur'
        }],
        group_id: [{required: true, message: 'Grup giriniz'}],
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('Modal', {type: 'directory'})
    },
    Save() {
      this.$refs['Form'].validate((valid) => {
        if (valid) {
          this.lo = true
          var types = 'post'
          if (this.Form.id) types = 'put'
          this.$store.dispatch("Query", {method: types, url: 'directory', data: this.Form})
              .then(response => {
                this.lo = false;
                if (response.status === 'success') {
                  this.directoryStatus = false
                  this.$message.success("Kayıt Başarılı.");
                  this.handleClose();
                  this.$emit('Modal', {status: true, type: 'directory'})
                } else {
                  this.$message.error(response.message);
                }
              })
        }
      })
    },
    groupLists() {
      this.$store.dispatch("Query", {method: "get", url: "group"}).then((response) => {
        if (response.status === 'success') {
          this.Groups = response.data;
          this.groupLoadingStatus = false;
        } else {
          this.$message.error(response.message);
        }
      });
    },
  },
  created() {
    this.Groups = this.groups
    console.log(this.FormData)
    if (this.FormData === null) {

      this.Baslik = 'Kişi Ekle'
      this.Form = {
        id: null,
        name: null,
        phone: null,
        group_id: null,
      }
    } else {
      this.Form = this.FormData
      this.Baslik = 'Kişi Düzenle'
    }
    //this.groupLists();
  },
  watch: {}
}
</script>
<style scoped></style>
