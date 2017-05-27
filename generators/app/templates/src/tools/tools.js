/*
   封装一些常用方法
 */


let Tool = {
    /*
    获取url上的参数
     */
    getParameter(name){
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1])
    }
};





module.exports = Tool;

