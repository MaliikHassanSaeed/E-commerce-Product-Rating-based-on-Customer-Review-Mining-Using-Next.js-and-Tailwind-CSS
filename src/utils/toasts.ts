import { toast } from "react-hot-toast";

export const errToast = (txt: string) => {
  toast.error(txt);
};

export const successToast = (txt: string) => {
  toast.success(txt);
};
