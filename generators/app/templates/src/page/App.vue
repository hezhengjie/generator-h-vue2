<template>
    <div>
        <app-header></app-header>
        <div>this is template body</div>
    </div>
</template>
<style scoped lang="less">
    @import "../static/css/base/border.less";
    @import "../static/css/base/util.less";
</style>
<script>
    import API from '../api/api';

    import Header from '../components/Header.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'app-header': Header
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
                API.getList({id:1});
            }
        }
    }
</script>
