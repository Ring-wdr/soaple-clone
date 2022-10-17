import create from "zustand";

const useImage = create((set) => ({
  imgKeys: [],
  updateImg(imgKey) {
    set((state) => ({ imgKeys: [...state.imgKeys, imgKey] }));
  },
  clearImg() {
    set((state) => ({ imgKeys: [] }));
  },
}));

export default useImage;
