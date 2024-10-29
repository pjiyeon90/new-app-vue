<template lang="">
    <div class="searchwrap">
        <h1>검색 결과 <span>(총 <i>{{ articles.length }}</i>개)</span></h1>
        <div v-if="articles.length === 0">
            검색 결과가 없습니다.
        </div>
        <div class="news-result-wrap">
            <div v-for="article in articles" :key="article.id" class="news-result-box">
            <figure><img :src="article.image_url" alt="기사 이미지"></figure>
            <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.summary }}</p>
            </div>
            </div>
        </div>
        <button class="home-button" @click="goHome">홈으로 가기</button> 
    </div>
</template>
<script>
import axios from 'axios';


export default {
  name: 'SearchView',
  data() {
    return {
      articles: [],
      keyword: ''
    };
  },
  methods: {
    async fetchArticles() {
      try {
        const res = await axios.get(`http://localhost:4000/news/search?keyword=${this.keyword}&date_from=2024-10-23&date_to=2024-10-24`);
        console.log(res.data, '==========');
        this.articles = res.data.data; // API 응답 구조에 맞게 수정
        this.articles = res.data.data.filter(article => article.image_url);
      } catch (error) {
        console.error("API 요청 오류:", error);
      }
    },
    goHome() {
      window.location.href = '/'; // 홈으로 이동
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.keyword = urlParams.get('keyword'); // 검색어를 URL에서 가져옴
    this.fetchArticles(); // 검색 결과 가져오기
  }
}
</script>
<style lang="scss">
    .searchwrap{
        margin: 0 auto;
        width: calc(100% - 40px);
        margin-bottom: 50px;
        h1{
            font-size: 1.9rem;
            margin-bottom: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                font-size: 1.5rem;
                font-weight: 500;
                i{ font-style: normal;
                    color: #F26930;
                }
                
            }
        }
        .news-result-wrap{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
           .news-result-box{
            width: 49%; 
            height: 600px;
            margin-bottom: 30px;
            // 홀수 번째 요소에만 margin-right 적용
            &:nth-child(odd) {
                margin-right: 2%; 
            }
           
            figure{
                margin: 0;
                height: 220px;
                width:100%;
                img{
                    width:100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                    filter: drop-shadow(0 0 5px rgba(0,0,0,.2));
                   }
                }
            h2{ font-size: 1.4rem;}
            p{
                margin: 0;
                padding:0 10px;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis; /* ...으로 표시 */
                line-height: 1.5em; /* 줄 높이 설정 (필요에 따라 조정) */
                max-height: 12em; /* 최대 높이 설정 */ 
            }
        }
     } 
     .home-button{
        cursor: pointer;
        padding: 10px 40px;
        border-radius: 99px;
        color: white;
        background-color: #F26930;
        border: none;}
    }
</style>