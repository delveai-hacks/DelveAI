<script setup lang="ts">
import baseurl from '@/api';
import axios from 'axios';
import refreshAuth from '@/api/refreshToken';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ref, onMounted } from "vue";
import { marked } from 'marked';

import { toastError } from '@/helper';
import { useRouter } from 'vue-router';

const router = useRouter()

const fullname = ref("")
const avatarUrl = ref('');

const prompt = ref("");
const sidePrompt = ref("")
const answerPrompt = ref("") as any;
const speakValue = ref("") as any;

const pdfFile = ref("") as any
const fileInput = ref(null) as any
const fileName = ref("") as any

const noPrompt = ref(true)
const promptedPage = ref(false)
const loading = ref(true)

const pdfsend = ref(false)

const spin = ref(false)
const sendicon = ref(true)

const pdftake = ref(false)

const logout = ref(false)
const delvecheck = ref(false)

const formdata = new FormData()
gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(ScrollToPlugin);

const openDCheck = () => {
  delvecheck.value = true;
}

const closeDCheck = () => {
  delvecheck.value = false;
  router.push('/coming-soon');
}

async function getPrompt() {
  if (prompt.value.length >= 1) {
    sidePrompt.value = prompt.value;
    loading.value = true;
    pdfsend.value = false;

    spin.value = true;
    sendicon.value = false;
    try {
      const res = await baseurl.post(`/ai/prompt`, {
        prompt: prompt.value,
      });
      prompt.value = ""
      spin.value = false;
      sendicon.value = true;
      noPrompt.value = false;
      promptedPage.value = true;
      loading.value = false;
      console.log(res.data.replaceAll("*", ""));
      answerPrompt.value = marked(res.data);
      speakValue.value = res.data.replaceAll("*", "")
      //@ts-ignore
      answerspace.innerHTML = "";
      //@ts-ignore
      gsap.to(answerspace, { duration: 10, text: answerPrompt.value })
      gsap.to(window, { duration: 1, scrollTo: document.body.scrollHeight });
    } catch (err) {
      console.log(err);
      spin.value = false;
      sendicon.value = true;
      noPrompt.value = false;
      promptedPage.value = true;
      answerPrompt.value = "An error Occured";
      //@ts-ignore
      answerspace.innerHTML = "An error Occured";
      loading.value = false;
      window.scrollTo(0, 0)
    }
  }
}

const triggerUpload = () => {
  fileInput.value.click()
}

const selectedFile = (e: any) => {
  if (formdata.get('file') !== null) {
    formdata.delete('file');
  }
  pdfFile.value = e.target.files[0]
  formdata.append("file", e.target.files[0])
  console.log(pdfFile.value)
  fileName.value = e.target.files[0].name

  pdftake.value = true;

  if (prompt.value.length >= 1) {
    formdata.append("text", prompt.value)
  }

  e.target.value = '';
}

const usePdf = async () => {
  if (formdata.get('file') !== null && prompt.value.length >= 1) {
    sidePrompt.value = prompt.value;
    loading.value = true;
    pdfsend.value = true;

    spin.value = true;
    sendicon.value = false;
    try {
      const res = await baseurl.post(`/pdf/pdf_interaction`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(res.data)
      formdata.delete('file');
      prompt.value = ""
      spin.value = false;
      sendicon.value = true;
      noPrompt.value = false;
      promptedPage.value = true;
      loading.value = false;
      console.log(res.data.replaceAll("*", ""));
      answerPrompt.value = marked(res.data);
      speakValue.value = res.data.replaceAll("*", "")
      //@ts-ignore
      answerspace.innerHTML = "";
      //@ts-ignore
      gsap.to(answerspace, { duration: 10, text: answerPrompt.value })
      gsap.to(window, { duration: 1, scrollTo: document.body.scrollHeight });
      pdftake.value = false;
    } catch (err: any) {
      console.log(err.message)
      spin.value = false;
      sendicon.value = true;
      noPrompt.value = false;
      promptedPage.value = true;
      answerPrompt.value = "An error Occured";
      //@ts-ignore
      answerspace.innerHTML = "An error Occured";
      loading.value = false;
      window.scrollTo(0, 0)
    }
  }
}

const submitPrompt = () => {
  if (formdata.get('file') !== null) {
    usePdf()
  } else {
    getPrompt()
  }
}

const getUserValid = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await baseurl.get(`/auth/me`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    })
    fullname.value = res.data.fullname
    getAvatar();
  } catch (err: any) {
    console.log(err.message);
    router.push('/login');
  }
}

