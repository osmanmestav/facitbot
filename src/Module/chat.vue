<template>
  <el-row :gutter="24" :style="'height:'+ this.Height +'px' ">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-bottom: 10px;">
      <el-row>
        <el-col :span="8" style="float: left">
          <h1 class="page-header-title">Canlı Chat</h1>
        </el-col>
        <el-col :span="14" style="display: flex;float: right;align-content: center;justify-content: flex-end;">
          <el-button
              type="primary"
              native-type="submit"
              block
              size="mini"
              @click="Reload()"
          >
            <i class="el-icon-refresh"></i>
          </el-button>
        </el-col>
      </el-row>
    </el-col>

    <el-col class="lists" :xs="24" :sm="8" :md="6" :lg="6" :xl="6" :style="'height:'+ this.Height +'px' "
            v-if="messages.length>0">

      <a v-for="(data,index) in messages" :key="index" @click="select(index)">
        <el-row :class="'list '+(index==selectMessage?'active':'')">
          <el-col :sm="4" class="img">
            {{ data.name[0] }}
          </el-col>
          <el-col>
            <small class="name">{{ data.name }}</small>
            <p class="message" v-if="data.data[data.data.length - 1].type == 1">
              {{ data.data[data.data.length - 1].message }}</p>
            <p class="message" v-if="data.data[data.data.length - 1].type == 3">
              {{ JSON.parse(data.data[data.data.length - 1].message).body }}</p>
          </el-col>
          <el-col :sm="4" class="list-date">{{ Dates(data.created) }}</el-col>
        </el-row>
      </a>
    </el-col>

    <el-col :xs="24" :sm="16" :md="18" :lg="18" :xl="18" class="p-0"
            :style="'box-shadow: 0 0px 2px #232b392d; background: #fff; position:relative; border-radius: 10px; height:'+ this.Height +'px' "
            v-if="messages.length>0">
      <div id="lists" v-chat-scroll
           style="border-radius: 8px; height: 90%; padding: 40px;  flex-direction: column-reverse;   overflow-y: scroll;">


        <div class="chat-list">
          <el-row>


            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :style="(data.owner==1?'float: right;':'float: left;')"
                    v-for="(data,index) in messages[selectMessage].data" :key="index">
              <el-row>
                <div
                    :style="(data.owner==1?'float: right; margin-left: 15px; text-align: right':'float: left; margin-right: 14px; text-align: left')">
                  <div
                      style="background: rgb(0 128 96); border-radius: 50%; width: 30px; height: 30px; text-align: center; display: flex; place-content: center; align-items: center; flex-wrap: nowrap; font-weight: 500; color: #fff;font-size: 20px;">
                    {{ (data.owner == 1 ? messages[selectMessage].name[0] : '') }}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                         v-if="data.owner==0">
                      <path
                          d="M4.335 8.61499C3.98049 8.61579 3.64078 8.75725 3.39048 9.0083C3.14018 9.25935 2.99973 9.59947 3 9.95398V15.307C3 15.6611 3.14065 16.0006 3.39101 16.251C3.64138 16.5013 3.98094 16.642 4.335 16.642C4.68907 16.642 5.02863 16.5013 5.27899 16.251C5.52935 16.0006 5.67 15.6611 5.67 15.307V9.95398C5.67027 9.59947 5.52983 9.25935 5.27953 9.0083C5.02922 8.75725 4.68952 8.61579 4.335 8.61499V8.61499ZM20.353 8.61499C19.9986 8.61579 19.659 8.75734 19.4088 9.00842C19.1587 9.25951 19.0185 9.59956 19.019 9.95398V15.307C19.0141 15.4853 19.045 15.6628 19.1099 15.829C19.1748 15.9952 19.2723 16.1467 19.3967 16.2745C19.5211 16.4024 19.6699 16.504 19.8342 16.5734C19.9985 16.6428 20.1751 16.6786 20.3535 16.6786C20.5319 16.6786 20.7085 16.6428 20.8728 16.5734C21.0371 16.504 21.1859 16.4024 21.3103 16.2745C21.4347 16.1467 21.5322 15.9952 21.5971 15.829C21.662 15.6628 21.6929 15.4853 21.688 15.307V9.95398C21.6883 9.59947 21.5478 9.25935 21.2975 9.0083C21.0472 8.75725 20.7075 8.61579 20.353 8.61499Z"
                          fill="#fff"></path>
                      <path
                          d="M8.33899 18.062V20.662C8.33899 21.0161 8.47964 21.3556 8.73 21.606C8.98036 21.8563 9.31993 21.9969 9.67399 21.9969C10.0281 21.9969 10.3676 21.8563 10.618 21.606C10.8683 21.3556 11.009 21.0161 11.009 20.662V18.062H8.33899Z"
                          fill="#fff"></path>
                      <path opacity="0.3"
                            d="M16.344 18.062C16.6984 18.0615 17.0381 17.9202 17.2885 17.6693C17.5388 17.4184 17.6793 17.0784 17.679 16.724V8.69299H7.004V16.724C7.00373 17.0784 7.1442 17.4184 7.39454 17.6693C7.64487 17.9202 7.98458 18.0615 8.339 18.062H16.344Z"
                            fill="#fff"></path>
                      <path
                          d="M13.679 18.062V20.662C13.679 21.0161 13.8196 21.3556 14.07 21.606C14.3204 21.8563 14.6599 21.9969 15.014 21.9969C15.368 21.9969 15.7076 21.8563 15.958 21.606C16.2083 21.3556 16.349 21.0161 16.349 20.662V18.062H13.679Z"
                          fill="#fff"></path>
                      <path
                          d="M15.676 4.53889L16.864 3.09492C16.9209 3.02747 16.9639 2.94945 16.9904 2.8653C17.017 2.78115 17.0266 2.69257 17.0187 2.60468C17.0109 2.51679 16.9857 2.43131 16.9446 2.35322C16.9035 2.27512 16.8474 2.206 16.7794 2.14973C16.7115 2.09345 16.633 2.05112 16.5486 2.02534C16.4642 1.99955 16.3756 1.99079 16.2878 1.99946C16.2 2.00813 16.1147 2.03408 16.037 2.07587C15.9593 2.11767 15.8906 2.17451 15.835 2.24299L14.535 3.82099C13.8435 3.50074 13.0902 3.33617 12.3282 3.33893C11.5662 3.3417 10.8141 3.51173 10.125 3.83698L8.85999 2.2519C8.80503 2.18348 8.73714 2.1266 8.66018 2.08442C8.58322 2.04224 8.49871 2.01569 8.41147 2.00617C8.32423 1.99665 8.23597 2.00441 8.15173 2.029C8.06748 2.05359 7.98891 2.09452 7.92049 2.14948C7.85207 2.20444 7.79515 2.27235 7.75297 2.34931C7.71079 2.42627 7.68418 2.51073 7.67466 2.59797C7.66515 2.68521 7.6729 2.77349 7.69749 2.85773C7.72209 2.94198 7.76303 3.02052 7.81799 3.08893L8.98999 4.55793C8.37138 5.05535 7.87187 5.68486 7.52806 6.40034C7.18426 7.11581 7.00485 7.89915 7.00299 8.69294H17.684C17.6821 7.8943 17.5006 7.10632 17.1531 6.38727C16.8055 5.66823 16.3007 5.03648 15.676 4.53889V4.53889ZM10.676 7.34699C10.4782 7.34699 10.2849 7.28829 10.1204 7.17841C9.95597 7.06853 9.8278 6.91241 9.75211 6.72968C9.67642 6.54696 9.65662 6.34578 9.69521 6.1518C9.73379 5.95782 9.82903 5.77969 9.96888 5.63984C10.1087 5.49998 10.2869 5.40474 10.4809 5.36616C10.6749 5.32757 10.8759 5.34735 11.0587 5.42304C11.2414 5.49873 11.3976 5.62688 11.5075 5.79133C11.6173 5.95578 11.676 6.14921 11.676 6.34699C11.676 6.61221 11.5706 6.86649 11.3831 7.05402C11.1956 7.24156 10.9412 7.34699 10.676 7.34699ZM14.005 7.34699C13.8072 7.34699 13.6139 7.28829 13.4494 7.17841C13.285 7.06853 13.1568 6.91241 13.0811 6.72968C13.0054 6.54696 12.9856 6.34578 13.0242 6.1518C13.0628 5.95782 13.158 5.77969 13.2979 5.63984C13.4377 5.49998 13.6159 5.40474 13.8099 5.36616C14.0039 5.32757 14.2049 5.34735 14.3877 5.42304C14.5704 5.49873 14.7266 5.62688 14.8365 5.79133C14.9463 5.95578 15.005 6.14921 15.005 6.34699C15.005 6.61221 14.8996 6.86649 14.7121 7.05402C14.5246 7.24156 14.2702 7.34699 14.005 7.34699Z"
                          fill="#fff"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div class="chat-body" :style="(data.owner==1?'float: right;':'float: left;')">
                    {{ (data.type == 3 ? JSON.parse(data.message).body : data.message) }}
                    <ul v-if="data.type == 3">
                      <li v-for="(button,index) in JSON.parse(data.message).buttons" :key="index">
                        {{ (index + 1) + ' - ' + button.buttonText.displayText }}
                      </li>
                    </ul>
                  </div>
                </div>
              </el-row>
            </el-col>

          </el-row>
        </div>

        <div>
        </div>


      </div>

      <el-row style="width: 100%; position: absolute; bottom: 30px;">
        <el-input class="send-textarea" type="textarea" placeholder="Reply here" v-model="message" style=""
                  @keyup.enter.native="sendMessage"></el-input>
      </el-row>
      <el-row style="width: 100%; position: absolute; bottom: 0; display: flex; justify-content: flex-end;">
        <el-button size="small" type="info" @click="sendMessage()"
                   style="border-radius: 50%; position: absolute; bottom: 20px">
          <i class='bx bxs-send'></i>
        </el-button>
      </el-row>

    </el-col>
    <img src="../assets/chat.png" alt="device" v-if="messages.length==0"
         style="position:absolute; bottom: 0; left: calc(50% - 150px);width: 300px;">
  </el-row>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      Height: 300,
      messages: [],
      selectMessage: 0,
      color: '#000',
      message: '',
    }
  },
  created() {
    this.Height = window.innerHeight - 180;
    this.Query();
  },
  methods: {
    Query() {
      this.$store.dispatch("Query", {method: "get", url: "botmessage"}).then((response) => {
        console.log(response)
        this.messages = response?.data;
      });
    },
    Reload() {
      this.Query();
    },
    select(index) {
      this.selectMessage = index;
    },
    sendMessage() {
      this.$store.dispatch("Query", {
        method: "post",
        url: "botmessage",
        data: {
          botmessages_id: this.messages[this.selectMessage].id,
          message: this.message,
          device: this.messages[this.selectMessage].device,
          phone: this.messages[this.selectMessage].phone
        }
      }).then((response) => {
        if (response.status == 'success') {
          this.messages[this.selectMessage].data.push({
            message: this.message,
            phone: this.messages[this.selectMessage].phone,
            owner: 0,
            type: 0,
          });
          this.message = '';
        }
      });
    },
    Dates(date) {
      var formatdate = new Date(date);
      return formatdate.toLocaleDateString() + ' ' + formatdate.toLocaleString().substr(formatdate.toLocaleString().indexOf(":") - 2, 8);
    },
  },
  sockets: {
    message(data) {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].phone == data.phone) {
          this.messages[i].data.push(data);
        }
      }
      this.$forceUpdate();
    },
    newMessage(data) {
      console.log(data)
      this.messages.push(data);
      this.$forceUpdate();
    },
  },
}
</script>

