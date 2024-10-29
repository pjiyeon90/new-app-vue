const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
//이렇게 설치하면 npm run serve로 시작 가능



//아래에 것으로 설치하면 SyntaxError
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// export default defineConfig({
//   plugins: [vue()],
//   define: {
//     __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // 또는 true로 설정
//   }
// });