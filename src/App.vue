<template>
  <HeaderMenu/>
  <nav>
    <router-link to="/">국내</router-link> |
    <router-link to="/about">해외</router-link>
  </nav>
  <router-view/>
</template>



<script>
import HeaderMenu from "@/components/HeaderMenu";

export default {
  name: 'App',
  components: {
    HeaderMenu,
  }
}

</script>


<style lang="scss">
body{
  margin: 0 auto;
  width: calc(100% - 40px);
  // border: 1px solid #ebebeb;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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
  }
}
</style>
