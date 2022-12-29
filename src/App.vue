<template>
  <div>
    <Login v-if="$route.path=='/login'"></Login>
    <Register v-if="$route.path=='/register'"></Register>
    <Verification v-if="$route.path=='/verification'"></Verification>
    <verify v-if="verifyLink=='verify'"></verify>
    <Header
        v-if="$route.path!='/login' && $route.path!='/register' && $route.path!='/verification' && verifyLink!='verify' && $store.getters.Session"></Header>
    <Sidebar
        v-if="$route.path!='/login' && $route.path!='/register' && $route.path!='/verification' && verifyLink!='verify' && $store.getters.Session"></Sidebar>
    <div id="main_panes"
         v-if="$route.path!='/login' && $route.path!='/register' && $route.path!='/verification' && verifyLink!='verify' && $store.getters.Session">
      <div class="page_body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Doc/header';
import Sidebar from './Doc/sidebar';
import Login from './Module/auth/login'
import Register from './Module/auth/register'
import Verification from './Module/auth/verification'
import verify from './Module/auth/verify'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Login,
    Register,
    Verification,
    verify,
  },
  data() {
    return {
      verifyLink: '',
      verifyId: '',
    }
  },
  created() {
    this.verifyLink = this.$route.path.split('/')[1];
    this.verifyId = this.$route.path.split('/')[2];
    if (this.$route.path != '/login' && this.$route.path != '/register' && this.$route.path != '/verification' && this.verifyLink != 'verify' && !this.$store.getters.Session) {
      this.$router.push('/login');
    }
  },
}
</script>
<style>
</style>
