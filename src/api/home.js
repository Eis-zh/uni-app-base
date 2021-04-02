import { request } from "@/utils/request"

export function getAppMessage(data) {
    return request({
        url: '/mall/app/message',
        method: 'get',
        data
    })
}