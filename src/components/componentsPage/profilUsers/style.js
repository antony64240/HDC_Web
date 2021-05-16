import styled from 'styled-components';


export const CONTAINER = styled.div`
    text-align:center;
`;

export const TABLE = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.2rem;
    margin-right: auto;
    margin-left: auto;
`;


export const ROW = styled.div`
    display: table-row;
`;


export const COLUMN = styled.div`
      display: table-cell;
  
`;
    

export const TextTitle = styled.div`
      font-size:3vh;
      font-weight:bolder;
`;

export const P = styled.div`
    color:'black';
    cursor : 'default';
    margin-top:1vh;
    font-size:1vh;
    font-weight:bolder;
`;