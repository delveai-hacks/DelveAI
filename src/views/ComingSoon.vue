<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
 router.push('/prompt')
}
</script>

<template>
 <main class="bg-[#fff] px-[16px] md:px-[0px] flex justify-center items-center w-full min-h-[100vh]">
  <div class="w-full md:w-[570px] md:mx-auto">
   <div class="w-fit h-fit mx-auto md:cursor-pointer mb-[10px]">
    <img @click="goBack" src="/back.svg" />
   </div>
   <div
    class="text-[#1d1f16] text-center text-[30px] md:text-[42px] font-[700] md:leading-[42px] md:tracking-[-0.84px] mb-[18px]">
    Coming Soon
   </div>
   <div class="text-[#54564b] text-center text-[12px] md:text-[14px] font-[400] leading-normal">
    You're about to experience a smarter way to review your code, get permanent chats and faster load time. Delve
    Check is here to help you catch issues
    early, and optimize your code X2.
   </div>
  </div>
 </main>
</template>
