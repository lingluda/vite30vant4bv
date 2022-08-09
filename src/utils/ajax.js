import axios from 'axios';
import qs from 'qs'

axios.defaults.baseURL = 'http://106.13.7.125:9581/'
let ajax = {};
ajax.post = function (url,params,callback){
    axios.post(url, qs.stringify(params)).then(res=>{
        if (res.status==200) {
            callback(res.data.data)
        }else {
            alert(res.data.msg)
        }
    })
}
ajax.get = function (url, data, callback) {
    if (JSON.stringify(data) == '{}') {
        data = {1: 1}
    }
    axios.get(url + '?' + encodeUrl(data)).then(res => {
        if (res.data.IsSucceed) {
            callback(res.data.Data)
        }else {
            //alert(res.data.Error)
        }
    })
}
export default ajax;
