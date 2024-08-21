<script setup lang="ts">
//@ts-ignore
import SignupForm from '../../components/forms/SignupForm.vue'
</script>

<template>
 <main class="md:flex md:space-x-[136px] py-[42px] px-[16px] md:py-[102px] md:px-[112px]">
  <!-- first flex form -->
  <div class="w-full md:w-[488px]">
   <SignupForm />
  </div>
  <!-- end first flex form -->
  <div
   class="hidden md:block md:h-fit md:w-[calc(100%-488px)] border bg-[#fbf9f9] rounded-[24px] px-[24px] overflow-hidden">
   <div
    class="text-[#101828] mb-[10] md:mb-[20px] md:w-fit md:mx-auto text-center text-[20px] md:text-[24px] font-[700] leading-[normal] tracking-[-0.4px] md:mt-[86px]">
    Summarize PDFs in Seconds
   </div>
   <div
    class="text-[#667085] lg:w-[445px] lg:mx-auto text-[14px] md:text-[14px] font-[500] text-center leading-[normal] tracking-[-0.36px] mb-[16px] md:mb-[32px]">
    Transform lengthy documents into concise summaries. Save time and get straight to the point.
   </div>
   <div class="w-full md:h-full rounded-[18px] overflow-hidden">
    <img draggable="false" loading="lazy" src="/landingpage/phonemockup.png" class="w-full h-full" />
   </div>
  </div>
  <!-- end second flex -->
 </main>
</template>
