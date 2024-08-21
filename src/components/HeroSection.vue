<script setup lang="ts">
//@ts-ignore
import PurposeHint from './PurposeHint.vue'
</script>

<template>
 <div class="pt-[120px] md:pt-[180px] lg:pt-[230px]">
  <div class="w-full mb-[0px] md:mb-[0px]">
   <div class="w-full md:h-[70vh] lg:h-[73vh]">
    <div class="w-full">
     <div
      class="w-full md:w-[796px] mx-auto text-[#101828] text-[28px] text-center md:text-[42px] lg:text-[40px] font-[900] leading-[normal] tracking-[-0.56px] md:tracking-[-0.84px] mb-[24px] lg:uppercase">
      Summarize PDFs, convert text to speech, and get answers to your questions with Delve AI.
     </div>
    </div>
    <div
     class="w-[95%] z-[30] relative flex items-center justify-between mx-auto md:w-[497px] rounded-[8px] md:rounded-[13px] border border-[#F1F1F3] bg-[#fff] py-[3px] pl-[9px] md:pl-[14px] pr-[3px]">
     <div class="text-[#667085] text-[12px] font-[500] leading-[20.845px]">
      attach pdf, ask a question ...
     </div>
     <div class="flex items-center space-x-[8px]">
      <div><img src="/landingpage/attach.svg" class="md:cursor-pointer" /></div>
      <div
       class="text-[#fff] text-[13px] font-[500] leading-[20.845px] py-[9px] px-[15px] bg-[#1E73BE] rounded-[6px] text-center md:cursor-pointer">
       Try me
      </div>
     </div>
    </div>
   </div>
   <!-- mobimage -->
   <div class="w-full mt-[17px] md:hidden h-[250.698px] px-[6px]">
    <img src="/landingpage/mobimage.png" class="w-full h-full" />
   </div>
   <!-- end mobimage -->
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
