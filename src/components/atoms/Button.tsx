import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    border: none;
    border-radius: 4px;
    background-color: lightgrey;
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    padding: 7px 14px;
    margin: 0 6px;
    height: fit-content;
`;

export default Button;
