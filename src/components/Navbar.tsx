import styles from "../App.module.scss";

interface NavbarProps {
  toggleTheme: () => void;
  theme: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme }) => {
  return (
    <div className={styles.navbar}>
      <img
        src={`${import.meta.env.BASE_URL}images/${theme === "dark" ? "logo.png" : "logo_light.png"}`}
        alt="logo"
        className={styles.logo}
      />
      <button onClick={toggleTheme} className={styles.themeToggle}>
        <img
          src={`${import.meta.env.BASE_URL}images/${theme === "dark" ? "theme_btn_light.svg" : "theme_btn_dark.svg"}`}
          alt="icon"
          className={styles.themeIcon}
        />
      </button>
    </div>
  );
};

export default Navbar;
