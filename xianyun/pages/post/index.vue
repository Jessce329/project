<template>
  <div class="container">
    <el-row type="flex">
      <el-col class="left-box">
        <ul class="hot-cities">
          <li
            v-for="(item,index) in options"
            :key="index"
            :class="{active:currentTabs === index}"
            class="cities"
            @mouseover="handleOptions(index)"
            @mouseleave="moveOptions()"
          >
            {{ item.name }}
            <span class="el-icon-arrow-right icon-right" />
          </li>
        </ul>
      </el-col>
      <div class="div-show">
        <ul>
          <li
            v-for="(value,indexs) in [1,2,3,4]"
            :key="indexs"
            :class="{actives :currentTabs === indexs}"
            class="show"
          >
            {{ value }}
          </li>
        </ul>
      </div>
      <el-col :span="16" class="right">
        <div class="grid-content bg-purple right-deep">
          222
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTabs: '',
      options: [
        {
          name: '热门城市'
        },
        {
          name: '推荐城市'
        },
        {
          name: '奔向海岛'
        },
        {
          name: '推荐主题'
        }
      ]
    }
  },
  methods: {
    handleOptions (index) {
      this.currentTabs = index
      this.showing = true
      // console.log(1222)
    },
    moveOptions () {
      this.currentTabs = ''
    }
  }
}
</script>
<style scoped lang="less">
  .container{
    width: 1000px;
    margin: 20px auto ;
    position: relative;
  }
  .hot-cities{
    height: 160px;
    border-left: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    width: 260px;
    .active{
      color: orange;
      cursor: pointer;
      border-right: 1px solid #fff;
    }
  }
  .left-box{
    width: 300px;
  }
  .cities{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-indent: 2em;
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
  }
  .icon-right{
    padding-left: 110px;
  }
  .div-show{
    // z-index:-1;
  }
  .show{
    display: none;
    position: absolute;
    left: 260px;
    top:0px;
    width:300px;
    height:200px;
    border: 1px solid #dddddd;
    z-index: -1;
  }
  .actives{
    display: block;
  }
  .right{
    z-index: -2;
  }
  .right-deep{
    flex: 1;
    width: 700px;
    height: 500px;
    background-color: red;
  }
</style>
