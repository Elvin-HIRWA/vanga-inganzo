<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
 export default {
  created() {
    
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
 }
</script>
<style>
</style>
