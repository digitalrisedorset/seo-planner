import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {useRequestReset} from "../graphql/useRequestRest";

export const RequestReset: React.FC = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    token: ''
  });
  const [requestreset, { data }] = useRequestReset(inputs)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting
    await requestreset().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <fieldset>
        {data?.sendUserPasswordResetLink === true && (
          <p>Success! Check your email for a link!</p>
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
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
