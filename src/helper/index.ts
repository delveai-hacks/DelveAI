import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const toastSuccess = (successMessage: string) => {
  toast.success(`${successMessage}`, {
    autoClose: 3000,
    position: "top-right",
    closeButton: true,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};

export const toastInfo = (infoMessage: string) => {
  toast.info(`${infoMessage}`, {
    autoClose: 3000,
    position: "top-right",
    closeButton: true,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};

export const toastError = (errorMessage: string) => {
  toast.error(`${errorMessage}`, {
    autoClose: 3000,
    position: "top-right",
    closeButton: true,
    hideProgressBar: true,
    pauseOnHover: false,
  });
};
