<template>
  <div class="row mt-4">
    <div class="col-md-4">
      <img
        :src="image"
        class="card-img-top rounded"
        alt="..."
        id="img_detail"
      />
    </div>
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-8 mt-3">
          <h2 class="fw-bold mb-4">{{ product?.product_title }}</h2>
        </div>
        <div class="col-md-4 text-end">
          <router-link to="/" class="btn btn-secondary"
            ><i class="bi bi-caret-left"></i> กลับหน้าหลัก
          </router-link>
        </div>
      </div>
      <h5 class="fw-bold text-success">ข้อมูลสินค้า</h5>
      <p style="white-space: pre-line">{{ product?.product_description }}</p>
      <div><b>จำนวนสินค้า</b> : <span id="count_product">{{product_count}}</span></div>
      <!-- <div><b>-</b><input type="text"></div> -->
      <!-- ปุ่มเปลี่ยนสี -->
      <div class="product-info">
        <div v-for="variant in variants">
          <div style="padding: 2px;margin: 2px;border: 2px solid; width: 10%; text-align: center;"
            v-on:mouseover="updatedImage(variant.image,variant.count)"
            v-if="variant?.name_color != ''"
          >{{variant?.name_color}}</div>
        </div>
      </div>
      <!--  -->
      <div class="row mt-4">
        <div class="col text-start">
          <h5 class="card-text text-primary fw-bold">
            ราคา: {{ product?.product_price }} ฿
          </h5>
        </div>
        <div class="col text-end">
          <button class="btn btn-primary" @click="store.addToCart(product)">
            <i class="bi bi-cart-check"></i> เพิ่มลงรถเข็น
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

import { useCookies } from "vue3-cookies";

import { useShoppingStore } from "@/stores/index";

// Add Code : import axios
import axios from "axios";

const store = useShoppingStore();

const route = useRoute();
let id = Number(route.params.id);
var image = ref("");
var product_count = ref(0);
var variants = [];
// use cookie
const { cookies } = useCookies();
const token = cookies.get("token");

const apiUrlImage = import.meta.env.VITE_API_URL;

//Modify Code : Declare book as null
const product = ref(null);


// ฟังชั่นเปลี่ยนรูปภาพ กับ จำนวนสต๊อกสี
function updatedImage(img,count) {
  document.getElementById("img_detail").src = img;
  document.getElementById("count_product").innerText = count;
}

//ตั้งค่าภาพหลัก
function setImg(item){
    if(item.product_color_1_name != ''){
        image = apiUrlImage + "/products/picture/" + item.product_id + "/1";
        product_count = item.product_color_1_in_stock;
    }else if(item.product_color_2_name != ''){
        image = apiUrlImage + "/products/picture/" + item.product_id + "/2";
        product_count = item.product_color_2_in_stock;
    }else{
        image = apiUrlImage + "/products/picture/" + item.product_id + "/3";
        product_count = item.product_color_3_in_stock;
    }
    
}

// console.log(product);
const apiUrl = import.meta.env.VITE_API_URL + "/products/" + id;
onMounted(async () => {
  // Add Code : Get book data
  const response = await axios.get(apiUrl, {
    headers: { Authorization: "bearer " + token },
  });
  product.value = response.data.data[0];
  setImg(product.value);
 




  variants = [
    {
      color: "black",
      image:
        apiUrlImage + "/products/picture/" + product.value.product_id + "/1",
      name_color: product.value.product_color_1_name.trim(),
      count:product.value.product_color_1_in_stock
    },
    {
      color: "blue",
      image:
        apiUrlImage + "/products/picture/" + product.value.product_id + "/2",
      name_color: product.value.product_color_2_name.trim(),
      count:product.value.product_color_2_in_stock
    },
    {
      color: "light",
      image:
        apiUrlImage + "/products/picture/" + product.value.product_id + "/3",
      name_color: product.value.product_color_3_name.trim(),
      count:product.value.product_color_3_in_stock
    },
  ];
});
</script>
<style scoped></style>
