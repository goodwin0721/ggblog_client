<template>
  <div id="app">
    <el-container>

      <el-header class="header">
        <page-header @getView="view"></page-header>
      </el-header>

      <el-main class="main">
        <index-main :view="mainView"></index-main>
        <el-backtop target=".main" right="400">up</el-backtop>
      </el-main>

      <el-aside class="aside">
        <index-aside></index-aside>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import pageHeader from "../components/PageHeader";
import indexAside from "../components/IndexAside";
import indexMain from "../components/IndexMain";

export default {
  name: "Index",
  components:{
    pageHeader,
    indexAside,
    indexMain
  },
  data(){
    return{
      mainView:'all'
    }
  },
  methods:{
    view(view){
      this.mainView = view;
      // console.log('index'+this.mainView);
    }
  }
}
</script>

<style scoped>
.header{
  background-color:lightgoldenrodyellow;
  color: #333;
  text-align: center;
  line-height: 5px;
  width: 100%;
  height: 50px;
  padding:2px;
}

.main{
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 8px;
  right: 310px;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.aside{
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  position: absolute;
  display: block;
  top: 70px;
  bottom: 0;
  right: 8px;
}

</style>