const getAvatar = async () => {
  try {
    const res = await axios.get(`https://ui-avatars.com/api/?name=${fullname.value}&background=1E73BE&color=fff`, {
      responseType: 'blob'
    });
    avatarUrl.value = URL.createObjectURL(res.data);
    console.log(avatarUrl.value)
  } catch (err: any) {
    console.log(err.message);
  }
};

onMounted(() => {
  fileName.value = '';
  pdfsend.value = false;
  fullname.value.replace(' ', '+');
  const answerspace = document.getElementById('answerspace') as any;
  console.log(answerspace)
  getUserValid();
  refreshTokens();
})

const saveAudio = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await baseurl.post('/ai/save-audio', {
      text: speakValue.value
    }, { responseType: 'blob' })
    console.log(res.data.message)
    const contentDisposition = res.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : 'download_audio_from_delve.mp3';

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err: any) {
    console.log(err.message)
    toastError("Couldn't download to mp3, try again.")
  }
}

const savePDF = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await baseurl.post('/ai/save-pdf', {
      text: speakValue.value
    }, { responseType: 'blob' })
    console.log(res.data.message)
    const contentDisposition = res.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : 'downloadfromdelve.pdf';

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (err: any) {
    console.log(err.message)
    toastError("Couldn't download to pdf, try again.")
  }
}

const cancelPDF = () => {
  formdata.delete('file');
  pdfsend.value = false;
  pdftake.value = false;
}

//refresh tokens on interval
const refreshTokens = () => {
  setInterval(() => {
    refreshAuth();
  }, 60000)
}

const toggleLogOut = () => {
  logout.value = !logout.value
}

const confirmLogOut = () => {
  router.push('/login');
  window.scrollTo(0, 0);
  localStorage.clear()
}
</script>

