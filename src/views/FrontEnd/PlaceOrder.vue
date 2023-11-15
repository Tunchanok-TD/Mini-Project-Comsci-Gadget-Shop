<template>
    
    <div class="row my-3 w-75 mx-auto">
        <h2 class="fw-bold mb-4 mt-4">รายการสินค้าที่สั่งซื้อ</h2>
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อสินค้า</th>
                                <th class="text-end">จำนวนสินค้า</th>
                                <th class="text-end">ราคาสินค้าต่อชิ้น</th>
                                <th class="text-end">ราคารวมสินค้า</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in store.cartItems" :key="item.product_id">
                                <td>{{index+1}}</td>
                                
                                <td>
                                    {{item.product_title}}
                                </td>
                                <td class="text-end">
                                   
                                    {{ item.quantity }}
                                   
                                </td>
                                <td class="text-end">
                                    {{ Intl.NumberFormat('en-US').format(item.product_price) }} ฿
                                </td>
                                <td class="text-end">
                                    {{  Intl.NumberFormat('en-US').format(item.product_price * item.quantity) }} ฿
                                </td>
                         
                            </tr>
                            <tr>
                                <th colspan="4" class="text-end">
                                    รวมเป็นเงินทั้งหมด
                                </th>
                                <td colspan="1" class="text-end">
                                    <span class="fw-bold">
                                        {{  Intl.NumberFormat('en-US').format(store.cartItems.reduce((acc,item) => acc += item.product_price * item.quantity,0) ) }} ฿
                                    </span>
                                </td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class=" mx-auto">

        <Form @submit.prevent="submit" >
            <div class="container-fluid my-5">
                <!-- รายการสินค้าที่สั่งซื้อสินค้า -->
                <div class="row justify-content-center mt-5">
                    <div class="col-lg-4 text-start">
                        <router-link to='/cart' class="btn btn-secondary"><i class="bi bi-caret-left"></i> กลับไปรับตระกร้าสินค้า</router-link>
                
                    </div>
                    <div class="col-lg-5 text-end">
                        <button  @click="placeOrder()" class="btn btn-success"><i class="bi bi-paypal"></i> ยืนยันคำสั่งซื้อ</button>
                                

                    </div>
                                        
                </div>
            </div>
            
        </Form>
       
                               





    </div>
</template>

<script setup >

    import { useShoppingStore} from '@/stores/index'
    import { ref, onMounted } from 'vue'
    import { useCookies } from "vue3-cookies";

    import Swal from 'sweetalert2'

    import { useRouter } from 'vue-router'  

    // Add Code : import 'vee-validate'
    import { Field, Form, ErrorMessage } from 'vee-validate'
    // Add Code : import axios
    import axios from "axios"
    // userRoute() for redirect
    const router = useRouter();

    const store = useShoppingStore()




    // use cookie
    const { cookies } = useCookies()
    const token=cookies.get('token')
    const userid=cookies.get('userid')


    function validateEmail(value) {
        // if the field is empty
        if (!value) {
            return 'กรุณากรอกข้อมูลอีเมล์';
        }
        // if the field is not a valid email
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
            return 'อีเมล์ต้องอยู่ในรูปแบบที่ถูกต้อง';
        }
        // All is good
        return true;
    }

    function validateRequired (value) {
        return !!value || 'กรุณากรอกข้อมูลให้ครบถ้วน'
    } 




    const firstName=ref("")
    const lastName=ref("")
    const email=ref("")
    const phone=ref("")
    const address=ref("")

    async function placeOrder(){

        
        // Add Code : Check if form is valid
        if (
            validateRequired(firstName.value) == true &&
            validateRequired(lastName.value) == true &&
            validateRequired(email.value) == true &&
            validateEmail(email.value) == true &&
            validateRequired(phone.value) == true &&
            validateRequired(address.value) == true 
                ) {

                Swal.fire({
                        icon: "success",
                    title: "การสั่งซื้อสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(async (result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
            
                        store.clearCart()
                        await router.push({ path: "/orderhistory" })
                    }
                })
        }
    }








</script>

<style>
    i{
        cursor: pointer;
    }
</style>












