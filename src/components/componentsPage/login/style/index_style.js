import React from 'react';
import { Error , BaseContainer, Header, Content,ImgLogin ,IMGContainer, Form, FormGroup, Label , Input, Footer , Btn , Href} from './style';

export default function LoginStyle({ children, ...restProps }) {
  return <BaseContainer {...restProps}>{children}</BaseContainer>;
};

LoginStyle.Content = function LoginWrapper({children, ...restProps}) {
   return <Content {...restProps}>{children}</Content>
};

LoginStyle.IMGContainer = function LoginRow({ children, ...restProps }) {
  return <IMGContainer {...restProps}>{children}</IMGContainer>;
};
LoginStyle.ImgLogin = function LoginRow({ children, ...restProps }) {
    return <ImgLogin {...restProps}>{children}</ImgLogin>;
};

LoginStyle.Input = function LoginRow({ children, ...restProps }) {
    return <Input {...restProps}>{children}</Input>;
};

LoginStyle.FormGroup = function LoginColumn({ children, ...restProps }) {
  return <FormGroup {...restProps}>{children}</FormGroup>;
};

LoginStyle.Header = function LoginTitle({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

LoginStyle.Form = function LoginColumn({ children, ...restProps }) {
  return <Form {...restProps}>{children}</Form>;
};

LoginStyle.Label = function LoginRow({ children, ...restProps }){
  return <Label {...restProps}>{children}</Label>
};

LoginStyle.Footer = function LoginRow({ children, ...restProps }){
    return <Footer {...restProps}>{children}</Footer>
};
LoginStyle.Href = function LoginRow({ children, ...restProps }){
    return <Href {...restProps}>{children}</Href>
};
LoginStyle.Btn = function LoginRow({ children, ...restProps }){
    return <Btn {...restProps}>{children}</Btn>
};

LoginStyle.Error = function LoginRow({ children, ...restProps }){
  return <Error {...restProps}>{children}</Error>
};
