<script setup lang="ts">
//@ts-ignore
import HeaderComp from '../../components/HeaderComp.vue'
//@ts-ignore
import HeroSection from '../../components/HeroSection.vue'
</script>

<template>
 <main class="bg-[#fff]">
  <div class="px-[16px] md:px-[47px]">
   <HeaderComp />
  </div>
  <div class="px-[16px] md:px-[47px]">
   <HeroSection />
  </div>
  <!-- footer -->
  <div class="w-full pt-[10px] px-[16px] md:px-[47px] footer">
   <div
    class="w-fit mx-auto text-center text-[#667085] text-[16px] md:text-[24px] font-[500] tracking-[-0.32px] leading-[normal] mb-[5px]">
    Ask . Summarize . Convert
   </div>
   <div
    class="text-[#101828] text-[28px] md:text-[44px] text-center w-fit mx-auto font-[700] tracking-[-0.56px] leading-[normal] mb-[11px] md:mb-[19px]">
    Experience Delve AI
   </div>
   <div
    class="w-fit text-[#fff] text-[14px] md:text-[20px] rounded-[10px] bg-[#1E73BE] py-[12px] px-[23px] md:cursor-pointer leading-[31.975px] mx-auto mb-[20px]">
    Get started for free
   </div>
   <div class="w-[172px] md:w-[535px] h-[100px] md:h-[250px] mx-auto">
    <img src="/landingpage/paperimage.png" class="w-full h-full" />
   </div>
  </div>
  <!-- end footer -->
 </main>
</template>

<style scoped>
.footer {
 border-top: 0.1px solid rgba(69, 148, 216, 0.2);
}
</style>
