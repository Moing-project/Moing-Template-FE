import React, { useState } from "react";
import styled from "styled-components";

type Input = {
  imageSrc: string;
  width: number;
  height: number;
};

interface ImageDivInterceptor {
  imgSrc: string;
  width: number;
  height: number;
  imgWidth: number;
  imgHeight: number;
}

interface ImageDivInt {
  width: number;
  height: number;
}

const Container = styled.div<ImageDivInt>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const StyledImageDiv = styled.div<ImageDivInterceptor>`
  background-image: ${(props) => `url("${props.imgSrc}")`};
  background-position: "center center";
  background-repeat: no-repeat;
  background-size: ${(props) => `${props.imgWidth}px ${props.imgHeight}px`};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

export default function ImageDiv({ imageSrc, width, height }: Input) {
  const [imgWidth, setImgWidth] = useState<number>(width);
  const [imgHeight, setImgHeight] = useState<number>(height);
  const ScrollEvent = (event: React.WheelEvent<HTMLDivElement>) => {
    console.log(event.ctrlKey);

    if (event.nativeEvent.deltaY > 0) {
      // scroll up event
      setImgWidth(imgWidth - 10);
      setImgHeight(imgWidth - 10);
      console.log("scroll down");
    } else {
      // scroll down event
      setImgWidth(imgWidth + 10);
      setImgHeight(imgWidth + 10);
      console.log("scroll up");
    }
  };

  return (
    <Container width={width} height={height}>
      <StyledImageDiv
        width={width}
        height={height}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        imgSrc={imageSrc}
        onWheel={ScrollEvent}
      />
    </Container>
  );
}
