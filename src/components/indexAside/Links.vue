<template>
  <div>
    <span style="color: coral;font-size: 15px">友情链接</span>
    <br>
    <div v-for="link in links" >
      <el-card>
        <el-link :underline="false" :href="link.link"  type="primary" style="font-size: 12px" target="_blank">{{link.name}}</el-link>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Links",
  data() {
    return {
      links:[
        {
          link: "https://v3.cn.vuejs.org/",
          name: "vue.js"
        },
        {
          link: "https://element.eleme.cn/#/zh-CN/component/installation",
          name: "组件|Element"
        },
        {
          link: "https://www.bilibili.com/",
          name: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili"
        }
      ]

    }
  }

}
</script>

<style scoped>

</style>
