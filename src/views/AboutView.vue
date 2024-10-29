<template>
  <div class="about">
    
      <div class="contentswrap">
        <!-- 컴포넌트 출력 -->
        <!-- 상단 큰 이미지 -->
        <div class="mainimg" v-if="randomArticle">
          <div class="img-summary">
          <h3>{{  randomArticle.title }}</h3> 
          <p class="summary">{{  randomArticle.summary }}</p>
          </div>
          <figure><img :src="randomArticle.image_url" alt="기사 이미지"></figure>
        </div>
       
       

       <!-- 장르별 탭 부분 -->
       <div class="genre-seciton-global">
          <div className='menuwrap' >
              <ul>
                  <li v-for="category in categories" :key="category">
                    <a :class="{ actived: activeCategory === category }" @click="changeCategory(category)">#{{ category }}</a>
                  </li>
              </ul>
          </div>
          <div class="text-row" v-for="(article, index) in visibleSection" :key="index" :class="{ 'last-row': index === visibleSection.length - 1 }">
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
          </div>
          
          <!-- 더보기 버튼 -->
          <button v-if="hasMoreSectionArticles" @click="showMoreSection" class="more-button" style="margin-top: 30px;">더보기</button>
      </div>

      <!-- 뉴스 기사 텍스트 스와이퍼 -->
      <swiper :slides-per-view="1" :navigation="true" :modules="modules" :pagination="{ clickable: true }" @slideChange="onSlideChange">
        <swiper-slide v-for="(article, index) in articles" :key="index">
          <div class="textlist-wrap">
              <h3>{{ article.title }}</h3>
          </div>
        </swiper-slide>
       </swiper>


        <!-- 하위 작은 이미지 -->
        <div class="listbox">
           <div v-for="(article, index) in visibleArticles" :key="index" class="list-wrap">
                <figure><img :src='article.image_url' alt="기사 이미지"></figure>
                <div class="img-explain">
                <h3>{{ article.title }}</h3> 
                <p class="editrow">{{ article.summary }}</p>
                </div>
           </div>
        <!-- 더보기 버튼 -->
        <button v-if="hasMoreArticles" @click="showMore" class="more-button">더보기</button>
       </div>
      
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper-bundle.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Swiper 모듈 추가
// SwiperCore.use([Navigation, Pagination]);


export default {
  name: 'AboutView',
  props:['aaa'],
  setup() {
      return {
        modules: [Navigation, Pagination],
      };
    },
  data(){
        return { 
          randomArticle: null, // 랜덤으로 선택된 기사를 저장할 변수
          articles: [], // API에서 받아온 데이터를 저장할 변수
          isibleCount: 4, // 기본 visibleCount
          sectionVisibleCount: 4, // 섹션 탭에 대한 visibleCount
          listVisibleCount: 4, // listbox에 대한 visibleCount
          activeCategory: 'politics', // 기본 선택된 카테고리
          categories: ['politics', 'economy', 'society', 'culture', 'world', 'tech', 'entertainment', 'opinion'],
          section:[]
        };
    },
    computed: {
      visibleArticles() {
        return this.articles.slice(0, this.listVisibleCount); // listbox에 대한 visibleCount
       },
       visibleSection() {
        return this.section.slice(0, this.sectionVisibleCount); // 섹션에 대한 visibleCount
      },
      filteredArticles() {
        const filtered = this.articles.filter(article => article.category === this.mapCategoryToApi(this.activeCategory));
        console.log(filtered);
        return filtered;
      },
      hasMoreArticles() {
        return this.articles.length > this.listVisibleCount; // listbox의 더보기 버튼
      },
      hasMoreSectionArticles() {
        return this.section.length > this.sectionVisibleCount; // 섹션의 더보기 버튼
      },
    },
    created(){
      this.apiRequest(this.mapCategoryToApi(this.activeCategory)); // 초기 카테고리로 API 요청
      this.apiRequest2('politics'); // 초기 카테고리로 API 요청
      // this.fetchArticles();
    },
    components: {
        Swiper,
        SwiperSlide,
      },
    methods: {
    async apiRequest(category) {
      console.log(category);
      try {
        const res = await axios.get(`https://express-server-mocha-beta.vercel.app/news/global?keyword=${category}`);
        // console.log(res.data); 응답 데이터 확인
        if (res.data && res.data.data) {
            this.articles = res.data.data.filter(article => article.image_url);
            this.selectRandomArticle();
        } else {
            console.error("응답 데이터 구조가 예상과 다릅니다:", res.data);
        }
       } catch (error) {
        console.error("API 요청 오류:", error);
      }
    },
    async apiRequest2(category) {
      console.log(category)
      try {
        const res = await axios.get(`https://express-server-mocha-beta.vercel.app/news/section?m=global-articles&s=${category}`);
        this.section = res.data.data;
      } catch (error) {
        console.error("API 요청 오류:", error);
      }
    },
   selectRandomArticle() {
    if (this.articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.articles.length);
      this.randomArticle = this.articles[randomIndex];
    }
  },
  showMore() {
    this.listVisibleCount += 5; // listbox에 대한 더보기
  },

  showMoreSection() {
    this.sectionVisibleCount += 4; // 섹션에 대한 더보기
  },
  changeCategory(category) {
    
    this.activeCategory = category;
    this.visibleCount = 3;
    this.apiRequest2(this.mapCategoryToApi(category)); // 선택한 카테고리로 API 요청
  },
  mapCategoryToApi(category) {
    const categoryMap = {
      'politics': 'politics',
      'economy': 'economy',
      'society': 'society',
      'culture': 'culture',
      'world': 'world',
      'tech': 'tech',
      'entertainment': 'entertainment',
      'opinion': 'opinion'
    };
    return categoryMap[category];
     }
   }
     
}
</script>

<style lang="scss">
.contentswrap{
  margin: 0 auto;
  width: calc(100% - 40px);
  padding-bottom: 50px;
  .mainimg{
  margin-bottom: 30px;
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
    h3{margin: 0;
      text-align: left;}
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
  height: 140px; /* 슬라이드 높이 조정 */
  padding: 10px 0;
}
.swiper-wrapper{
  color: white;
  .swiper-slide{
    width: 100%;
    display: flex;
    align-items: center;
  .textlist-wrap{
      width: 100%;
      h3{
        margin: 0 auto;
        text-align: center;
        width: 75%;
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
.swiper-pagination-bullet-active{
  background-color: white;
}

// 장르별 탭
.genre-seciton-global{
  margin-bottom: 30px;
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
.text-row{
    border-bottom: 1px solid #ddd;
    padding-bottom: 30px;
    margin: 20px 0 0 0;
    &.last-row{
      border:none; /* 마지막 항목의 border 제거 */
      padding-bottom: 0; 
    }
    h3{
      margin: 0 auto 10px;
      text-align: center;
      width:85%;
    }
   p{   margin: 0;
        padding:0 10px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis; /* ...으로 표시 */
        line-height: 1.5em; /* 줄 높이 설정 (필요에 따라 조정) */
        max-height: 6em; /* 최대 높이 설정 */
   }
  }
}
//하단 컨텐츠
.listbox{
  border-top: 2px solid #F26930;
  padding-top:50px;
  margin: 50px 0 0;
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
  padding: 10px 40px;
  border-radius: 99px;
  color: white;
  background-color: #F26930;
  border: none;}



</style>

