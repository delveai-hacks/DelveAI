<template>
 <div class="fixed z-[100] w-[93%] md:w-[93%] bg-[#fff] md:pb-[10px]">
  <div
   class="w-full md:mx-auto flex items-center justify-between md:w-full lg:w-[884px] py-[5px] px-[8px] md:py-[9px] md:px-[14px] rounded-[16px] md:rounded-[0px] border border-[#F1F1F3] md:border-[transparent] bg-[#fafafa] md:bg-[#fff] lg:bg-[#fafafa] lg:border lg:border-[#f1f1f3] lg:rounded-[16px] mt-[23px] md:mt-[25px]">
   <div><img draggable="false" src="/landingpage/logo.svg" /></div>
   <div class="flex items-center space-x-[10px]">
    <div class="text-[#667085] text-[12px] font-[500] leading-[24px] md:cursor-pointer">
     <router-link to="/login">Login</router-link>
    </div>
    <div
     class="text-[#fff] text-[12px] font-[500] leading-[24px] py-[5px] px-[18px] bg-[#1E73BE] border border-[#1E73BE] rounded-[8px] md:cursor-pointer">
     <router-link to="/create-account">Sign up</router-link>
    </div>
   </div>
  </div>
 </div>
</template>

<style scoped></style>
