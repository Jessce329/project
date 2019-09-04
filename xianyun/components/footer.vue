<template>
  <div class="footer">
    <div class="about">
      <el-row type="flex" class="main">
        <dl class="travel">
          <dt>闲云旅游旅游网</dt>
          <dd>上亿旅行者共同打造的"旅行神器"</dd>
          <dd><span>60,000</span>多个全球旅游目的地</dd>
          <dd><span>600,000</span>个细分目的地新玩法</dd>
          <dd><span>760,000,000</span>次攻略下载</dd>
          <dd><span>38,000</span>家旅游产品供应商</dd>
        </dl>
        <dl class="travel">
          <dt>关于我们</dt>
          <dd>隐私政策 商标声明</dd>
          <dd>服务协议 游记协议</dd>
          <dd>商城平台服务协议</dd>
          <dd>网络信息侵权通知指引</dd>
          <dd>闲云旅游旅游网服务监督员</dd>
          <dd>网站地图加入闲云旅游</dd>
        </dl>
        <dl class="travel">
          <dt>旅游服务 </dt>
          <dd>旅游攻略 酒店预订</dd>
          <dd>旅游特价 国际租车</dd>
          <dd>旅游问答 旅游保险</dd>
          <dd>旅游指南 订火车票</dd>
          <dd>旅游资讯 APP下载</dd>
        </dl>
        <!-- <div class="img">
          <p>
            <img src="../assets/images/01.jpg" alt="">
          </p>
        </div> -->
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .footer{
        width: 100%;
        height: 400px;
        background: #333333;
    }
    .about{
      width: 1000px;
      margin: 0 auto;
      padding:40px 0 20px;
      border-bottom: 1px solid #fff
    }
    .main{
      padding-left: 40px
    }
    .travel{
      color:#cccccc;
      width: 250px;
    }
    .travel>dt{
      padding-bottom: 10px;
    }
    .travel>dd{
      font-size: 13px;
      line-height: 20px;
    }
    .travel>dd>span{
      color: #ffa500
    }
    .main p{
      .img{
      display: block;
      width: 140px;
    }
    }
</style>
