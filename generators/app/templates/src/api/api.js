/**
 * Created by hugh on 17/3/2.
 */
var Request = require('./request');
Request.config({
    product_domain:'',
    beta_domain:'',
    mock_domain:'localhost:3000',
    mock:true
});

let API = {
    getList:function(data) {
        Request.ajax({
            url: '/test',
            type: 'POST',
            mockUrl: '/list'
        }).then(function(data){
            console.log('succrss');
        }).catch(function(err){
            console.log('error');
        })
    }
}

 module.exports = API;