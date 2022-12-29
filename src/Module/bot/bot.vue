<template>
  <el-row :style="'height:' + this.Height +'px'">


    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">

      <el-row>
        <el-col :span="8" style="float: left">
          <h1 class="page-header-title">Otomasyon</h1>
        </el-col>

        <el-col :span="14" style="display: flex;float: right;align-content: center;justify-content: flex-end;">
          <el-button type="warning" size="mini" @click="outerVisible=true">
            <i class="el-icon-plus"></i> Yeni Otomasyon Ekle
          </el-button>
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

    <!--el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="pr-10">
      <el-card>

      </el-card>
    </el-col-->

    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-table class="TableSmall" :data="botData" v-loading="botLoading">
        <el-table-column label="Adı" prop="name"></el-table-column>
        <el-table-column label="Açıklama" prop="description"></el-table-column>
        <el-table-column width="120">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" size="mini" icon="el-icon-view"
                         @click="$router.push('/bot/'+scope.row.id)"></el-button>
              <el-button type="primary" size="mini" icon="el-icon-edit"
                         @click="handleEdit(scope.$index, scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"
                         @click="handleDelete(scope.$index, scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-col>


    <el-dialog
        title="Yeni Bot Ekle"
        :visible.sync="outerVisible"
        style="margin-top: 10%; border-radius: 20px !important;"
        width="40%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
    >

      <el-form label-position="top" label-width="150px" :model="Form" ref="ruleForm" :v-loading="LoadingStatus">
        <el-form-item
            label="Adı"
            prop="name"
            :rules="[{required: true, message: 'Lütfen bot adı giriniz', trigger: 'blur'}]">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="Açıklama">
          <el-input type="textarea" v-model="Form.description"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false" size="mini">İptal</el-button>
        <el-button type="success" size="mini" @click="submitForm('ruleForm')">Kaydet</el-button>
      </div>
    </el-dialog>

    <img src="../../assets/bot.png" alt="device"
         style="position:absolute; bottom: 0; left: calc(50% - 150px);width: 300px;">
  </el-row>
</template>

<script>
export default {
  name: "directory",
  data() {
    return {
      botData: [],
      botLoading: true,
      Form: {},
      LoadingStatus: false,
      outerVisible: false,
      Height: 300,
    }
  },
  created() {
    this.Query();
    this.Height = window.innerHeight - 100;
  },
  methods: {
    Query() {
      this.botLoading = true;
      this.$store.dispatch("Query", {method: "get", url: "bot"}).then((response) => {
        console.log(response)
        this.botLoading = false;
        this.botData = response.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.LoadingStatus = true;
          this.$store.dispatch("Query", {method: "post", url: "bot", data: this.Form}).then((response) => {
            if (response.status === 'success') {
              this.Query();
              this.outerVisible = false;
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
    reload() {
      this.Query();
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

td.el-table_1_column_1.el-table__cell {
  padding: 5px 0 !important;
}
</style>
