/**
 * Created by hugh on 17/3/2.
 */

var superagent = require('superagent');
function Request() {
    this.product_domain = '';
    this.beta_domain = '';
    this.mock_domain = 'localhost:3000';
    this.env = "beta"
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
        else if(this.env=="product"){
            url ='//'+this.product_domain+option.url;
        }
        else if(this.env=="beta"){
            url ='//'+this.beta_domain+option.url;
        }
        switch (option.type){
            case 'POST':
                return superagent.post(url).send(data);
                break;
            case 'GET':
                return superagent.get(url).query(data);
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