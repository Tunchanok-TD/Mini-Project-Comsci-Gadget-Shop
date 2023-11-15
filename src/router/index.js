import { createRouter, createWebHistory } from "vue-router";
//Front-End
import Registration from "@/views/FrontEnd/Registration.vue";
import Login from "@/views/FrontEnd/Login.vue";
import MainLayout from "@/layouts/FrontEnd/MainLayout.vue";

import Product from "@/views/FrontEnd/Product.vue";
import About from "@/views/FrontEnd/About.vue";
import Cart from "@/views/FrontEnd/Cart.vue";
import ProductDetails from "@/views/FrontEnd/ProductDetails.vue";
import PlaceOrder from "@/views/FrontEnd/PlaceOrder.vue";

const routes = [
    //Front-End Pages
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/registration",
      name: "Registration",
      component: Registration,
    },
    {
      path: "/",
      name: "main",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "Product",
          component: Product,
          meta: {
            title: "Product",
          },
        },
  
        {
          path: "/about",
          name: "About",
          component: About,
          meta: {
            title: "About",
          },
        },
        {
          path: "/cart",
          name: "Cart",
          component: Cart,
          meta: {
            title: "Cart",
          },
        },
        {
          path: "/products/:id",
          name: "ProductDetails",
          component: ProductDetails,
          meta: {
            title: "Product Detail",
          },
        },
        {
          path: "/placeorder",
          name: "PlaceOrder",
          component: PlaceOrder,
          meta: {
            title: "Place Order",
          },
        },
      
      ],
    },
    // ... other paths ...
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.URL),
    routes,
  });
  
  router.beforeEach((to, _, next) => {
    if (typeof to.meta.title == "string") {
      document.title = "ComSci Book Shop : " + to.meta.title;
    }
  
    next();
  });
  
  export default router;