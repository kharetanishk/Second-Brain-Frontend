import { atom } from "recoil";

export interface UserType {
  id: string;
  username: string;
  email: string;
}

//usertype initially is null when user logged in it do have a usertype...bosdiwale itna detailing hai code mein
export const userAtom = atom<UserType | null>({
  key: "userAtom",
  default: null,
});
