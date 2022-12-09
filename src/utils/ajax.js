import axios from 'axios';
import qs from 'qs'

//axios.defaults.baseURL = 'http://10.162.98.72/PaperKB/'
let ajax = {};


ajax.post = function (url,params,callback){
    axios.post(url,params).then(res=>{
        if(res.status==200){
            callback(res.data.Data)
        }else{
            alert(res.message)
        }
    })
}

ajax.posts = function (url,params,callback){
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
ajax.getParams = function(url,prm){
    var args = getUrlAllParams(url);
    //如果要查找参数key:
    if (args[prm] != undefined) {
    //如果要查找参数key:
    return args[prm];
    } else {
    return "";
    }
    }
function getUrlAllParams(url) {
    var args = new Object();
    var query = url;
    query=query.substring(query.lastIndexOf('?')+1)
    var pairs = query.split("&"); //在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('='); //查找name=value
    if (pos == -1) continue; //如果没有找到就跳过
    var argname = pairs[i].substring(0, pos); //提取name
    var value = pairs[i].substring(pos + 1); //提取value
    args[argname] = unescape(value); //存为属性
    }
    return args;
    }
export default ajax;
