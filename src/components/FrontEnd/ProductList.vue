<template>
    <div className='row my-4'>

        <ProductListItem v-for="product in products" 
            :key="product.product_id" :product="product" />

    </div>
</template>

<script setup >
    import {  ref,onMounted } from 'vue'
    import ProductListItem from '@/components/FrontEnd/ProductListItem.vue'

    // Add Code : import axios
    import axios from "axios"
    // Add Code : import vue3-cookies
    import { useCookies } from "vue3-cookies"


    // Modify Code : Declare books as emply array (ref)
    const products=ref([])


    // Add Code : use cookies and get token from cookies
    const { cookies } = useCookies()
    const token=cookies.get('token')
    // console.log(token);

    const apiUrl= import.meta.env.VITE_API_URL+'/products'

    onMounted(async () => {
        // Add Code : Get books data
        const response = await axios.get(apiUrl,{ headers:{ Authorization: 'Bearer ' + token } });
        products.value =  response.data.data;
        // console.log(products);
    })
  
</script>

<style>
</style>