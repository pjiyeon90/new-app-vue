<template lang="">
    <div class="headerwrap">
        <h1 @click="goHome"><img src="../assets/newslogo.png" alt="로고" /></h1>
        <form  @submit.prevent="goToSearch()">
            <input v-model="keyword" type="text" placeholder="검색어를 입력하세요.">
            <button type="submit"><img src="../assets/search_b.svg" alt="검색" /></button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'; // axios 임포트

export default {
    name: 'HeaderView',
    data() {
        return {
            keyword: '', // keyword를 data에 추가
            articles: [] // articles 상태 추가 // keyword를 data에 추가
        };
    },
    methods: {
        goHome() {
            this.$router.push({ path: '/' }); // 홈으로 이동
        },
        async goToSearch() {
            console.log('검색어====', this.keyword);
            
            // API 요청 
            try {
                const response = await axios.get(`http://localhost:4000/news?keyword=${this.keyword}`);
                const filteredArticles = response.data.data.filter(article => article.image_url); // 이미지가 있는 데이터만 필터링
                
                this.$router.push({ path: '/search', query: { keyword: this.keyword } });

                // 필터링된 데이터를 상태에 저장
                this.articles = filteredArticles;
            } catch (error) {
                console.error("API 요청 오류:", error);
            }
        },
    }
}
</script>
<style lang="scss">
    .headerwrap{
        margin: 0 auto;
        width: calc(100% - 40px);
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
            padding-left: 15px;
            outline-color: #F26930;
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
         }
        }
    }
</style>