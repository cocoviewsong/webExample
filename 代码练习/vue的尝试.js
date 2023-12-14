const HelloVueApp = {
    data() {
      return {
        showMessage: true
      }
    },
    methods: {
      xiaoshi(){
        this.showMessage=! this.showMessage
      }
    },
  }
  
  Vue.createApp(HelloVueApp).mount('#hello-vue')