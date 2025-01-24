import { ImgHTMLAttributes } from "react";
import styled from "styled-components";

const Img = ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return <StyledImage src={src} alt={alt ?? ""} {...props} />;
};
export default Img;

const StyledImage = styled.img`
  aspect-ratio: 1/1;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
`;
