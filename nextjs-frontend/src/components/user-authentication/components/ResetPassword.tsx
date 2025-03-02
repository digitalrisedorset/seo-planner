import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {useResetPassword} from "../graphql/useRequestPassword";
import {ChangeEvent, useState} from "react";
import {useFlashMessage} from "@/state/FlassMessageState";
import {Feedback} from "@/components/global/components/Feedback";

interface TokenProps {
    token: string
}

export const ResetPassword: React.FC<TokenProps> = ({token}: TokenProps) => {
    const { inputs, handleChange, resetForm} = useForm({
        email: '',
        password: '',
        token: ''
    });
    const {addSuccessMessage, addErrorMessage} = useFlashMessage()
    const [resetpassword, { data }] = useResetPassword(inputs);
    const [confirmPassword, setConfirmPassword] = useState('');

    inputs['token'] = token

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting

        if (inputs.password !== confirmPassword) {
            addErrorMessage('Password and Confirm Password do not match')
            return
        }

        const res = await resetpassword().catch(console.error);
        resetForm();
        console.log('resetpassword', res)
        if (res?.data?.redeemUserPasswordResetToken?.message) {
            addErrorMessage(res?.data.redeemUserPasswordResetToken.message)
        } else {
            addSuccessMessage(`Your password was reset!`)
        }
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset your password</h2>
            <Feedback />
            <fieldset>
                {data?.redeemUserPasswordResetToken?.code === 'TOKEN_REDEEMED' && (
                    <p>Success! Your password is now reset!</p>
                )}

                <label htmlFor="email">
                    Email
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        required
                        type="password"
                        name="password"
                        minLength={6}
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="confirmPassword">
                    Confirm Password
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="password"
                        value={confirmPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <label htmlFor="token">
                    <input
                        required
                        type="hidden"
                        name="token"
                        placeholder="Token"
                        autoComplete="token"
                        value={inputs.token}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit Password</button>
            </fieldset>
        </Form>
    );
}
