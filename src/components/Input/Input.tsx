import { InputHTMLAttributes } from 'react';
import {concatClassNames} from "../../utils/common";

import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = (props: InputProps) => {
    const { className, ...restProps } = props;

    return (
        <label className='label'>
            <p className='label__text'>{props.label}</p>
            <input
                {...restProps}
                className={concatClassNames('input', className)}
            />
        </label>
    );
};

export {Input};