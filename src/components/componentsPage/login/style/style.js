import styled from 'styled-components';

export const BaseContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.div`
    font-size: 24px;
    font-family: "Open Sans", sans-serif;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

export const IMGContainer = styled.div`
    width: 21em;
`;

export const Href = styled.a`
color: $link-color;
position: relative;
text-decoration: none;
transition: all 0.15s ease-out;
&:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0px;
  left: 0;
  background: #000000;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}
&:hover {
  transition: all 0.15s ease-out;
  cursor: pointer;
  &:before {
      visibility: visible;
      transform: scaleX(1);
  }
}
`;

export const ImgLogin = styled.img`
    width: 100%;
    height: 100%;
`;

export const Form = styled.form`
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
`;

export const Input = styled.input`
    margin-top: 6px;
    min-width: 18em;
    height: 37px;
    padding: 0px 10px;
    font-size: 16px;
    font-family: "Open Sans", sans-serif;
    background-color: #f3f3f3;
    border: 0;
    border-radius: 4px;
    margin-bottom: 31px;
    transition: all 250ms ease-in-out;
    &:hover {
        background-color: #ffffff;
        box-shadow: 0px 0px 14px 0.3px #0e81ce96;
    }
    &:focus {
        outline: none;
        box-shadow: 0px 0px 12px 0.8px #3474dbb2;
    }
`;

export const Label = styled.label`
    font-size: 20px;
`;

export const Footer = styled.div`
    margin-top: 10px;
`;

export const Btn = styled.button`
font-size: 21px;
padding: 5px 10px;
border: 0;
margin-bottom :20px;
background-color: #3498db;
color: #fff;
border-radius: 3px;
transition: all 250ms ease-in-out;
cursor: pointer; }
    &:hover {
    background-color: #2386c8; }
    &:focus {
    outline: none; }
`;

export const Error = styled.label`
    font-size: 12px;
`;
