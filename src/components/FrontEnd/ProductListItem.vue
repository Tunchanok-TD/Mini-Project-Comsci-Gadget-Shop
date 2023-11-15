<template>
  <div class="col-lg-4 col-md-6 col-sm-4 mb-4">
    <div class="card h-100">
      <div class="text-center mt-2">
        <router-link
          :to="{ name: 'ProductDetails', params: { id: product.product_id } }"
        >
          <img
            :src="apiUrl + '/products/picture/' + product.product_id + '/1'"
            style="width: 200px"
            class="card-img-top"
            alt="..."
          />
        </router-link>
      </div>

      <div class="card-body">
        <!-- <router-link :to="{ name: 'BookDetail', params: { id: product.product_id }}"> -->

        <h5 class="card-title fw-bold fs-5">{{ product.product_title }}</h5>

        <!-- </router-link> -->
        <p class="card-text text-black">
          {{ product.product_description.substring(0, 100) + " ..." }}
        </p>
        <!-- 
                -->
                
        <div class="row">
          <div class="col-4 fs-5 fw-bold text-start text-primary">
            {{ product.product_price }} ฿
          </div>
          <div class="col-8 text-end">
            <button class="btn btn-primary" @click="store.addToCart(product)">
              <i class="bi bi-cart-check"></i> เพิ่มลงรถเข็น
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShoppingStore } from "@/stores/index";

const store = useShoppingStore();

const props = defineProps(["product"]);
const product = props.product;
const apiUrl = import.meta.env.VITE_API_URL;
</script>

<style></style>
