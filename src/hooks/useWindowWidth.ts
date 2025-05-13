import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(200); // 📌 Default 200

  useEffect(() => {
    // 📏 Window width-ni olish
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // ✅ Initial render-da widthni olish
    window.addEventListener("resize", handleResize); // 🖥 Resize event qo‘shish

    return () => window.removeEventListener("resize", handleResize); // 🔄 Cleanup
  }, []);

  return width;
};

export default useWindowWidth;
