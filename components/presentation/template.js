import { Box, FlexBox, Image } from "spectacle";
import { FullScreen } from "spectacle";
import { AnimatedProgress } from "spectacle";
import React from "react";
import theme from "./theme";

// The 16 is due to the nature of the box, replace with materialui

const TitleSlide = () => {
  return (
    <>
      <Box
        backgroundColor={theme.colors.secondary}
        bottom={0}
        position={"absolute"}
        height={"90%"}
        width={1}
        marginBottom={-16}
      >
        <Box position={"relative"} left={40} marginTop={-40}>
          <Image
            src="/thesis/presentation/KUL.png"
            width={260}
            height={96}
            alt="Logo KU Leuven"
          ></Image>
        </Box>
        <Box
          position={"absolute"}
          right={0}
          marginRight={-16}
          bottom={0}
          marginBottom={-16}
          marginTop={-40}
          zIndex={2}
        >
          <Image
            src="/thesis/presentation/sedes.png"
            width={517}
            height={600}
            alt="Logo KU Leuven"
          ></Image>
        </Box>
      </Box>
      <FlexBox
        justifyContent="space-between"
        position="absolute"
        alignItems={"center"}
        bottom={0}
        width={1}
        backgroundColor={theme.colors.secondary}
        paddingTop={20}
        paddingBottom={20}
        marginBottom={-16}
      >
        <FlexBox left="15em" alignItems={"center"} justifyContent={"center"}>
          <Box padding="8px 1em 0px">
            <FullScreen color={theme.colors.tertiary} />
          </Box>
          <Box padding="0 1em">
            <AnimatedProgress color={theme.colors.tertiary} />
          </Box>
        </FlexBox>
      </FlexBox>
    </>
  );
};

const NormalSlide = () => {
  return (
    <>
      <FlexBox
        justifyContent="space-between"
        position="absolute"
        alignItems={"center"}
        bottom={0}
        width={1}
        backgroundColor={theme.colors.secondary}
        paddingTop={20}
        paddingBottom={20}
        marginBottom={-16}
      >
        <FlexBox left="15em" alignItems={"center"} justifyContent={"center"}>
          <Box padding="8px 1em 0px">
            <FullScreen color={theme.colors.tertiary} />
          </Box>
          <Box padding="0 1em">
            <AnimatedProgress color={theme.colors.tertiary} />
          </Box>
        </FlexBox>
        <Box padding="0 1em">
          <Image
            width={104}
            height={38}
            src="/thesis/presentation/KUL.png"
            alt="Logo Ku Leuven"
          ></Image>
        </Box>
      </FlexBox>
    </>
  );
};

export const KulTemplate = ({ slideNumber, numberOfSlides }) => {
  return slideNumber == 1 ? <TitleSlide /> : <NormalSlide />;
};