<style scoped>
.chat-body {
  background-color: #fecf526e;
  border-radius: 20px;
  padding: 10px 14px;
  margin-bottom: 10px;
  color: #000;
  font-size: 12px;
  display: inline-block;
  word-break: break-word;
}


.chat {
  list-style: none;
  margin: 0;
  padding: 0;
}

.chat li {
  margin-bottom: 40px;
  padding-bottom: 5px;
  /* border-bottom: 1px dotted #B3A9A9; */
  margin-top: 10px;
  width: 80%;
}


.chat li .chat-body p {
  margin: 0;
  /* color: #777777; */
}


.chat-care {
  overflow-y: scroll;
  height: 350px;
}

.chat-care .chat-img {
  width: 50px;
  height: 50px;
}

.chat-care .img-circle {
  border-radius: 50%;
}

.chat-care .chat-img {
  display: inline-block;
}


.chat-care .chat-body {
  display: inline-block;
  max-width: 80%;
  background-color: #FFC195;
  border-radius: 12.5px;
  padding: 15px;
}

.chat-care .chat-body strong {
  color: #0169DA;
}

.chat-care .admin {
  text-align: right;
  float: right;
}

.chat-care .admin p {
  text-align: left;
}

.chat-care .agent {
  text-align: left;
  float: left;
}

.chat-care .left {
  float: left;
}

.chat-care .right {
  float: right;
}

.clearfix {
  clear: both;
}

.chat-body li {
  list-style: none;
}

</style>
