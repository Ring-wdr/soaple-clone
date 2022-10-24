import create from "zustand";

const useImage = create((set) => ({
  imgKeys: [],
  getImg(currentImgKeys){
    set((state) => ({imgKeys: currentImgKeys}))
  },
  updateImg(imgKey) {
    set((state) => ({ imgKeys: [...state.imgKeys, imgKey] }));
  },
  clearImg() {
    set((state) => ({ imgKeys: [] }));
  },
}));

export default useImage;
