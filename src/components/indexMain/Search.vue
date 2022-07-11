<template>
<div>
搜索结果<br>
  type:{{$route.params.type}}<br>
  keyword:{{$route.params.keyword}}<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
  文章<br>
</div>
</template>

<script>
export default {
  props:['type','keyword'],
  name: "Search",
  methods:{
     show(){
       console.log(this.$route.params.keyword);
     }
  },
  beforeMount() {
    console.log(this.$route.params.keyword);
  }

}
</script>

<style scoped>

</style>
