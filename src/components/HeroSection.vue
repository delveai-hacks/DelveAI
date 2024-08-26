<script setup lang="ts">
//@ts-ignore
import PurposeHint from './PurposeHint.vue'
</script>

<template>
 <div class="pt-[120px] md:pt-[130px] lg:pt-[150px]">
  <div class="w-full mb-[0px] md:mb-[0px]">
   <div class="w-full">
    <div class="w-full">
     <div
      class="w-full md:w-[796px] lg:w-[898px] mx-auto text-[#101828] text-[24px] md:text-center md:text-[42px] lg:text-[40px] font-[900] leading-[normal] tracking-[-0.56px] md:tracking-[-0.84px] mb-[24px] lg:uppercase">
      Summarize PDFs, convert text to speech,
      get answers to your questions and review your
      codes with Delve AI.
     </div>
    </div>
    <!-- button to try delve -->
    <div
     class="button_shadow text-[#fff] text-[14px] font-[700] leading-[31.975px] w-fit md:mx-auto rounded-[10.658px] bg-[#1e73be] py-[8px] px-[23.981px] md:cursor-pointer mb-[27px] md:mb-[0px]">
     Try out Delve AI
    </div>
    <!-- end button to try delve -->
    <div class="w-full h-[224.637px] md:w-[70%] lg:w-[982px] md:h-[752.5px] mx-auto">
     <img draggable="false" src="/delvemockup.png" class="w-full h-full object-contain" />
    </div>
    <!-- end delve frame mockup -->
   </div>
   <!--  -->
  </div>
  <!-- our purpose -->
  <div class="mt-[135px] md:mt-[0px]">
   <div
    class="text-[#1e73be] mb-[17px] uppercase text-[14px] md:text-[16px] font-[500] text-center mx-auto tracking-[-0.32px]">
    our purpose
   </div>
   <div
    class="text-[#101828] md:w-[327px] md:mx-auto text-center mx-auto text-[20px] md:text-[24px] font-[700] tracking-[-0.48px] mb-[32px] md:mb-[57px]">
    The Power of AI in Document Management
   </div>
   <PurposeHint />
  </div>
  <!-- end our purpose -->
 </div>
</template>

<style scoped>
.button_shadow {
 box-shadow: 0px 1.332px 2.665px 0px rgba(16, 24, 40, 0.05);
}
</style>
