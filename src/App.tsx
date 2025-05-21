import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Gallery />
      </div>
    </div>
  );
}

export default App;