<template>
  <main class="bg-[#fff] flex flex-col min-h-[100vh]">
    <!-- flex 1 -->
    <div
      class="border overflow-y-scroll flex-1 top-0 left-0 w-full bg-[#fff] pt-[24px] px-[16px] md:pt-[24px] md:px-[112px] cont">
      <div
        class="w-full pt-[20px] pb-[20px] flex items-center justify-between fixed top-0 bg-[#fff] left-0 px-[16px] md:px-[112px]">
        <div><img draggable="false" src="/landingpage/logo.svg" /></div>
        <div class="flex items-center space-x-[20px] md:space-x-[32px]">
          <div class="w-[24px] h-[24px]"><img src="/landingpage/edit.svg" class="w-full h-full" /></div>
          <div class="w-[32px] h-[32px] overflow-hidden bg-[#c4c4c4] rounded-full">
            <img draggable="false" :src="avatarUrl" class="w-full h-full object-cover" />
          </div>
          <!-- delve check btn -->
          <div @click="openDCheck"
            class="flex w-fit h-fit md:w-fit md:h-fit items-center space-x-[4px] px-[10px] py-[10px] md:px-[14px] rounded-full md:rounded-[75.326px] bg-[#fff] border border-[#c4c4c4] md:cursor-pointer"
            id="delve-check">
            <div class="w-[16px] h-[16px]"><img class="w-full h-full object-contain" src="/eyeblue.svg" /></div>
            <div class="hidden md:block text-[#667085] text-[16px] font-[500] tracking-[-0.32px]">
              DelveCheck
            </div>
          </div>
          <!-- end delve check btn -->
          <div>
            <img @click="toggleLogOut" draggable="false" src="/logout.svg" class="md:cursor-pointer" />
          </div>
        </div>
      </div>
      <!-- after header no prompt yet -->
      <div v-show="noPrompt" class="mt-[300px] md:mt-[197px]">
        <div
          class="iconcircle mb-[12px] md:mb-[24px] flex items-center justify-center mx-auto p-[16px] md:p-[37px] w-[64px] h-[64px] md:w-[138px] md:h-[138px]">
          <div class="w-[32px] h-[32px] md:w-[64px] md:h-[64px]"><img src="/landingpage/circleicon.svg"
              class="w-full h-full" /></div>
        </div>
        <div
          class="text-[#667085] text-center text-[16px] md:text-[24px] font-[400] md:font-[600] w-[193px] md:w-[323px] mx-auto tracking-[-0.48px]">
          Let&apos;s help you get answers to whatever question you have.
        </div>
      </div>
      <!-- end after header no prompt yet -->
      <!-- propmt question and answer -->
      <div class="w-full mt-[80px] md:mt-[120px] lg:mt-[150px] mb-[100px] md:mb-[160px] overflow-y-scroll cont"
        v-show="promptedPage">
        <!-- question show space -->
        <div class="flex mb-[30px] items-baseline justify-between md:justify-around">
          <div class="w-[10%] md:w-[50%]"></div>
          <div
            class="questionspace text-[#101828] text-[17.172px] font-[500] leading-[normal] w-[90%] md:w-[50%] py-[12px] px-[16px] text-left rounded-[12px] tracking-[-0.343px]">
            <div v-show="pdfsend" class="mb-[10px] flex items-center space-x-[10px]">
              <div class="flex pdflogo items-center justify-center w-[42.931px] h-[42.931px] rounded-[31.109px]">
                <img draggable="false" src="/pdficonhome.svg" />
              </div>
              <div
                class="w-[calc(100%-42.931px)] text-[#101828] text-[16px] font-[500] leading-[normal] tracking-[-0.32px]">
                {{ fileName }}
              </div>
            </div>
            {{ sidePrompt }}
          </div>
        </div>
        <!-- end question show space -->
        <div class="md:flex mb-[12px] md:items-baseline md:justify-around">
          <div v-show="loading == true"
            class="questionspace text-[#101828] text-[14px] md:text-[17.172px] font-[500] leading-[normal] w-full md:w-[70%] py-[27px] px-[14px] text-left rounded-[12px] tracking-[-0.343px] h-fit">
            <div class="w-[12px] h-[12px] rounded-full bg-[#101828] loading"></div>
          </div>
          <div v-show="loading == false" id="answerspace"
            class="questionspace text-[#101828] text-[14px] md:text-[17.172px] font-[500] leading-[normal] w-full md:w-[70%] py-[27px] px-[14px] text-left rounded-[12px] tracking-[-0.28px] h-fit break-words whitespace-normal select-text">
          </div>
          <div></div>
        </div>
        <!-- answer show space -->
        <div v-if="loading"></div>
        <div v-else class="md:flex mb-[12px] md:items-baseline md:justify-around">
          <div class="md:flex w-full md:w-[70%] md:items-center space-y-[8px] md:space-y-[0px] md:space-x-[10px]">
            <div @click="savePDF"
              class="w-full bg-[#1373be] text-[#fff] text-[14px] font-[500] md:w-[40%] justify-center flex items-center space-x-[8px] py-[10px] rounded-[10px] md:cursor-pointer">
              <div class="w-fit h-fit"><img src="/ds.svg" /></div>
              <div>Download Summary</div>
            </div>
            <div @click="saveAudio"
              class="w-full bg-[#1373be] text-[#fff] text-[14px] font-[500] md:w-[40%] justify-center flex items-center space-x-[8px] py-[10px] rounded-[10px] md:cursor-pointer">
              <div class="w-fit h-fit"><img src="/da.svg" /></div>
              <div>Download as audio</div>
            </div>
          </div>
          <div></div>
        </div>
        <!-- summary or audio download -->
      </div>
      <!-- end propmt question and answer -->
    </div>
    <!-- end flex 1 -->
    <!-- flex 2 -->
    <div class="flex-2 z-[100] fixed w-full bottom-0 px-[16px] md:px-[112px] pb-[20px] md:pb-[30px] bg-[#fff]">
      <div class="w-full">
        <div class="w-full flex items-center input rounded-[100px] border border-[#f1f1f3] py-[3px] pl-[13px] pr-[3px]">
          <button @click="triggerUpload" class="w-fit bg-[transparent] focus:outline-none"><img
              src="/landingpage/file.svg" class="md:cursor-pointer hover:opacity-[0.7]" /></button>
          <div class="w-[calc(100%-48px)] ml-[8px] md:ml-[18px]">
            <input v-model="prompt" placeholder="Hello, what can I do for you?" type="text"
              class="w-full text-[#667085] text-[12px] md:text-[14px] font-[400] leading-[normal] tracking-[-0.24px] focus:outline-none" />
          </div>
          <button @click="submitPrompt"
            class="sendicon w-[48px] h-[48px] rounded-[100px] border border-[#f1f1f3] p-[12px] md:py-[16px] md:px-[10px] md:cursor-pointer flex items-center justify-center focus:outline-none">
            <img v-show="sendicon" src="/landingpage/send.svg" />
            <div v-show="spin" class="w-[20px] h-[20px] mx-auto">
              <img src="/spin.svg" class="w-full h-full spin" />
            </div>
          </button>
        </div>
      </div>
      <!-- if pdf is selected -->
      <div v-show="pdftake" class="mt-[10px] flex items-center space-x-[10px] w-fit">
        <div class="flex pdflogo items-center justify-center w-[20px] h-[20px] rounded-[31.109px]">
          <img draggable="false" src="/pdficonhome.svg" />
        </div>
        <div class="w-[calc(100%-42.931px)] text-[#101828] text-[12px] font-[500] leading-[normal] tracking-[-0.32px]">
          {{ fileName }}
          <div @click="cancelPDF" class="text-[#1E73BE] font-[700] md:cursor-pointer">
            cancel
          </div>
        </div>
      </div>
      <!-- end if pdf is selected -->
      <div v-show="false"><input id="fileid" @change="selectedFile" ref="fileInput" type="file" />
      </div>
    </div>
    <!-- end flex 2 -->
    <!-- logout layout -->
    <div v-show="logout"
      class="fixed px-[23px] md:px-[0px] flex justify-center items-center z-[100] loglayout w-full top-0 h-full left-0 right-0">
      <div
        class="bg-[#fff] container rounded-t-[14px] rounded-bl-[14px] md:rounded-t-[20px] md:rounded-bl-[20px] w-full md:w-[60%] lg:w-[735px] md:mx-auto py-[16px] px-[12px] md:py-[30px] md:px-[16px]">
        <div class="text-[#1e0306] text-[20px] md:text-[30px] font-[900] mb-[20px]">
          Confirm logout
        </div>
        <div class="text-[#565656] text-[12px] md:text-[14px] font-[500] mb-[24px] md:mb-[30px]">
          Are you sure you want to logout of your account?
        </div>
        <div class="flex w-full items-center space-x-[32px] md:space-x-[40px]">
          <div @click="confirmLogOut"
            class="w-fit text-[#fff] text-[10px] md:text-[14px] font-[700] rounded-t-[14px] rounded-bl-[14px] md:rounded-t-[20px] md:rounded-bl-[20px] p-[16.5px] md:p-[20px] bg-[#1E73BE] md:cursor-pointer">
            Yes, confirm
          </div>
          <div @click="toggleLogOut" class="text-[#1e0306] text-[10px] md:text-[14px] font-[700] md:cursor-pointer">
            Cancel
          </div>
        </div>
      </div>
    </div>
    <!-- end logout layout -->
    <!-- delvecheck go layout -->
    <div v-show="delvecheck"
      class="delvecheck_layout flex items-center justify-center z-[200] w-full h-full left-0 fixed top-0 px-[16px] md:px-[0px]">
      <!-- delve container -->
      <div class="w-full md:w-[60%] lg:w-[540px] md:mx-auto bg-[#fff] rounded-[12px] p-[16px] md:p-[24px]">
        <div class="w-full h-[232px] md:h-[200px] rounded-[8px] overflow-hidden bg-[#c4c4c4] mb-[20px]">
          <img draggable="false" src="/mockupdelve.png" class="w-full h-full object-cover" />
        </div>
        <div class="text-[#1e73b3] text-center text-[18px] font-[700] leading-[28px] mb-[8px]">
          Welcome to DelveCheck
        </div>
        <div class="text-[#475467] text-center text-[14px] font-[400] leading-[20px] mb-[12px]">
          You're about to experience a smarter way to review your code, get permanent chats and faster load time. Delve
          Check is here to help you catch issues
          early, and optimize your code — all powered by AWS Bedrock.
        </div>
        <div class="text-[#475467] text-[14px] font-[400] leading-[20px] mb-[32px]">
          <div class="font-[700] mb-[8px]">How it works:</div>
          <ul>
            <li>Quick & Easy: Just submit your code, and Delve Check will analyze it in seconds.</li>
            <li>Detailed Insights: Get feedback on potential errors, improvements, and best practices.</li>
            <li>Continuous Learning: The more you use it, the smarter it gets.</li>
          </ul>
        </div>
        <!-- continue button -->
        <div @click="closeDCheck"
          class="w-full button_shadow text-[#fff] text-[16px] font-[700] leading-[24px] text-center bg-[#1e73be] rounded-[8px] py-[10px] md:cursor-pointer">
          Continue
        </div>
        <!-- end continue button -->
      </div>
      <!-- end delve container -->
    </div>
    <!-- end delvecheck go layout -->
  </main>
