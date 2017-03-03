<template>
    <div>
        <div>this is template header</div>
    </div>
</template>
<style lang="less" scoped>
   @import "../static/css/base/border.less";
   @import "../static/css/base/util.less";
</style>
<script>
    import API from '../api/api';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
