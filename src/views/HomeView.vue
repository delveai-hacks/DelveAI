<script setup lang="ts">
import baseurl from '@/api';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ref, onMounted } from "vue";
import { marked } from 'marked';

import { toastSuccess, toastError } from '@/helper';

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

const formdata = new FormData()
gsap.registerPlugin(TextPlugin)

async function getPrompt() {
  if (prompt.value.length >= 1) {
    sidePrompt.value = prompt.value;
    loading.value = true;
    pdfsend.value = false;
    try {
      const res = await baseurl.post(`/ai/prompt`, {
        prompt: prompt.value,
      });
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
      window.scrollTo(0, 0)
    } catch (err) {
      console.log(err);
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

const selectedFile = async (e: any) => {
  pdfFile.value = e.target.files[0]
  formdata.append("file", e.target.files[0])
  console.log(pdfFile.value)
  fileName.value = e.target.files[0].name

  if (prompt.value.length >= 1) {
    formdata.append("text", prompt.value)
  } else {
    return null
  }
}

const usePdf = async () => {
  if (formdata.get('file') !== null && prompt.value.length >= 1) {
    sidePrompt.value = prompt.value;
    loading.value = true;
    pdfsend.value = true;
    try {
      const res = await baseurl.post(`/pdf/pdf_interaction`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(res.data)
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
      window.scrollTo(0, 0)
    } catch (err: any) {
      console.log(err.message)
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

onMounted(() => {
  fileName.value = '';
  pdfsend.value = false;
  const answerspace = document.getElementById('answerspace') as any;
  console.log(answerspace)
})

const saveAudio = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await baseurl.post('/ai/save-audio', {
      text: speakValue.value
    })
    console.log(res.data.message)
    toastSuccess("Successfully downloaded answer to your downloads: output.mp3")
  } catch (err: any) {
    console.log(err.message)
    toastError("Couldn't download to mp3, try again.")
  }
}
</script>

<template>
  <main class="bg-[#fff] flex flex-col min-h-[100vh]">
    <!-- flex 1 -->
    <div
      class="border overflow-y-scroll flex-1 top-0 left-0 w-full bg-[#fff] pt-[24px] px-[16px] md:pt-[24px] md:px-[112px]">
      <div
        class="w-full pt-[20px] pb-[20px] flex items-center justify-between fixed top-0 bg-[#fff] left-0 px-[16px] md:px-[112px]">
        <div><img draggable="false" src="/landingpage/logo.svg" /></div>
        <div class="flex items-center space-x-[20px] md:space-x-[32px]">
          <div class="w-[24px] h-[24px]"><img src="/landingpage/edit.svg" class="w-full h-full" /></div>
          <div><img draggable="false" src="/landingpage/user.svg" /></div>
        </div>
      </div>
      <!-- after header no prompt yet -->
      <div v-show="noPrompt" class="mt-[180px]">
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
      <div class="w-full mt-[80px] md:mt-[120px] lg:mt-[150px] mb-[100px] md:mb-[160px] overflow-y-scroll"
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
            class="questionspace text-[#101828] text-[14px] md:text-[17.172px] font-[500] leading-[normal] w-full md:w-[70%] py-[27px] px-[14px] text-left rounded-[12px] tracking-[-0.28px] h-fit">
          </div>
          <div></div>
        </div>
        <!-- answer show space -->
        <div v-if="loading"></div>
        <div v-else class="md:flex mb-[12px] md:items-baseline md:justify-around">
          <div class="md:flex w-full md:w-[70%] md:items-center space-y-[8px] md:space-y-[0px] md:space-x-[10px]">
            <div
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
    <div class="flex-2 z-[100] fixed w-full bottom-0 px-[16px] md:px-[112px] pb-[44px] md:pb-[100px] bg-[#fff]">
      <div class="w-full">
        <div class="w-full flex items-center input rounded-[100px] border border-[#f1f1f3] py-[3px] pl-[13px] pr-[3px]">
          <div class="w-fit"><img @click="triggerUpload" src="/landingpage/file.svg"
              class="md:cursor-pointer hover:opacity-[0.7]" /></div>
          <div class="w-[calc(100%-48px)] ml-[8px] md:ml-[18px]">
            <input v-model="prompt" placeholder="Hello, what can I do for you?" type="text"
              class="w-full text-[#667085] text-[12px] md:text-[14px] font-[400] leading-[normal] tracking-[-0.24px] focus:outline-none" />
          </div>
          <div @click="submitPrompt"
            class="sendicon w-[48px] h-[48px] rounded-[100px] border border-[#f1f1f3] p-[12px] md:py-[16px] md:px-[10px] md:cursor-pointer flex items-center justify-center">
            <img src="/landingpage/send.svg" />
          </div>
        </div>
      </div>
      <div class="hidden"><input @change="selectedFile" ref="fileInput" type="file" /></div>
    </div>
    <!-- end flex 2 -->
  </main>
</template>

<style scoped>
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
</style>
