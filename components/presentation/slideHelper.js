import Head from "next/head";
import { useState, useEffect } from "react";
import React from "react";
import {
  OrderedList,
  Slide as SpectacleSlide,
  ListItem,
  Box,
  DefaultTemplate,
} from "spectacle";
import { Heading } from "spectacle";
import { Deck as SlideDeck } from "spectacle";

export const Deck = ({ template, children, theme, title }) => {
  const [outline, setOutline] = useState([]);

  useEffect(() => {
    const titles = React.Children.toArray(children).map(
      (child, index) => `${child.props.title}`
    );
    setOutline(titles);
  }, [children]);

  return (
    <SlideDeck
      template={(props) => {
        return template({ title, ...props });
      }}
      theme={theme}
    >
      <SpectacleSlide></SpectacleSlide>
      <SpectacleSlide>
        <Heading textAlign={"left"}>Outline</Heading>
        <Box paddingLeft={30}>
          <OrderedList>
            {outline.map((title, index) => (
              <ListItem key={index}>{title}</ListItem>
            ))}
          </OrderedList>
        </Box>
      </SpectacleSlide>
      {children}
    </SlideDeck>
  );
};

export const Chapter = ({ children }) => {
  const [outline, setOutline] = useState([]);

  useEffect(() => {
    const titles = React.Children.toArray(children).map(
      (child, index) => `Slide ${index + 1}: ${child.props.title}`
    );
    setOutline(titles);
  }, [children]);

  return (
    <>
      <SpectacleSlide>
        <Heading textAlign={"left"}>Outline</Heading>
        <OrderedList>
          {outline.map((title, index) => (
            <ListItem key={index}>{title}</ListItem>
          ))}
        </OrderedList>
      </SpectacleSlide>
      {children}
    </>
  );
};

export const Slide = ({ title, children }) => {
  return (
    <SpectacleSlide>
      <Heading textAlign={"left"}>{title}</Heading>
      {children}
    </SpectacleSlide>
  );
};
