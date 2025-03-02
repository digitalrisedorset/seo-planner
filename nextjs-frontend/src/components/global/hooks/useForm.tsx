import {  useState } from 'react';
import {formProps} from "@/components/global/types/form";

export const useForm = (initial: formProps) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState<formProps>(initial);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {//Event & { target: HTMLInputElement }) {
    const { value, name } = e.target;

    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    setInputs({'test':'val'})
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
