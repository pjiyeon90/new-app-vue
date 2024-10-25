<template>
  <div class="home">
      <div class="contentswrap">
        <!-- 컴포넌트 출력 -->
        <!-- 상단 큰 이미지 -->
        <div class="mainimg" v-if="randomArticle">
          <figure><img :src="randomArticle.image_url" alt="기사 이미지"></figure>
          <div class="img-summary">
          <h3>{{  randomArticle.title }}</h3> 
          <p class="summary">{{  randomArticle.summary }}</p>
          </div>
        </div>
       
        <!-- 뉴스 기사 텍스트 스와이퍼 -->
        <swiper :direction="'vertical'" :slides-per-view="3" pagination navigation class="mySwiper">
        <swiper-slide v-for="(article, index) in articles" :key="index">
          <div class="textlist-wrap">
              <h3>{{ article.title }}</h3>
          </div>
        </swiper-slide>
       </swiper>
       <div class="genre-seciton">
          <div className='menuwrap' >
              <ul>
                  <li><a href='/' className='actived'>#정치</a></li>
                  <li><a href='/'>#경제</a></li>
                  <li><a href='/'>#사회</a></li>
                  <li><a href='/'>#문화</a></li>
                  <li><a href='/'>#세계</a></li>
                  <li><a href='/'>#기술</a></li>
                  <li><a href='/'>#연예</a></li>
                  <li><a href='/'>#여론</a></li>
              </ul>
          </div>
          <div class="text-row" v-for="(article, index) in visibleArticles" :key="index">
            <h3>{{ article.title }}</h3>
            <p>{{  article.summary }}</p>
          </div>

      </div>
        <!-- 하위 작은 이미지 -->
        <div class="listbox">
           <div v-for="(article, index) in visibleArticles" :key="index" class="list-wrap">
                <figure><img :src='article.image_url' alt="기사 이미지"></figure>
                <div class="img-explain">
                <h3>{{ article.title }}</h3> 
                <p class="editrow">{{ article.summary }}</p>
                </div>
           </div>
        </div>

        <!-- 더보기 버튼 -->
        <button v-if="hasMoreArticles" @click="showMore" class="more-button">더보기</button>

      
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';


export default {
  name: 'HomeView',
  data(){
        return { 
          randomArticle: null, // 랜덤으로 선택된 기사를 저장할 변수
           articles: [], // API에서 받아온 데이터를 저장할 변수
           visibleCount: 3, // 처음에 보여줄 기사 수

          }
    },
    computed: {
    visibleArticles() {
      return this.articles.slice(0, this.visibleCount);
    },
    hasMoreArticles() {
      return this.articles.length > this.visibleCount;
    },
    },
    created(){
        this.apiRequest()
    },
    methods:{
      async apiRequest(){
        try {
        const res = await axios.get('http://localhost:4000/news');
        this.articles = res.data.data.filter(article => article.image_url); // 이미지가 있는 기사만 필터링
        this.selectRandomArticle(); // 랜덤 기사 선택
        console.log(this.articles);
    
      } catch (error) {
        console.error("API 요청 오류:", error);
            }
      },
     selectRandomArticle() {
      if (this.articles.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.articles.length);
        this.randomArticle = this.articles[randomIndex]; // 랜덤 기사 저장
          }
        },
    
      showMore() {
        this.visibleCount += 5; // 더보기 클릭 시 5개씩 추가
        },
      },
      components: {
        Swiper,
        SwiperSlide,
      }
}
</script>

<style lang="scss">
.contentswrap{
  padding-bottom: 100px;
  .mainimg{
  margin-bottom: 50px;
  padding-bottom: 10px;

  figure{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 350px;
    img{
      width:100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
      filter: drop-shadow(0 0 5px rgba(0,0,0,.2));
    }
  }
  .img-summary{
    h3{text-align: left;}
    p{
      font-size: 15px;
      text-align: left;}
    .summary {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis; /* ...으로 표시 */
    line-height: 1.5em; /* 줄 높이 설정 (필요에 따라 조정) */
    max-height: 6em; /* 최대 높이 설정 */
    }
  }
}
.swiper{
  background-color: #F26930;
  border-radius: 10px;
  height: 200px; /* 슬라이드 높이 조정 */
}
.swiper-wrapper{
  // flex-direction: column; 
  color: white;
  .swiper-slide{
    width: 100%;
  .textlist-wrap{
      width: 100%;
      h3{
        width: 100%;
        font-size: 16px;
        font-weight: 300;
      }
     }
    }
}
.swiper-button-prev:after, .swiper-button-next:after{
  font-size: 20px;
  color: white;
   z-index: 10;
}
.listbox{
  border-top: 2px solid #F26930;
  padding-top:50px;
  margin: 50px 0;
  .list-wrap{
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    figure{
      margin:0;
      width: 36%;
      margin-right: 20px;
      height: 150px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        filter: drop-shadow(0 0 3px rgba(0,0,0,.2));
      }
     }
   .img-explain{
      width:64%;
      h3{
        margin:0;
        margin-bottom: 7px;
        font-size: 17px;
        width: 100%;
        line-height: 1.5rem;
        text-align: left;}
      p{
        font-size: 15px;
        margin: 0;
        height: 200px;
        overflow: hidden;
      }
      .editrow{
        text-align: left;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis; /* ...으로 표시 */
        line-height: 1.5em; /* 줄 높이 설정 (필요에 따라 조정) */
        max-height: 3em; /* 최대 높이 설정 */
      }
    }
  }
 }
}
.more-button{
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 99px;
  color: white;
  background-color: #F26930;
  border: none;}

  .menuwrap{
    margin: 70px auto;
    display: flex;
    white-space: nowrap; /* 메뉴 항목이 줄 바꿈되지 않도록 설정 */
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;
    ul{display: flex;
      padding:0;
      margin: 0;
        li{ width: 15%;
            list-style: none;
            margin-right: 15px;
            box-sizing: border-box;
            a{  text-decoration: none;
                color: #666;
                display: inline-block;
                font-size: 1rem;
                padding: 10px 15px;
                border: 2px solid #666;
                border-radius: 99px;
            }
            a.actived{
              border: none;
              color: white;
              font-weight: 600;
              border: 2px solid #F26930;
              background-color: #F26930;
            }
        }
      }
    }

</style>

