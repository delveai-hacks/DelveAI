<script setup lang="ts">
import baseurl from '@/api';
import { toastError, toastSuccess } from '@/helper';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter()

const text = ref(true)
const spin = ref(false)
const button = ref(false)

const user = reactive({
  email: '',
  password: ''
})

const login = async () => {
  if (user.email !== '' && user.password !== '') {
    text.value = false;
    spin.value = true;
    button.value = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await baseurl.post('/auth/login', {
        email: user.email,
        password: user.password
      })
      toastSuccess('Successfully logged in your account')
      localStorage.setItem('accessToken', res.data.access_token)
      localStorage.setItem('refreshToken', res.data.refresh_token)

      text.value = true;
      spin.value = false;
      button.value = false;

      setTimeout(() => {
        router.push('/prompt')
      }, 1500)
    } catch (err: any) {
      text.value = true;
      spin.value = false;
      button.value = false;
      toastError(err.message)
    }
  } else {
    toastError('Fill in all the fields')
  }
}

const toTop = () => {
  window.scrollTo(0, 0)
}

onMounted(() => {
  toTop();
})
</script>

<template>
  <div class="w-full md:mt-[100px]">
    <div class="mb-[29px]"><img draggable="false" src="/landingpage/logo.svg" /></div>
    <div
      class="text-[#101828] mb-[8px] md:mb-[12px] text-[20] md:text-[28px] font-[700] tracking-[-0.56px] leading-[normal]">
      Sign In
    </div>
    <div
      class="text-[#667085] text-[18px] md:text-[20px] font-[400] leading-[normal] tracking-[-0.4px] mb-[24px] md:mb-[40px]">
      Welcome back to Delve AI.
    </div>
    <!-- forms -->
    <div class="mb-[24px]">
      <div class="text-[#344054] text-[16px] font-[500] leading-[20px] mb-[6px]">
        Email
      </div>
      <div class="w-full">
        <input v-model="user.email" type="text" placeholder="olivia@untitledui.com"
          class="w-full py-[10px] px-[14px] text-[#667085] text-[14px] font-[400] leading-[24px] bg-[#fff] rounded-[8px] border border-[#d0d5dd] focus:outline-none" />
      </div>
    </div>
    <div class="mb-[24px]">
      <div class="text-[#344054] text-[16px] font-[500] leading-[20px] mb-[6px]">
        Password
      </div>
      <div class="w-full">
        <input v-model="user.password" type="password" placeholder=""
          class="w-full py-[10px] px-[14px] text-[#667085] text-[14px] font-[400] leading-[24px] bg-[#fff] rounded-[8px] border border-[#d0d5dd] focus:outline-none" />
      </div>
    </div>
    <!-- end forms -->
    <button @click="login" :disabled="button"
      :class='button ? "rounded-[10.658px] bg-gray-100 py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]" : "rounded-[10.658px] bg-[#1e73be] py-[13px] justify-center text-center w-full text-[#fff] text-[16px] md:text-[18px] font-[500] leading-[31px] mb-[16px] md:mb-[20px]"'>
      <div v-show="text">Log in</div>
      <div v-show="spin" class="w-[20px] h-[20px] mx-auto"><img src="/spin.svg" class="w-full h-full spin" /></div>
    </button>
    <div class="w-fit text-center mx-auto text-[#667085] text-[16px] font-[500] leading-[31px]">
      Don&apos;t an account?
      <span class="text-[#1e73be] md:cursor-pointer">
        <router-link to="/create-account">Create one</router-link>
      </span>.
    </div>
    <!--  -->
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
