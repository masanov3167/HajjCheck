import { useState, useEffect } from "react";

export default function useWindowHeight(defaultHeight: number = 100) {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : defaultHeight
  );

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}
