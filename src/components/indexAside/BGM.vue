<template>
  <div>
    <iframe border="0" frameborder="no"
            height=86 marginheight="0"
            marginwidth="0" v-bind:src="bgmSrc"
            width=250>
    </iframe>
  </div>
</template>

<script>
export default {
  name: "BGM",
  data(){
    return{
      bgmSrc:"//music.163.com/outchain/player?type=2&id=1901371647&auto=0&height=66"
    }
  }
}
</script>

<style scoped>

</style>
