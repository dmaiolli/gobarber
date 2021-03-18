import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// É a mesma função da interface, porém vazia ela se transforma num type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
