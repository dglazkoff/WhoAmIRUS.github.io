import {FC, FormEvent, useEffect} from 'react';
import avatar from '../assets/avatar.svg';
import {Input} from "../components/Input/Input";

import './AuthPage.css';
import {useRequest} from "../useRequest";
import {ButtonAsyncAction} from "../components/ButtonAsyncAction/ButtonAsyncAction";

const AuthPage: FC = () => {
    const [state, request] = useRequest('/api/login');

    const handleSubmit = (formEvent: FormEvent) => {
        formEvent.preventDefault();
        const data = new FormData(formEvent.target as HTMLFormElement);

        request({ method: 'POST', body: Object.fromEntries(data.entries()) });
    }

    useEffect(() => {
        if (state.response) {
            alert(`SUCCESS response: ${JSON.stringify(state.response)}`)
        } else if (state.error) {
            alert(`ERROR: ${state.error}`)
        }
    }, [state])

    return (
        <main className='container'>
            <h1>Welcome</h1>
            <img src={avatar} alt="avatar" className='avatar'/>
            <form onSubmit={handleSubmit} className="form">
                <Input
                    type="email"
                    name="email"
                    className='input-email'
                    label='Email'
                    autoComplete='username'
                    required
                />
                <Input
                    type="password"
                    name="password"
                    className='input-password'
                    label='Password'
                    autoComplete='current-password'
                    required
                />
                <ButtonAsyncAction type="submit" loading={state.isLoading}>Sign In</ButtonAsyncAction>
            </form>
        </main>
    );
};

export { AuthPage };