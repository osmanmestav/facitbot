<template>
  <div>


    <el-row :gutter="20" :style="'height:' + this.Height +'px'">

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">

        <el-row>
          <el-col :span="8" style="float: left">
            <h1 class="page-header-title">Rehber</h1>
          </el-col>

          <el-col :span="14" style="display: flex;float: right;align-content: center;justify-content: flex-end;">
            <el-select v-model="device" placeholder="Cihaz Seçiniz" size="mini"
                       style="max-width: 250px; margin-right: 35px">
              <el-option
                  v-for="item in devices"
                  :key="item.id"
                  :label="item.phone"
                  :value="item.phone">
              </el-option>
            </el-select>


            <el-button type="warning" size="mini" @click="directoryStatus=true">
              <i class="el-icon-plus"></i> Kişi Ekle
            </el-button>
            <el-button type="info" size="mini" @click="groupModalStatus=true">
              <i class="el-icon-plus"></i> Grup Oluştur
            </el-button>
            <el-button type="primary" size="mini" @click="deviceModal()">
              <i class="el-icon-download"></i> Rehber Çek
            </el-button>
            <el-button type="primary" size="mini" @click="excelModal=true">
              <i class="el-icon-upload"></i> Excel
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

      <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" style="margin-bottom: 10px;">
        <el-table :data="Groups" class="TableSmall" v-loading="groupLoadingStatus">
          <el-table-column
              prop="name"
              label="Grup Adı"
              width="180">
          </el-table-column>
          <el-table-column
              prop="description"
              label="Grup Açıklaması"
              width="180"
          >
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="warning" size="mini" icon="el-icon-view"
                           @click="DirectorList(1,scope.row)"></el-button>
                <!--el-button type="primary" size="mini" icon="el-icon-edit" v-if="scope.$index!=0"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" v-if="scope.$index!=0"></el-button-->
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <img src="../assets/directory.png" alt="message"
             style="position:absolute; bottom: 0; left: calc(15% - 270px);width: 500px;">
      </el-col>
      <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
        <!--el-row style="margin-bottom: 10px" :gutter="20">
          <el-col class="pr-0" :xs="24" :sm="22" :md="22" :lg="22" :xl="22" style="margin-bottom: 10px;">
            <el-input
                type="text"
                @keyup.enter.native="Arama(1)"
                placeholder="Kişi Ara"
                prefix-icon="el-icon-search"
                clearable
                size="small"
            >
            </el-input>
          </el-col>
          <el-col class="pl-0" :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button-group class="w-100">
              <el-button @click="Arama(1)" size="small" class="w-100">ARA</el-button>
            </el-button-group>
          </el-col>
        </el-row-->
        <el-table
            ref="multipleTable"
            :data="directoryData"
            class="TableSmall"
            v-loading="directoryLoadingStatus"
        >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              width="120">
            <template slot-scope="scope">
              <el-tag type="info"
                      style="background-color: #2b314a;border-color: #2b314a;color: #f8f8f8;width: 35px; text-align: center;">
                {{ scope.row.name[0] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              property="name"
              label="Adı Soyadı"
          >
          </el-table-column>
          <el-table-column
              property="phone"
              label="Telefon"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              label="Oluşturma Tarihi"
              prop="sectionHeader"
          >
            <template slot-scope="scope">
              {{ Dates(scope.row.created) }}
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" icon="el-icon-edit"
                           @click="directoryEdit(scope.$index, scope.row)"></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete"
                           @click="directoryDelete(scope.$index, scope.row)"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <newDirectoryModal v-if="directoryStatus" :FormData="FormDirectory" :Modal="directoryStatus" :groups="Groups"
                       @Modal="closeModal"></newDirectoryModal>
    <excel :Modal="excelModal" :Groups="Groups" @Modal="closeModal"></excel>
    <newGroupModal :Modal="groupModalStatus" @Modal="closeModal"></newGroupModal>
    <directorDeviceModal :device="device" :groups="Groups" :Modal="directoryDeviceStatus"
                         @Modal="closeModal"></directorDeviceModal>

    <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
      <div class="bottomTotal">Toplam: {{ totalItem }} Kişi</div>
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
import newDirectoryModal from './comp/newDirectoryModal'
import excel from './comp/directorExcelModal'
import newGroupModal from "@/Module/comp/newGroupModal";
import directorDeviceModal from "@/Module/comp/directorDeviceModal";

export default {
  name: "directory",
  components: {
    newDirectoryModal,
    excel,
    newGroupModal,
    directorDeviceModal,
  },
  data() {
    return {
      devices: [],
      Groups: [],
      directoryData: [],
      device: '',
      groupLoadingStatus: true,
      directoryLoadingStatus: true,
      LoadingStatus: true,
      FormDirectory: null,
      directoryStatus: false,
      excelModal: false,
      groupModalStatus: false,
      directoryDeviceStatus: false,
      total: 0,
      totalItem: 0,
      Height: 300,
      pageGroup: false,
      currentPage: 1,
    }
  },
  created() {
    this.Device();
    this.groupLists();
    this.DirectorList();
    this.Height = window.innerHeight - 100;
  },
  methods: {
    page(page) {
      this.directoryLoadingStatus = true;
      this.DirectorList(page, this.pageGroup);
    },
    DirectorList(page = 1, Id = 'all') {
      this.directoryLoadingStatus = true;
      this.pageGroup = Id;
      var url = 'all/' + page;
      if (Id && Id.id == 'all') url = 'all/' + page; else if (Id == 'all') url = 'all/' + page; else url = 'group/' + Id.id + '/' + page;
      this.$store.dispatch("Query", {method: "get", url: "directory/" + url}).then((response) => {
        if (response.status === 'success') {
          this.directoryData = response.data.data
          this.total = response.data.totalPage
          this.totalItem = response.data.totalItem
          this.directoryLoadingStatus = false;
          this.currentPage = response.data.currentPage
        } else {
          this.$message.error(response.message);
        }
      });
    },
    Device() {
      this.$store.dispatch("Query", {method: "get", url: "device"}).then((response) => {
        this.devices = response.data;
      });
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

    closeModal(e) {
      if (e.type == 'directory') {
        if (e.status == true) this.DirectorList();
        this.directoryStatus = false
        this.FormDirectory = null;
      }
      if (e.type == 'excel') {
        this.excelModal = false;
        this.DirectorList();
      }
      if (e.type == 'device') {
        this.directoryDeviceStatus = false;
        if (e.status == true) this.DirectorList();
        this.device = '';
      }
      if (e.type == 'group') {
        this.groupModalStatus = false;
        this.groupLists();
      }
    },
    Dates(date) {
      var formatdate = new Date(date);
      return formatdate.toLocaleDateString() + ' ' + formatdate.toLocaleString().substr(formatdate.toLocaleString().indexOf(":") - 2, 8);
    },

    directoryDelete(index, row) {
      this.$store.dispatch("Query", {
        method: "delete",
        url: "directory",
        data: {id: row.id}
      }).then((response) => {
        if (response.status === 'success') {
          this.DirectorList();
          this.$message.success("İşlem Başarılı.");
        } else {
          this.$message.error(response.message);
        }
      });
    },
    directoryEdit(index, row) {
      this.directoryStatus = true;
      this.FormDirectory = row
    },
    reload() {
      this.groupLoadingStatus = true;
      this.directoryLoadingStatus = true;
      this.DirectorList();
      this.groupLists();
    },
    deviceModal() {
      if (this.device) {
        this.directoryDeviceStatus = true
      } else {
        this.$message.error("Lütfen cihaz seçiniz.");
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

td.el-table_1_column_1.el-table__cell {
  padding: 5px 0 !important;
}
</style>
