<script setup lang="ts">
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import axios from "axios";
import { ref } from "vue";
import { marked } from 'marked';
const api = "https://delveai-backend.onrender.com";
//https://delveai-backend.onrender.com

const prompt = ref("");
const answerPrompt = ref("") as any;
const speakValue = ref("") as any;

const audioIcon = ref(false)
const answerSheet = ref(false)

const overlay = ref(false)

const pdfFile = ref("") as any
const fileInput = ref(null) as any
const fileName = ref("") as any

const promptsend = ref(true)
const pdfsend = ref(false)

const formdata = new FormData()
gsap.registerPlugin(TextPlugin)

async function getPrompt() {
  overlay.value = true;
  answerSheet.value = false;
  fileName.value = ""
  try {
    const res = await axios.post(`${api}/ai/prompt`, {
      prompt: prompt.value,
    });
    console.log(res.data.replaceAll("*", ""));
    answerPrompt.value = marked(res.data);
    speakValue.value = res.data.replaceAll("*", "")
    prompt.value = "";
    const answerspace = document.getElementById('answerspace') as any;
    answerspace.innerHTML = "";
    gsap.to(answerspace, { duration: 10, text: answerPrompt.value })
    if (answerPrompt.value.length >= 1) {
      overlay.value = false;
      answerSheet.value = true;
      audioIcon.value = true;

      //send button switch
      promptsend.value = true;
      pdfsend.value = false;
    }
  } catch (err) {
    console.log(err);
    answerPrompt.value = "An error Ocurred";
    prompt.value = "";
    overlay.value = false;
  }
}

const preventAutoRedirect = (e: Event) => {
  e.preventDefault();
}

const triggerUpload = () => {
  fileInput.value.click()
}

const selectedFile = async (e: any) => {
  pdfFile.value = e.target.files[0]
  formdata.append("file", e.target.files[0])
  formdata.append("text", prompt.value)
  console.log(pdfFile.value)
  localStorage.setItem('pdf', e.target.files[0].name)
  fileName.value = e.target.files[0].name

  if (e.target.files[0]) {
    promptsend.value = false;
    pdfsend.value = true;
    fileName.value = e.target.files[0].name
  } else {
    promptsend.value = true;
    pdfsend.value = false;
  }
}

const usePdf = async () => {
  overlay.value = true;
  answerSheet.value = false;

  try {
    const res = await axios.post(`${api}/pdf/pdf_interaction`, formdata)
    console.log(res.data)
    answerPrompt.value = marked(res.data);
    speakValue.value = res.data.replaceAll("*", "")
    prompt.value = "";

    const answerspace = document.getElementById('answerspace') as any;
    answerspace.innerHTML = "";
    gsap.to(answerspace, { duration: 10, text: answerPrompt.value })
    if (answerPrompt.value.length >= 1) {
      overlay.value = false;
      answerSheet.value = true;
      audioIcon.value = true;

      //send button switch
      promptsend.value = true;
      pdfsend.value = false;
    }
  } catch (err: any) {
    console.log(err.message)
    promptsend.value = false;
    pdfsend.value = true;
  }
}

const playAudiofText = async () => {
  //@ts-ignore
  responsiveVoice.speak(`${speakValue.value}`, "UK English Male", { volume: 1 }, { pitch: 2 }, { rate: 1.5 });
}

const refreshScreen = () => {
  if (fileName.value !== '' && answerPrompt.value !== '') {
    fileName.value = ""
    answerPrompt.value = ""
    answerSheet.value = false
  } else if (fileName.value == '' && answerPrompt.value !== '') {
    fileName.value = ""
    answerPrompt.value = ""
    answerSheet.value = false
  }
}
</script>

