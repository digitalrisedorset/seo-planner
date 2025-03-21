import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {useLoginUser} from "../graphql/useLoginUser";
import {useRouter} from "next/router";
import {Feedback} from "@/components/global/components/Feedback";
import {useFlashMessage} from "@/state/FlassMessageState";

export const SignIn: React.FC = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const setUserLogged = useLoginUser(inputs)
  const {addSuccessMessage, addErrorMessage} = useFlashMessage()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting
    const res = await setUserLogged()

    resetForm();
    if (!res.name) {
      addErrorMessage('Something went wrong!')
      console.log('error when logging')
    } else {
      addSuccessMessage(`Welcome ${res.name}!`)
      router.push({pathname: `/pages`});
    }
  }

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <Feedback />
        <fieldset>
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
                placeholder="Password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
            />
          </label>
          <button type="submit">Sign In!</button>
        </fieldset>
      </Form>
  );
}
