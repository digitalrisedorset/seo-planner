import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {useRouter} from "next/router";
import {Feedback} from "@/components/global/components/Feedback";
import {useFlashMessage} from "@/state/FlassMessageState";
import {reloadPage} from "@/lib/reload";

export const SignIn: React.FC = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const {addSuccessMessage, addErrorMessage} = useFlashMessage()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch('/api/login-with-credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });

     resetForm();
     const result = await response.json();

    if (result?.user) {
        addSuccessMessage(`Welcome back!`);
        reloadPage(router, "/pages"); // or wherever you want to go post-login
    } else {
        addErrorMessage("Login failed. Check your email and password.");
        console.log("Login error:", result.error);
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
