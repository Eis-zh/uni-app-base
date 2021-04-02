<template>
	<view class="content">
		<!-- # ifndef H5 -->
		<view class="status-bar">
			<!-- 状态栏高度 -->
		</view>
		<!-- # endif -->
		<image
		 class="logo"
		 src="/static/logo.png"
		></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
import { getAppMessage } from '@/api/home'
export default {
  data() {
    return {
      title: "首页"
    };
  },
  onLoad() {
	  this.getAppMessageData()
  },
  methods: {
	  getAppMessageData() {
		getAppMessage({platform: 1}).then(res => {
			console.log('滚动消息：', res.data)
		})
	  }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.status-bar {
  height: var(--status-bar-height);
  width: 100%;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