</template>

<style scoped>
.cont::-webkit-scrollbar {
  display: none;
}


.input {
  background: rgba(250, 250, 250, 0.00);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05);
}

.sendicon {
  background: rgba(250, 250, 250, 0.98);
}

.iconcircle {
  border-radius: 100px;
  background: rgba(120, 171, 216, 0.10);
  box-shadow: 0px 1.037px 2.073px 1.037px rgba(30, 115, 190, 0.20) inset, 0px 0.518px 1.037px 0.518px rgba(0, 0, 0, 0.10);
}

.questionspace {
  border: 1.073px solid rgba(30, 115, 190, 0.20);
  background: rgba(250, 250, 250, 0.98);
}

.loading {
  animation: 2s load infinite linear;
}

@keyframes load {
  0% {
    width: 12px;
    height: 12px;
    opacity: 1;
  }

  50% {
    width: 12px;
    height: 12px;
    opacity: 0.6;
  }

  100% {
    width: 12px;
    height: 12px;
    opacity: 1;
  }
}

.pdflogo {
  background: rgba(120, 171, 216, 0.10);
  box-shadow: 0px 0.622px 1.244px 0.622px rgba(30, 115, 190, 0.20) inset, 0px 0.311px 0.622px 0.311px rgba(0, 0, 0, 0.10);
}

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

.loglayout {
  background: rgba(0, 0, 0, 0.50);
}

.container {
  box-shadow: 0px 6px 55px 10px rgba(0, 0, 0, 0.06);
}

.delvecheck_layout {
  background: rgba(16, 24, 40, 0.70);
  backdrop-filter: blur(8px);
}

.button_shadow {
  box-shadow: 0px 1px 2px 0px rgba(53, 53, 54, 0.804);
}
</style>
