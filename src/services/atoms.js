import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const authAtom = atomWithStorage("authAtom", {
  token: "",
  id: "",
  username: "",
  community_type: "",
  community_name: "",
  region: "",
  city: "",
});

export const ghgAtom = atom([]);
