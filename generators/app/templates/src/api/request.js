/**
 * Created by hugh on 17/3/2.
 */

var superagent = require('superagent');
var UA = require('@dp/util-m-ua');
var Toast = require('@dp/wepp-module-toast');
function Request() {
    this.product_domain = '';
    this.beta_domain = '';
    this.mock_domain = 'localhost:3000';
    this.env = "beta";
    this.mock = false;
}

Request.prototype = {
    config: function (config) {
        config.product_domain?this.product_domain=config.product_domain:null;
        config.beta_domain?this.beta_domain=config.beta_domain:null;
        config.mock_domain?this.mock_domain=config.mock_domain:null;
        config.mock?this.mock =config.mock:null;
    },
    ajax:function(option) {
        var url='';
        var data = option.data||null;
        if(this.mock){
          url ='//'+this.mock_domain+option.mockUrl;
        }
        else if(UA().env=="product"){
            url ='//'+this.product_domain+option.url;
        }
        else if(UA().env=="beta"){
            url ='//'+this.beta_domain+option.url;
        }
        else{
            url ='//'+this.beta_domain+option.url;
        }
        switch (option.type){
            case 'POST':
                return new Promise(function (res, rej) {
                    superagent.post(url).send(data).then(function (response) {
                        if (response.ok) {
                            let data = response.body;
                            if(data&&data.code==200){//  处理前后端协定的code
                                res(data.data);
                            }
                            else{
                                Toast(data.msg);
                                rej(data.msg)

                            }
                        } else {
                            Toast('请求错误，请稍后重试');
                            rej(response.body)
                        }
                    }).catch(function(err){
                        Toast('请求错误，请稍后重试');
                        rej(err)
                    })
                });
                break;
            case 'GET':
                return new Promise(function (res, rej) {
                    superagent.get(url).query(data).then(function (response) {
                        if (response.ok) {
                            let data = response.body;
                            if(data&&data.code==200){//  处理前后端协定的code
                                res(data.data);
                            }
                            else{
                                Toast(data.msg);
                                rej(data.msg)

                            }
                        } else {
                            Toast('请求错误，请稍后重试');
                            rej(response.body)
                        }
                    }).catch(function(err){
                        Toast('请求错误，请稍后重试');
                        rej(err)
                    })
                });
                break;
            case 'CONFIG':
                return new Promise(function (res, rej) {
                    superagent.get(url).query(data).then(function (response) {
                        if (response.ok) {
                            let data = response.body;
                            res(data);
                        } else {
                            Toast('请求错误，请稍后重试');
                            rej(response.body)
                        }
                    }).catch(function(err){
                        Toast('请求错误，请稍后重试');
                        rej(err)
                    })
                });
                break;
            case 'PUT':
                return superagent.put(url).send(data);
                break;
            case 'DELETE':
                return superagent.del(url).send(data);
                break;
            case 'JSONP':
                return superagent.get(url).use(Jsonp({
                    timeout: 5000,
                    callbackParam: 'callback'
                })).query(data);
            default:
                return;
        }
    }
}

module.exports = new Request();