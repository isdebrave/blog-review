import React from "react";

interface IText {
  text: string;
}

const Text: React.FC<IText> = ({ text }) => {
  return <div>{text}</div>;
};

export default Text;
