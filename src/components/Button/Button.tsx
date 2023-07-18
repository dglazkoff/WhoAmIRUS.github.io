import { ButtonHTMLAttributes, FC } from 'react';
import {concatClassNames} from "../../utils/common";

import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = (props) => {
    const { className, children, ...restProps } = props;

    return (
        <button
            {...restProps}
            className={concatClassNames('button', className)}
        >
            {children}
        </button>
    );
};

export { Button };