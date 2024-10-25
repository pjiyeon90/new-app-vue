<template lang="">
    <div class="headerwrap">
        <h1><img src="../assets/newslogo.png" alt="로고" /></h1>
        <form>
            <input type="text" placeholder="검색어를 입력하세요.">
            <button type="submit"><img src="../assets/search_b.svg" alt="검색" /></button>
        </form>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .headerwrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        h1{
           
           width: 120px;
           height: 30px;
           img{
            display: block;
            object-fit: cover;
            width:100%;
            height: auto;
            transform: translateY(-7px);
           }
        }
        form{
            position: relative;
            display: flex;
            height:45px;
        input{
            border: 1px solid #bdbdbd;
            border-radius: 99px;
            padding-left: 10px;
            &::placeholder{
                color: #999;
            }
        }
         button{
            cursor: pointer;
            background-color: transparent;
            width: 43px;
            height: 100%;
            border-radius: 99px;
            position: absolute;
            border: none;
            top: 2px;
            right: 2px;
            // &::after{
            //   transform: translate(-2px,10px);
            //   width: 43px;
            //   height: 43px;
            //   display: block;
            //   color: black;
            //   border: 1px solid red;
            //   content: url('../assets/search_b.svg');
            // }
         }
        }
    }
</style>