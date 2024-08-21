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

const emailinuse = ref("") as any

const text = ref(true)
const spin = ref(false)
const button = ref(true)

const focusOne = () => {
  codeone.value.focus();
};

const moveOne = () => {
  checkFields()
  if (inputone.value.length == 1) {
    codetwo.value.focus();
  } else {
    codeone.value.focus();
  }
};

const moveTwo = () => {
  checkFields()
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
  checkFields()
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
  checkFields()
  if (inputfour.value.length == 1) {
    codefour.value.blur();
  } else {
    codefour.value.focus();
  }
  if (inputfour.value.length == 0) {
    codethree.value.focus();
  }
};

const checkFields = () => {
  if (inputone.value !== '' && inputtwo.value !== '' && inputthree.value !== '' && inputfour.value !== '') {
    button.value = false;
  } else {
    button.value = true;
  }
}

const verifyEmail = async () => {
  if (inputone.value !== '' && inputtwo.value !== '' && inputthree.value !== '' && inputfour.value !== '') {
    text.value = false;
    spin.value = true;
    button.value = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await baseurl.post('/auth/verify', {
        email: localStorage.getItem('email'),
        code: `${inputone.value}${inputtwo.value}${inputthree.value}${inputfour.value}`
      })
      toastSuccess('Successfully verified your account')
      text.value = true;
      spin.value = false;
      button.value = false;

      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err: any) {
      text.value = true;
      spin.value = false;
      button.value = false;
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
  focusOne();
  emailinuse.value = localStorage.getItem('email');
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
      We&apos;ve sent a code to <span class="text-[#1e73be]">{{ emailinuse || "example+214@gmail.com" }}</span>
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
      :class='button ? "rounded-[10.658px] bg-gray-100 py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]" : "rounded-[10.658px] bg-[#1e73be] py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]"'>
      <div v-show="text">Verify</div>
      <div v-show="spin" class="w-[20px] h-[20px] mx-auto"><img src="/spin.svg" class="w-full h-full spin" /></div>
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
