<template>

  <el-dialog
      title="Excel"
      :visible.sync="Modal"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"

      append-to-body
  >
    <div v-loading="loading">
      <el-row class="mb-5">
        <el-alert type="warning" class="mb-7">Lütfen ilk önce grup seçiniz.</el-alert>
        <el-select v-model="group_id" placeholder="Grup Seçiniz" size="mini" :disabled="selectDisabled"
                   style="max-width: 585px; margin-right: 5px" @change="excelButton=false">
          <el-option
              v-for="item in Groups"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-if="item.id!='all'"
          >
          </el-option>
        </el-select>


        <el-button-group size="mini">
          <el-upload
              action=""
              class="upload-demo"
              :auto-upload="false"
              :on-change="onChange"
              list-type="text"
              ref="upload"
              style="float: left;"
              :disabled="excelButton"
          >
            <el-button style="border-radius:0; padding: 10px; border: none;" :disabled="excelButton" slot="trigger"
                       size="mini" type="primary">Excel Yükle
            </el-button>
          </el-upload>
          <a class="el-button el-button--info el-button--mini"
             href="https://docs.google.com/spreadsheets/d/1c3XGlg4yZDfRNPCiTtGJMIijoU4UBHqq/export" download="">
            Şablon İndir
          </a>
          <el-button type="danger" size="mini" @click="resetExcel">Sıfırla</el-button>
          <el-button type="success" size="mini" @click="SaveExcel">Kaydet</el-button>
        </el-button-group>
      </el-row>


      <el-table
          class="TableSmall"
          :data="Excel"
          :row-class-name="tableRowClassName"
          width="100%"
          fixed
      >
        <el-table-column
            prop="sectionHeader"
            width="50"
        >
          <template
              slot-scope="scope"
          >
            {{ (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="sectionHeader"
            width="50">
          <template
              slot-scope="scope"
          >
            <el-tag type="danger">{{ (scope.row[0] ? scope.row[0][0] : '-') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sectionHeader" label="Adı Soyadı">
          <template slot-scope="scope">
            {{ (scope.row[0] ? scope.row[0] : '-') }}
          </template>
        </el-table-column>
        <el-table-column prop="sectionHeader" label="Telefon" width="250">
          <template slot-scope="scope">
            <el-input v-model="scope.row.phone" maxlength="12" show-word-limit></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sectionHeader">
          <template slot-scope="scope">
            <el-button-group size="mini">
              <el-button type="danger" size="mini" icon="el-icon-delete"
                         @click="excelRowDelete(scope.$index)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import readXlsxFile from 'read-excel-file'

export default {
  name: "directorExcelModal",
  props: ['Modal', 'Groups'],
  data() {
    return {
      Excel: null,
      group_id: '',
      yourValue: '',
      loading: false,
      selectDisabled: false,
      excelButton: true,
      status: true,
    };
  },
  methods: {
    handleClose() {
      this.Excel = [];
      this.group_id = '';
      this.$emit('Modal', {type: 'excel'})
    },
    onChange(event) {
      if (this.group_id) {
        let xlsxfile = event.raw;
        this.selectDisabled = true;
        readXlsxFile(xlsxfile).then((rows) => {
          let director = [];
          for (let i = 0; i < rows.length; i++) {
            if (i != 0) {
              if (rows[i][1].toString().length === 10) rows[i][1] = '90' + rows[i][1];
              //console.log("aaaaaaa:", director.find(x => x.phone === rows[i][1]))
              if (!director.find(x => x.phone === rows[i][1])) {
                director.push({
                  name: (rows[i][0] ? rows[i][0] : '-'),
                  phone: rows[i][1],
                  account_id: this.$store.getters.Account_id,
                  group_id: this.group_id,
                })
              }
            }
          }
          this.Excel = director
        })
      } else {
        this.$message.error("Lütfen grup seçiniz.");
      }
    },
    SaveExcel() {
      this.status = true;
      if (this.Status() === true) {
        if (this.group_id) {
          if (this.Excel?.length != 0) {
            this.loading = true;
            this.$store.dispatch("Query", {
              method: "post",
              url: "directory/excel",
              data: {data: this.Excel}
            }).then((response) => {
              this.loading = false;
              if (response.status == 'success') {
                this.handleClose();
                this.$message.success("Kayıt Başarılı.");
              } else {
                this.$message.error("Lütfen daha sonra tekrar deneyiniz.");
              }
            });
          } else {
            this.$message.error("Lütfen Kişi Yükleyiniz.");
          }
        } else {
          this.$message.error("Lütfen Grup seçiniz.");
        }
      } else {
        this.$message.error("Lütfen telefon numaralarını kontrol ediniz.");
      }
    },

    phoneControl(phone) {

      let ISD_CODES = [93, 355, 213, 1684, 376, 244, 1264, 672, 1268, 54, 374, 297, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 975, 591, 387, 267, 55, 246, 1284, 673, 359, 226, 257, 855, 237, 1, 238, 1345, 236, 235, 56, 86, 61, 61, 57, 269, 682, 506, 385, 53, 599, 357, 420, 243, 45, 253, 1767, 1809, 1829, 1849, 670, 593, 20, 503, 240, 291, 372, 251, 500, 298, 679, 358, 33, 689, 241, 220, 995, 49, 233, 350, 30, 299, 1473, 1671, 502, 441481, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 441624, 972, 39, 225, 1876, 81, 441534, 962, 7, 254, 686, 383, 965, 996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265, 60, 960, 223, 356, 692, 222, 230, 262, 52, 691, 373, 377, 976, 382, 1664, 212, 258, 95, 264, 674, 977, 31, 599, 687, 64, 505, 227, 234, 683, 850, 1670, 47, 968, 92, 680, 970, 507, 675, 595, 51, 63, 64, 48, 351, 1787, 1939, 974, 242, 262, 40, 7, 250, 590, 290, 1869, 1758, 590, 508, 1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 1721, 421, 386, 677, 252, 27, 82, 211, 34, 94, 249, 597, 47, 268, 46, 41, 963, 886, 992, 255, 66, 228, 690, 676, 1868, 216, 90, 993, 1649, 688, 1340, 256, 380, 971, 44, 1, 598, 998, 678, 379, 58, 84, 681, 212, 967, 260, 263];
      //extract numbers from string
      let thenum = phone;
      let totalnums = thenum.length;

      let last10Digits = parseInt(thenum) % 10000000000;
      console.log(last10Digits)
      let ISDcode = thenum.substring(0, totalnums - 10);

      //phone numbers are generally of 8 to 16 digits
      if (totalnums >= 8 && totalnums <= 16) {
        if (ISDcode) {
          if (ISD_CODES.includes(parseInt(ISDcode))) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
      return false;
    },
    tableRowClassName({row}) {
      if (row.phone.toString().length === 12) {
        return 'success-row';
      } else {
        return 'danger';
      }
    },
    excelRowDelete(index) {
      this.Excel.splice(index, 1);
    },
    Status() {
      for (let i = 0; i < this.Excel.length; i++) {
        if (this.Excel[i].phone.toString().length !== 12) {
          this.status = false;
        }
      }
      return this.status;
    },
    resetExcel() {
      this.selectDisabled = false;
      this.Excel = null;
    }
  },
  created() {
    this.Excel = null;
    this.group_id = '';
    this.yourValue = '';
    this.selectDisabled = false;
  },
  watch: {
    Modal: function (data) {
      console.log(data)
      this.Excel = null;
      this.selectDisabled = false;
      this.group_id = '';
      this.yourValue = '';
    }
  }
}
</script>

<style scoped>

</style>
