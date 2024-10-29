<template lang="">
    <div class="footerwrap">
        <div class="snswrap">
            <button><img src="../assets/naverlogo.svg"/></button>
            <button><img src="../assets/googlelogo.svg"/></button>
            <button><img src="../assets/facebooklogo.svg"/></button>
        </div>
        <div class="textwrap">
           <p><a>이용약관</a><i>|</i><a>개인정보취급방침</a><i>|</i><a>고객센터</a></p>
           <b>Copyrightⓒ NEWS All rights reserved.</b> 
        </div>

    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .footerwrap{
        background-color: #ddd;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 170px;
        .snswrap{
            margin-bottom: 5px;
            button{
                margin:0 8px 10px 0;
                cursor: pointer;
                border: none;
                background-color: #bbb;
                width:35px;
                height: 35px;
                border-radius: 99px;
                img{
                    vertical-align: middle;
                }
            }
        }
        .textwrap{
            p{  margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                a{cursor: pointer;}
                i{margin: 0 5px;
                color: #aaa;
                font-size: .9rem;
                display: inline-block;}}
            
            b{  margin-top: 10px;
                color: #6e6e6e;
                font-size: .8rem;
                font-weight: 200;}
        }
    }
</style>