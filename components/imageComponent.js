import { useTheme } from "next-themes";
import Image from "next/image";

function ImageComponent(name) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener("change", (e) =>
      setIsDarkMode(e.matches)
    );
    return () =>
      darkModeMediaQuery.removeEventListener("change", (e) =>
        setIsDarkMode(e.matches)
      );
  }, []);

  return (
    <>
      {isDarkMode ? (
        <div style={{ width: "100%", marginBottom: "40px" }}>
          <Image
            src={`${name.name}_dark.png`}
            width={1200}
            height={600}
            layout="responsive"
            alt=""
          />
        </div>
      ) : (
        <div style={{ width: "100%", marginBottom: "40px" }}>
          <Image
            src={`${name.name}_light.png`}
            width={1200}
            height={600}
            layout="responsive"
            alt=""
          />
        </div>
      )}
    </>
  );
}

export default ImageComponent;
