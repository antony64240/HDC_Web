import React from 'react'
import styled from 'styled-components';

const Icon = styled.i`
    font-size: 18px;
    margin-right: 16px;
`

export default function Icons({className}) {
    return <Icon className={className} />
}

