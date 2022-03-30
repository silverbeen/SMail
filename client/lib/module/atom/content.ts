import { atom } from "recoil";

export const contentMenuAtom = atom<number>({
  key: "contentMenuAtom",
  default: 1,
});

export const isSaveAtom = atom<boolean | "">({
  key: "isSaveAtom",
  default: "",
});
