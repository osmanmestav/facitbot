<template>
  <div style="height: 100vh">
    <iframe :src="$store.getters.Diagram+$route.params.id+'/'+$store.getters.Token" width="100%"
            height="100%"></iframe>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    console.log(this.$route.params.id)
  }
}
</script>

<style>
.diagram-editor__wrapper {
  height: 100%;
}

.diagram-editor__wrapper svg {
  height: 100%;
}
</style>
