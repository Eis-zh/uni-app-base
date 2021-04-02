import {
    COMMON_HOST
} from './constant';
// 全局请求路径，也就是后端的请求基准路径
const BASE_URL = COMMON_HOST;

console.log('BASE_URL', BASE_URL)

// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes = 0;
// 封装请求方法，并向外暴露该方法
export const request = (options) => {
    // 解构请求头参数
    let header = {
        ...options.header
    };
    // 访问令牌
    const TOKEN = uni.getStorageSync('puhui_token');
    if (TOKEN) {
        header['Authorization'] = 'Bearer ' + TOKEN;
    }
    ajaxTimes++;
    // 显示加载中 效果
    uni.showNavigationBarLoading();
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'POST',
            data: options.data || {},
            header,
            success: (res) => {
                console.log('[common request success]', options, res)
                if (res.data.code === 401 || res.data.code === 403) {
                    setTimeout(() => {
                        //增加延时是为了在App端受showNavigationBarLoading影响下能弹出Toast
                        uni.showToast({
                            title: '请先登录',
                            icon: 'none',
                            duration: 3000
                        });
                    }, 100)

                    reject(res);
                    uni.removeStorageSync('puhui_token');
                    uni.removeStorageSync('user_info');
                    uni.removeStorageSync('is_union_member');
                    return;
                }
                if (res.data.code === 200) {
                    resolve(res);
                } else {
                    setTimeout(() => {
                        uni.showToast({
                            title: res.data.msg || res.data.message || '系统繁忙，请稍后再试',
                            icon: 'none',
                            duration: 3000
                        });
                    }, 100)

                    reject(res);
                }
            },
            fail: (err) => {
                console.error('[common request error]', options, err)
                setTimeout(() => {
                    uni.showToast({
                        title: '系统繁忙，请稍后再试',
                        icon: 'none',
                        duration: 3000
                    });
                }, 100)
                reject(err);
            },
            // 完成之后关闭加载效果
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    //  关闭正在等待的图标
                    uni.hideNavigationBarLoading();
                }
            },
        });
    });
};