<template>
  <div class="xl:flex md:w-full min-h-[100vh] md:justify-center md:items-center hidden">
    <div class="w-[55%] mx-auto">
      <div
        class="inter-tight text-[#fff] text-[34px] mb-[69px] font-[500] w-fit h-fit text-center leading-[20px] mx-auto mt-[10px]">
        DelveAI BETA
      </div>
      <div
        class="input_container space-x-[30px] w-full mx-auto rounded-[4px] border border-[#303139] pl-[10px] py-[0px] bg-[#40414e]">
        <div class="w-[80%] h-fit">
          <input @keyup="refreshScreen" placeholder="Enter your prompt..." autocomplete="off" v-model="prompt"
            id="inputai" type="text"
            class="w-full bg-[transparent] roboto-black text-[250] focus:outline-none text-[13px] text-[#fff] rounded-[16px] py-[15px] px-[20px] tracking-[1px]" />
        </div>
        <div class="w-[20%]">
          <div
            class="w-full roboto-black text-[#f2f2f2] text-center flex justify-between rounded-r-[4px] bg-[transparent] text-[16px] font-[700] leading-[150%] py-[15px] items-center px-[20px]">
            <div></div>
            <div class="flex items-center space-x-[30px]">
              <div v-show="audioIcon" @click="playAudiofText" class="w-fit h-fit cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.00002 0C10.4853 0 12.5 2.01472 12.5 4.5V11.5C12.5 13.9853 10.4853 16 8.00002 16C5.51474 16 3.50002 13.9853 3.50002 11.5V4.5C3.50002 2.01472 5.51474 0 8.00002 0ZM0.750024 10.3284C1.04826 10.3284 1.29567 10.546 1.34217 10.831L1.35002 10.9284V11.0603C1.35002 14.8004 4.32952 17.8284 8.00002 17.8284C11.5924 17.8284 14.5229 14.9278 14.646 11.2981L14.65 11.0603V10.9388C14.65 10.6074 14.9187 10.3388 15.25 10.3388C15.5483 10.3388 15.7957 10.5564 15.8422 10.8415L15.85 10.9388L15.8463 11.3084C15.7233 15.3891 12.5766 18.7005 8.59989 19.0055L8.60002 22.5C8.60002 22.8314 8.3314 23.1 8.00002 23.1C7.70179 23.1 7.45438 22.8824 7.40788 22.5973L7.40002 22.5L7.40049 19.0055C3.42611 18.7009 0.280723 15.3934 0.153995 11.3161L0.150024 10.9284C0.150024 10.597 0.418654 10.3284 0.750024 10.3284ZM4.70002 4.5C4.70002 2.67746 6.17748 1.2 8.00002 1.2C9.82256 1.2 11.3 2.67746 11.3 4.5V11.5C11.3 13.3225 9.82256 14.8 8.00002 14.8C6.17748 14.8 4.70002 13.3225 4.70002 11.5V4.5Z"
                    fill="#8E8E9E" />
                </svg>
              </div>
              <div class="w-[20px] h-[20px]">
                <img @click="triggerUpload" src="/pdficon.svg" class="w-full h-full cursor-pointer" />
              </div>
              <div v-show="promptsend" class="cursor-pointer" @click="getPrompt">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M13.517 7.78232C13.6622 7.70957 13.7842 7.59787 13.8695 7.45972C13.9548 7.32156 14 7.1624 14 7.00004C14 6.83767 13.9548 6.67851 13.8695 6.54036C13.7842 6.4022 13.6622 6.2905 13.517 6.21775L1.26652 0.0924925C1.11462 0.0164901 0.943888 -0.013663 0.775147 0.00571153C0.606407 0.025086 0.446953 0.0931506 0.316236 0.201602C0.185518 0.310054 0.0891905 0.454204 0.0390005 0.616468C-0.0111885 0.778733 -0.0130692 0.952096 0.0335884 1.11541L1.28402 5.4906C1.33632 5.67346 1.44678 5.8343 1.59867 5.94877C1.75056 6.06324 1.93561 6.12511 2.1258 6.125L6.1256 6.125C6.35767 6.125 6.58024 6.21719 6.74434 6.38129C6.90844 6.54539 7.00063 6.76796 7.00063 7.00004C7.00063 7.23211 6.90844 7.45468 6.74434 7.61878C6.58024 7.78288 6.35767 7.87507 6.1256 7.87507L2.1258 7.87507C1.93561 7.87497 1.75056 7.93683 1.59867 8.0513C1.44678 8.16577 1.33632 8.32661 1.28402 8.50948L0.0344624 12.8847C-0.0122877 13.0479 -0.0105196 13.2213 0.0395511 13.3835C0.0896219 13.5458 0.185831 13.69 0.316447 13.7986C0.447062 13.9071 0.606437 13.9753 0.775136 13.9948C0.943837 14.0143 1.11457 13.9843 1.26652 13.9085L13.517 7.7832L13.517 7.78232Z"
                    fill="#8E8E9E" />
                </svg>
              </div>
              <div v-show="pdfsend" id="pdf_click" class="cursor-pointer" @click="usePdf">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M13.517 7.78232C13.6622 7.70957 13.7842 7.59787 13.8695 7.45972C13.9548 7.32156 14 7.1624 14 7.00004C14 6.83767 13.9548 6.67851 13.8695 6.54036C13.7842 6.4022 13.6622 6.2905 13.517 6.21775L1.26652 0.0924925C1.11462 0.0164901 0.943888 -0.013663 0.775147 0.00571153C0.606407 0.025086 0.446953 0.0931506 0.316236 0.201602C0.185518 0.310054 0.0891905 0.454204 0.0390005 0.616468C-0.0111885 0.778733 -0.0130692 0.952096 0.0335884 1.11541L1.28402 5.4906C1.33632 5.67346 1.44678 5.8343 1.59867 5.94877C1.75056 6.06324 1.93561 6.12511 2.1258 6.125L6.1256 6.125C6.35767 6.125 6.58024 6.21719 6.74434 6.38129C6.90844 6.54539 7.00063 6.76796 7.00063 7.00004C7.00063 7.23211 6.90844 7.45468 6.74434 7.61878C6.58024 7.78288 6.35767 7.87507 6.1256 7.87507L2.1258 7.87507C1.93561 7.87497 1.75056 7.93683 1.59867 8.0513C1.44678 8.16577 1.33632 8.32661 1.28402 8.50948L0.0344624 12.8847C-0.0122877 13.0479 -0.0105196 13.2213 0.0395511 13.3835C0.0896219 13.5458 0.185831 13.69 0.316447 13.7986C0.447062 13.9071 0.606437 13.9753 0.775136 13.9948C0.943837 14.0143 1.11457 13.9843 1.26652 13.9085L13.517 7.7832L13.517 7.78232Z"
                    fill="#8E8E9E" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- input box -->
      <div class="flex mt-[20px] items-center justify-between">
        <div></div>
        <div
          :class="fileName != '' ? 'w-fit rounded-[4px] text-[#fff] border border-[#32343a] inter-tight bg-[#444654] text-[13px] py-[8px] px-[10px]' : 'w-fit rounded-[4px] text-[#fff] border border-[#32343a] inter-tight bg-[#444654] text-[13px] py-[8px] px-[10px] hidden'">
          {{ fileName }}
        </div>
      </div>
      <div v-show="answerSheet"
        class="mt-[10px] answerContainer text-[15px] font-[500] h-[300px] overflow-y-scroll w-full mx-auto border pt-[26px] pb-[0px] pl-[30px] pr-[10px] rounded-[4px] border-[#32343a] inter-tight">
        <div id="answerspace" class="leading-[27px] textPlace pb-[26px]"></div>
      </div>
      <!-- summarize input file pdf -->
      <form @submit="preventAutoRedirect" enctype="multipart/form-data">
        <input class="hidden" ref="fileInput" @change="selectedFile" type="file" accept="application/pdf" />
      </form>
      <!-- end summarize input file pdf -->
      <!-- end input box -->
    </div>
    <!-- overlay -->
    <div v-show="overlay" class="overlay fixed w-full top-0 left-0 h-full flex justify-center items-center">
      <div><img src="/spinner.svg" class="spinLoad" /></div>
    </div>
    <!-- end overlay  -->
  </div>
</template>

<style scoped>
.logocolor {
  background: var(--text,
      linear-gradient(79deg,
        #439ddf 12.52%,
        #4f87ed 35.44%,
        #9476c5 46.7%,
        #bc688e 51.37%,
        #d6645d 56.25%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.inputBorder {
  border: 1px solid rgba(0, 0, 0, 0.20);
}

.answerContainer {
  background: #444654;
}

.textPlace {
  color: #fff;
}

.answerContainer::-webkit-scrollbar {
  background: transparent;
  width: 5px;
}

.answerContainer::-webkit-scrollbar-track {
  background: transparent;
  width: fit-content;
}

.answerContainer::-webkit-scrollbar-thumb {
  background: #e0e0;
  width: fit-content;
}

.overlay {
  background: rgba(16, 24, 40, 0.70);

  /* Background blur/md */
  backdrop-filter: blur(8px);
}

.spinLoad {
  animation: 2s roll infinite linear;
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
