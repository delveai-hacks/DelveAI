<script setup lang="ts">
import { ref, reactive } from 'vue'

const text = ref(true)
const spin = ref(false)
const button = ref(true)

const user = reactive({
 password: "",
 repassword: ""
})

const checkFields = () => {
 if ((user.password && user.repassword !== "") && (user.password === user.repassword)) {
  button.value = false;
 } else {
  button.value = true;
 }
}
</script>

<template>
 <div class="w-full md:mt-[100px]">
  <div class="mb-[35px] md:mb-[29px]"><img draggable="false" src="/landingpage/logo.svg" /></div>
  <div
   class="text-[#101828] text-[20px] md:text-[28px] font-[700] tracking-[-0.4px] md:tracking-[-0.56px] mb-[8px] md:mb-[12px]">
   Set new password
  </div>
  <div
   class="text-[#667085] text-[18px] md:text-[20px] font-[400] tracking-[-0.36px] md:tracking-[-0.4px] mb-[24px] md:mb-[44px]">
   Must be at least 8 characters.
  </div>
  <!-- forms -->
  <div class="mb-[24px]">
   <div class="text-[#344054] text-[16px] font-[500] leading-[20px] mb-[6px]">
    Password
   </div>
   <div class="w-full">
    <input @keyup="checkFields" v-model="user.password" placeholder="************" type="password"
     class="w-full py-[10px] px-[14px] text-[#667085] text-[14px] font-[400] leading-[24px] bg-[#fff] rounded-[8px] border border-[#d0d5dd] focus:outline-none" />
   </div>
  </div>
  <div class="mb-[24px]">
   <div class="text-[#344054] text-[16px] font-[500] leading-[20px] mb-[6px]">
    Confirm Password
   </div>
   <div class="w-full">
    <input @keyup="checkFields" v-model="user.repassword" type="password" placeholder="************"
     class="w-full py-[10px] px-[14px] text-[#667085] text-[14px] font-[400] leading-[24px] bg-[#fff] rounded-[8px] border border-[#d0d5dd] focus:outline-none" />
   </div>
  </div>
  <!-- button -->
  <button
   :class='button ? "rounded-[10.658px] bg-gray-100 py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]" : "rounded-[10.658px] bg-[#1e73be] py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]"'>
   <div v-show="text">Reset password</div>
   <div v-show="spin" class="w-[20px] h-[20px] mx-auto"><img src="/spin.svg" class="w-full h-full spin" /></div>
  </button>
  <div class="w-fit text-center mx-auto text-[#667085] text-[16px] font-[500] leading-[31px]">
   Don&apos;t have an account?
   <span class="text-[#1e73be] md:cursor-pointer">
    <router-link to="/create-account">Create one</router-link>
   </span>.
  </div>
  <!-- end forms -->
 </div>
</template>
