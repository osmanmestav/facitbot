<template>
  <el-dialog
      title="Yeni Grup Ekle"
      :visible.sync="Modal"
      style="margin-top: 10%; border-radius: 20px !important;"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="40%"
      append-to-body
  >
    <el-form
        label-position="top"
        label-width="150px"
        :model="FormGroup"
        ref="ruleForm"
        :v-loading="LoadingStatus"
        @submit.native.prevent="submitGroupForm('ruleForm')"
    >
      <el-form-item label="Grup Adı" prop="name"
                    :rules="[{required: true, message: 'Grup adı giriniz', trigger: 'blur'}]">
        <el-input v-model="FormGroup.name"></el-input>
      </el-form-item>
      <el-form-item label="Açıklama">
        <el-input type="textarea" v-model="FormGroup.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()" size="small">İptal</el-button>
      <el-button type="success" size="small" @click="submitGroupForm('ruleForm')">Kaydet</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "newGroupModal",
  props: ['Modal'],
  data() {
    return {
      LoadingStatus: true,
      FormGroup: {},
    }
  },
  methods: {
    handleClose() {
      this.FormGroup = {};
      this.$emit('Modal', {type: 'group'})
    },
    submitGroupForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.LoadingStatus = true;
          this.$store.dispatch("Query", {method: "post", url: "group", data: this.FormGroup}).then((response) => {
            if (response.status === 'success') {
              this.handleClose();
              this.$message.success("Kayıt Başarılı.");
            } else {
              this.$message.error(response.message);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    Modal: function (data) {
      console.log(data)
      this.FormGroup = {};
    }
  }
}
</script>

<style scoped>

</style>
