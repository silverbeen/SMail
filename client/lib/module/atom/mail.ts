import { atom } from "recoil";

export const MailInputAtom = atom<string>({
  key: "mailInputAtom",
  default: "",
});
