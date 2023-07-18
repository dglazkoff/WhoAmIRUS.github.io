import React, {FC} from 'react';
import {Button, ButtonProps} from "../Button/Button";
import {Spinner} from "../Spinner/Spinner";

import './ButtonAsyncAction.css';

interface ButtonAsyncActionProps extends ButtonProps {
    loading: boolean;
}

const ButtonAsyncAction: FC<ButtonAsyncActionProps> = (props) => {
    const { children, loading, disabled, ...restProps } = props;

    return (
        <Button {...restProps} disabled={disabled || loading} className='button_loading'>
            {loading && <Spinner width={15} height={15} color='#fff' className='button__spinner'/>}
            {children}
        </Button>
    );
};

export { ButtonAsyncAction };