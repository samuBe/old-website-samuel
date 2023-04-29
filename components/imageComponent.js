import { useTheme } from "next-themes";
import Image from "next/image";

function ImageComponent(name) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  console.log(name);
  console.log(`${name.name}_light.png`);

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
