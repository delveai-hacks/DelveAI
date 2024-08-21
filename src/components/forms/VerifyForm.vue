<script setup lang="ts">
import baseurl from '@/api';
import { toastSuccess, toastError } from '@/helper';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter()

const codeone = ref(null) as any;
const codetwo = ref(null) as any;
const codethree = ref(null) as any;
const codefour = ref(null) as any;

const inputone = ref("");
const inputtwo = ref("");
const inputthree = ref("");
const inputfour = ref("");

const focusOne = () => {
  codeone.value.focus();
};

const moveOne = () => {
  if (inputone.value.length == 1) {
    codetwo.value.focus();
  } else {
    codeone.value.focus();
  }
};

const moveTwo = () => {
  if (inputtwo.value.length == 1) {
    codethree.value.focus();
  } else {
    codetwo.value.focus();
  }
  if (inputtwo.value.length == 0) {
    codeone.value.focus();
  }
};

const moveThree = () => {
  if (inputthree.value.length == 1) {
    codefour.value.focus();
  } else {
    codethree.value.focus();
  }
  if (inputthree.value.length == 0) {
    codetwo.value.focus();
  }
};

const moveFour = () => {
  if (inputfour.value.length == 1) {
    codefour.value.blur();
  } else {
    codefour.value.focus();
  }
  if (inputfour.value.length == 0) {
    codethree.value.focus();
  }
};

const verifyEmail = async () => {
  if (inputone.value !== '' && inputtwo.value !== '' && inputthree.value !== '' && inputfour.value !== '') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await baseurl.post('/auth/verify', {
        email: localStorage.getItem('email'),
        code: `${inputone.value}${inputtwo.value}${inputthree.value}${inputfour.value}`
      })
      toastSuccess('Successfully verified your account')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err: any) {
      toastError('Error verifying your account.')
    }
  } else {
    toastError('Fill in the otp inputs')
  }
}

const resendCode = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await baseurl.put('/auth/resend_code', {
      email: localStorage.getItem('email'),
    })
    toastSuccess(`Sent the code to ${localStorage.getItem('email')}`)
  } catch (err: any) {
    toastError(`Error resending code to ${localStorage.getItem('email')}`)
  }
}

onMounted(() => {
  focusOne()
})
</script>

<template>
  <div class="w-full">
    <div class="mb-[35px] md:mb-[120px]"><img draggable="false" src="/landingpage/logo.svg" /></div>
    <div class="mx-auto w-[80.002px] h-[80.002px] mb[13px]"><img draggable="false" src="/landingpage/mailicon.svg" />
    </div>
    <div
      class="text-[#101828] mb-[19px] text-center w-fit mx-auto text-[24px] md:text-[28px] font-[500] tracking-[-0.56px]">
      Enter Verification Code
    </div>
    <div
      class="text-[#667085] mb-[53px] text-center text-[16px] md:text-[20px] font-[500] leading-[normal] tracking-[-0.4px]">
      We&apos;ve sent a code to <span class="text-[#1e73be]">prince.ojas38@gmail.com</span>
    </div>
    <!-- flex inputs -->
    <div class="w-fit mb-[58px] space-x-[5.6px] md:mx-auto md:w-fit mx-auto flex items-center">
      <div class="w-[55px] md:w-[76px] h-[55px] md:h-[76px]">
        <input type="text" minlength="1" maxlength="1" ref="codeone" v-model="inputone" @keyup="moveOne"
          class="px-[5.6px] text-[#d0d5dd] text-[33.4px] h-full leading-[42px] tracking-[-0.672px] inter font-[500] text-center w-full rounded-[5.6px] border-[0.7px] border-[#d0d5dd] py-[1.4px] bg-[#fff] focus:outline-none" />
      </div>
      <div class="w-[55px] md:w-[76px] h-[55px] md:h-[76px]">
        <input type="text" minlength="1" maxlength="1" ref="codetwo" v-model="inputtwo" @keyup="moveTwo"
          class="px-[5.6px] text-[#d0d5dd] text-[33.4px] h-full leading-[42px] tracking-[-0.672px] inter font-[500] text-center w-full rounded-[5.6px] border-[0.7px] border-[#d0d5dd] py-[1.4px] bg-[#fff] focus:outline-none" />
      </div>
      <div class="w-[55px] md:w-[76px] h-[55px] md:h-[76px]">
        <input type="text" minlength="1" maxlength="1" ref="codethree" v-model="inputthree" @keyup="moveThree"
          class="px-[5.6px] text-[#d0d5dd] text-[33.4px] h-full leading-[42px] tracking-[-0.672px] inter font-[500] text-center w-full rounded-[5.6px] border-[0.7px] border-[#d0d5dd] py-[1.4px] bg-[#fff] focus:outline-none" />
      </div>
      <div class="w-[55px] md:w-[76px] h-[55px] md:h-[76px]">
        <input type="text" minlength="1" maxlength="1" ref="codefour" v-model="inputfour" @keyup="moveFour"
          class="px-[5.6px] text-[#d0d5dd] text-[33.4px] h-full leading-[42px] tracking-[-0.672px] inter font-[500] text-center w-full rounded-[5.6px] border-[0.7px] border-[#d0d5dd] py-[1.4px] bg-[#fff] focus:outline-none" />
      </div>
    </div>
    <!-- end flex box inputs -->
    <button @click="verifyEmail"
      class="rounded-[10.658px] bg-[#1e73be] py-[6px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]">
      Verify
    </button>
    <div class="w-fit text-center mx-auto text-[#667085] text-[16px] font-[500] leading-[31px]">
      Having issues receiving code?
      <span @click="resendCode" class="text-[#1e73be] md:cursor-pointer">
        Resend
      </span>
    </div>
    <!-- end verify button -->
  </div>
</template>
