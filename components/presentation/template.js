import { Box, FlexBox, Image } from "spectacle";
import { FullScreen } from "spectacle";
import { AnimatedProgress } from "spectacle";
import React from "react";
import theme from "./theme";

export const KulTemplate = ({ color = theme.colors.secondary }) => (
  <>
    <Box
      width={1}
      position={"absolute"}
      bottom={0}
      left={0}
      color={color}
      height={"300px"}
      zIndex={100}
    ></Box>
    <FlexBox
      justifyContent="space-between"
      position="absolute"
      alignItems={"center"}
      bottom={0}
      width={1}
    >
      <FlexBox left="15em" alignItems={"center"} justifyContent={"center"}>
        <Box padding="8px 1em 0px">
          <FullScreen color={color} />
        </Box>
        <Box padding="0 1em">
          <AnimatedProgress color={color} />
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
