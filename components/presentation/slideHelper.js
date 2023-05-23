import { useState, useEffect } from "react";
import React from "react";
import { OrderedList, Slide as SpectacleSlide, ListItem } from "spectacle";
import { Heading } from "spectacle";

export const Deck = ({ template, children }) => {
  const [outline, setOutline] = useState([]);

  useEffect(() => {
    const titles = React.Children.toArray(children).map(
      (child, index) => `Chapter ${index + 1}: ${child.props.title}`
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
