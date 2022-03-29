import { atom } from "recoil";

export const MailInputAtom = atom<{
  title: string | "";
  content: string | "";
}>({
  key: "mailInputAtom",
  default: {
    title: "",
    content: "",
  },
});
