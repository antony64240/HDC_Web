import styled, { keyframes } from 'styled-components';


export const BUTTONEN = styled.button`
outline: none;
width: 40px;
height:30px;
border-bottom-left-radius: 20px;
border-top-left-radius: 20px;
border : 0px;
border-right: 2px solid black;
font-weight: bold;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
&:focus{
    background: #1976d2
}
&:hover{
    background : rgb(17, 82, 147);
}
`;



export const BUTTONFR = styled.button`
outline: none;
width: 40px;
font-weight: bold;
height:30px;
border : 0px;
border-bottom-right-radius: 20px;
border-top-right-radius: 20px;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
&:focus{
    background: #1976d2;
}
&:hover{
    background : rgb(17, 82, 147);
}
`;


