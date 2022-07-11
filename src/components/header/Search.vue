<template>
  <div class="page-header-component">
    <el-autocomplete
      v-model="input"
      class="input-with-select"
      clearable
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      @select="handleSelect"
      @keyup.enter.native="search"
      placeholder="请输入内容">
      <el-select slot="prepend" v-model="select" placeholder="请选择" style="width: 100px">
        <el-option label="找动态" value="1"></el-option>
        <el-option label="找人" value="2" :disabled="true"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
    </el-autocomplete>
  </div>
</template>

<script>

export default {
  name: "Search",
  data() {
    return {
      select: '1',
      input: ''
    }
  },
  methods: {
    search() {
      //this.$router.push('/search/' + this.select + '/' + this.input);
      if (this.input.trim() !== '') {
        this.$router.push(
          {
            name: 'search',
            params: {
              type: this.select,
              keyword: this.input.trim()
            }
          });
        //console.log(this.select + "/" + this.input);
        //this.$emit('mainView', 'search');
      }
    },
    querySearch(queryString, callback){
      let list = [];
      let results = [];
      if(this.input.trim().length === 0){
        return null;
      } else {
        this.axios.get("/api/dynamic/search/suggest/title/" + this.input.trim()).then(res=>{
          if(res){
            if(res.data !== null){
              results = res.data;
              for (let i = 0; i < results.length; i++) {
                list.push({value:results[i]})
              }
              console.log(list);
              // 调用 callback 返回建议列表的数据
              callback(list);
            }
          }
        })
      }

    },
    handleSelect() {
      console.log(this.input);
    }
  }

}
</script>
<style scoped>
.page-header-component{
  height: 55px;
  width: 100%;
  text-align:center;
}
.input-with-select{
  padding: 8px 0;
}
</style>
