<template>
  <div class="bigtab" style="margin:0 auto">
    <div class="tab" style="color:#666666">
      <span
        v-for="(item,index) in ['新闻','体育','娱乐']"
        :key="index"
        :class="{active:current === index}"
        @mouseover="handleClick(index)"
      >{{ item }}</span>
    </div>

    <div>
      <ul v-show="current === 0">
        <li>中秋将至</li>
        <li>中秋将至</li>
        <li>中秋将至</li>
      </ul>
    </div>
    <div>
      <ul v-show="current === 1 ">
        <li>中国男篮总冠军</li>
        <li>中国男篮总冠军</li>
        <li>中国男篮总冠军</li>
      </ul>
    </div>
    <div>
      <ul v-show="current === 2">
        <li>Rainbow Baby邹</li>
        <li>Rainbow Baby邹</li>
        <li>Rainbow Baby邹</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0
    }
  },
  methods: {
    handleClick (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.bigtab{
    height: 200px;
    width: 200px;
    margin: 100 auto
}
.tab{
    margin-bottom: 20px;
    span{
        cursor: pointer;
    }
    .active{
        color:#000
    }
}
</style>
