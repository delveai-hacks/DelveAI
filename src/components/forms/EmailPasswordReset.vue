<script setup lang="ts">
import baseurl from '@/api';
import { toastSuccess, toastError } from '@/helper';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const email = ref("")
const button = ref(false)

const btnText = ref(true)
const btnSpin = ref(false)

const checkField = () => {
 if (email.value !== "") {
  button.value = true;
 } else {
  button.value = false;
 }
}

const sendCode = async () => {
 if (email.value !== "") {
  button.value = false;
  btnText.value = false;
  btnSpin.value = true;
  try {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const res = await baseurl.put('/auth/resend_code', {
    email: email.value,
   })
   toastSuccess(`Sent the code to ${email.value}`)
   button.value = true;
   btnText.value = true;
   btnSpin.value = false;

   localStorage.setItem('email', email.value)
   setTimeout(() => {
    router.push('/forgot-password-verify')
   }, 1500)
  } catch (err: any) {
   toastError(`Error resending code to ${email.value}`)
   button.value = true;
   btnText.value = true;
   btnSpin.value = false;
  }
 } else { return null }
}
</script>


<template>
 <div class="w-full">
  <div class="mb-[35px] md:mb-[140px]"><img draggable="false" src="/landingpage/logo.svg" /></div>
  <div
   class="text-[#101828] text-[20px] md:text-[28px] font-[700] tracking-[-0.4px] md:tracking-[-0.56px] mb-[8px] md:mb-[12px]">
   Reset Password
  </div>
  <div
   class="text-[#667085] text-[18px] md:text-[20px] font-[400] tracking-[-0.36px] md:tracking-[-0.4px] mb-[24px] md:mb-[44px]">
   Can&apos;t remember your password? Let&apos;s
   get it back.
  </div>
  <!-- forms -->
  <div class="mb-[24px] md:mb-[32px]">
   <div class="text-[#344054] text-[16px] font-[500] leading-[20px] mb-[6px]">
    Email
   </div>
   <div class="w-full">
    <input @keyup="checkField" v-model="email" type="text" placeholder="olivia@untitledui.com"
     class="w-full py-[10px] px-[14px] text-[#667085] text-[14px] font-[400] leading-[24px] bg-[#fff] rounded-[8px] border border-[#d0d5dd] focus:outline-none" />
   </div>
  </div>
  <!-- end forms -->
  <button @click="sendCode"
   :class='button ? "rounded-[10.658px] bg-[#1e73be] py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]" : "rounded-[10.658px] bg-gray-100 py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]"'>
   <div v-show="btnText">Reset password</div>
   <div v-show="btnSpin" class="w-[20px] h-[20px] mx-auto"><img src="/spin.svg" class="w-full h-full spin" /></div>
  </button>
  <!-- end button -->
 </div>
</template>


<style scoped>
.spin {
 animation: 2s spin infinite linear;
}

@keyframes spin {
 0% {
  transform: rotate(0deg);
 }

 100% {
  transform: rotate(360deg);
 }
}
</style>
