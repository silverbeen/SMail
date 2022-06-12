import { toast } from "react-toastify";
import { mainColor } from "../../styles/color";

export function ToastSuccess(text: string | null) {
  toast.success(`${text}`, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    style: { fontSize: "14px" },
  });
}

export function ToastError(text: string | null) {
  toast.error(`${text}`, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    style: { fontSize: "14px" },
  });
}
