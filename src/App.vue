<template>
  <HeaderMenu/>
  <nav v-if="isNav">
    <router-link to="/">국내</router-link> |
    <router-link to="/about">해외</router-link>
  </nav>
  <router-view  @isNav="isNavChange"/>
  <FooterSection/>
</template>



<script>
import HeaderMenu from "@/components/HeaderMenu";
import FooterSection from "@/components/FooterSection";

export default {
  name: 'App',
  components: {
    HeaderMenu, FooterSection
  },
  data(){
    return{ isNav:true }
  },
  methods:{
    isNavChange(n){
      this.isNav = n;
    }
  }
}

</script>


<style lang="scss">
body{
  min-width: 360px;
  max-width: 768px;
  height: 100vh;
  margin: 0 auto;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin: 0 auto;
  border-top: 2px solid #F26930;
  padding: 20px 0;
  text-align: left;   //왼쪽 정렬

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #F26930; 
    }
    &:first-child{
      margin-left: 20px;
    }
  }
}
</style>
