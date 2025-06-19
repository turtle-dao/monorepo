import { atom } from "jotai";
import type { DealFormatted } from "@/App";

export const showPanelAtom = atom<boolean>(false);
export const dealSelectedAtom = atom<DealFormatted | null>(null);
