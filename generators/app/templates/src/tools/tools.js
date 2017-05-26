/*
   封装一些常用方法
 */
import UA from '@dp/util-m-ua';
import KNB from '@dp/knb';

let Tool = {
    /*
    获取url上的参数
     */
    getParameter(name){
        name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1])
    },
    /*
     判断是否在App内
     */
    isInApp(){
        return UA().type==="dpapp"||UA().type==="mtgroup";
    },

    /*
     返回
     */
    back(){
        if(history.length>1){
            history.back();
        }
        else{
            KNB.closeWebview({});
        }
    },
    /*
      跳转（app和h5）
     */
    jump(url,notitlebar){
        if(UA().type==="dpapp"||UA().type==="mtgroup"){
            KNB.openWebview({
                url:url,
                qs: {
                    notitlebar:notitlebar
                }
            });
        }
        else {
            location.href=url
        }
    },


    /*
      灵犀打点(4.0)
     */
    lxView(bid,lab){
        LXAnalytics('moduleView', bid,lab)
    },
    lxClick(bid,lab){
        LXAnalytics('moduleClick',bid, lab);
    }
};





module.exports = Tool;

