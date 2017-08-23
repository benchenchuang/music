<template>
  <div class="top_count">
      <ul class="flex-box">
        <li class="flex-item" v-if="info.likedCount">
          <i class="iconfont icon-tianjiawenjian"></i>
          <p>{{info.likedCount}}</p>
        </li>
        <li class="flex-item">
          <i class="iconfont icon-liuyan"></i>
          <p>{{info.commentCount}}</p>
        </li>
        <li class="flex-item">
          <i class="iconfont icon-share"></i>
          <p>{{info.shareCount}}</p>
        </li>
        <li class="flex-item">
          <i class="iconfont icon-load"></i>
          <p>下载</p>
        </li>
      </ul>
  </div>
</template>
<script>
  export default {
    props:['info']
  }
</script>
<style>
  .top_count{
    margin:5px 0;
  }
  .top_count{
    font-size: 12px;
    color: #fff;
  }
  .top_count .iconfont{
    font-size: 18px;
  }
</style>
