<template>
  <div>
    <el-dialog
        title="Rehber Çek"
        :visible.sync="Modal"
        style="margin-top: 10%; border-radius: 20px !important;"
        width="40%"
        append-to-body
        :close-on-click-modal="false"
        :before-close="handleClose"
    >
      <div v-loading="contactStatus">
        <el-select v-model="multiDirectory.group_id" placeholder="Grup Seçiniz" size="mini"
                   style="max-width: 250px; margin-right: 35px; width: 100%">
          <el-option
              v-for="item in Groups"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-if="item.id!='all'"
          >
          </el-option>
        </el-select>
        <el-button type="success" size="mini" @click="multiDirectorySave">Kaydet</el-button>

        <el-table class="TableSmall" :data="contactData" @selection-change="handleSelectionChange"
                  style="margin-top: 20px;">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column prop="sectionHeader">
            <template slot-scope="scope">
              <el-tag type="danger">{{ scope.row.sectionHeader }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Adı Soyadı" prop="name"></el-table-column>
          <el-table-column label="Telefon" prop="number"></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose()" size="mini">İptal</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "directorDeviceModal",
  props: ['Modal', 'Groups', 'device'],
  data() {
    return {
      contactStatus: true,
      contactData: [],
      multiDirectory: {
        group_id: '',
        directorys: [],
      },
    }
  },
  methods: {
    handleClose(status = false) {
      this.$emit('Modal', {type: 'device', status: status})
    },
    getContacts() {
      if (this.device) {
        this.contactStatus = true;
        this.$store.dispatch("Query", {
          method: "post",
          url: "directory/getContacts",
          data: {device: this.device}
        }).then((response) => {
          if (response.status == 'success') {
            this.contactStatus = false;
            this.contactData = response.data
          } else {
            this.$message.error("Lütfen daha sonra tekrar deneyiniz.");
          }
        });
      } else {
        this.$message.error("Lütfen cihaz seçiniz.");
      }
    },
    handleSelectionChange(val) {
      this.multiDirectory.directorys = val
    },
    multiDirectorySave() {
      if (this.multiDirectory.group_id) {
        this.$store.dispatch("Query", {
          method: "post",
          url: "directory/all",
          data: this.multiDirectory
        }).then((response) => {
          if (response.status == 'success') {
            this.handleClose(true);
            this.contactStatus = false;
            this.$message.success("Kayıt Başarılı.");
            this.multiDirectory = {
              group_id: '',
              directorys: [],
            };
          } else {
            this.$message.error("Lütfen daha sonra tekrar deneyiniz.");
          }
        });
      } else {
        this.$message.error("Lütfen Grup seçiniz.");
      }
    },
  },
  watch: {
    Modal: function (data) {
      console.log(data)
      if (data === true) this.getContacts();
    }

  }
}
</script>

<style scoped>

</style>
