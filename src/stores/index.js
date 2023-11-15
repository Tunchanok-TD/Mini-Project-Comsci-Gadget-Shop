import {defineStore} from 'pinia'
import Swal from 'sweetalert2'
import {ref} from 'vue'

export const useShoppingStore = defineStore('shopping', () => {


    const cartItems=ref([])


    function addToCart(item) {
        // Add code : Add to cart
        const index = cartItems.value.findIndex((product) => product.product_id === item.product_id)
        if (index !== -1) {
            cartItems.value[index].quantity += 1
            Swal.fire({
                icon: 'success',
                title: `"${item.product_title}" ถูกปรับปรุงข้อมูลในตระกร้าสินค้า`,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            item.quantity = 1
            cartItems.value.push(item)
            Swal.fire({
                icon: 'success',
                title: `"${item.product_title}" ถูกเพิ่มไปยังตระกร้าสินค้า`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    function clearCart(){
        cartItems.value=[]
    }


    // Increment Quantity
    function incrementQ(item) {
        // Add code : Increment Quantity
        let index = cartItems.value.findIndex((product)=> product.product_id === item.product_id)
        if(index !== -1) {
            cartItems.value[index].quantity += 1
        }
    }


    // Decrement Quantity
    function decrementQ(item) {
        // Add code : Decrement Quantity
        let index = cartItems.value.findIndex((product)=> product.product_id === item.product_id)
        if(index !== -1) {
            if(cartItems.value[index].quantity > 1){
                cartItems.value[index].quantity -= 1
            }
        }
    }


    // Remove Item from Cart
    function removeFromCart(item) {
        // Add code : Remove Item from Cart
        console.log(item);
        cartItems.value = cartItems.value.filter((product)=> product.product_id !== item.product_id)

    }
  
    return { cartItems, addToCart, incrementQ, decrementQ,removeFromCart,clearCart }
  })
