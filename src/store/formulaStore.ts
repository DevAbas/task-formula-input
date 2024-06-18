import {create} from "zustand";

interface Tag {
  id: string;
  name: string;
  value: string | number;
}

interface FormulaState {
  tags: Tag[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTags: (tags: any) => void;
}

const useFormulaStore = create<FormulaState>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
}));

export default useFormulaStore;
