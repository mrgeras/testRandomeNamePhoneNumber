import React from 'react';
import { IButtonProps } from '../types/buttonTypes';

const Button = React.memo(({ onClick }: IButtonProps) => {
  return (
    <button className='btn' type='button' onClick={(event) => onClick(event)}>
      Get random user
    </button>
  );
});

export default Button;