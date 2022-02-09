import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'minhsin';
let productModal = {};

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct:{
        imagesUrl:[],
      },
    }
  },
  methods: {
    checkLogin() {
      // 取出 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common['Authorization'] = token;
      const url = `${site}api/user/check`;
      axios.post(url)
       .then(res => {
        this.getProducts();
      });
    },
    getProducts() {
      const url = `${site}api/${api_path}/admin/products/all`;
      axios.get(url)
        .then( res=> {
          this.products = res.data.products;
          //console.log(Object.values(this.products)) 物件轉陣列
          // Object.values(this.products).forEach((item) => {
          //     console.log(item);
          // })//物件跑迴圈
        });
    },
    openModal(){
      productModal.show();
    }
  },
  mounted() {
    this.checkLogin();
    productModal = new bootstrap.Modal(document.getElementById('productModal')); 
  } 
});

app.mount('#app');
