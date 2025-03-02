import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useCreateWebsite} from "@/components/website/graphql/useWebsiteCreate";

export const NewWebsite: React.FC = () => {
    const router = useRouter();
    const { inputs, handleChange, resetForm } = useForm({
        label: '',
    });
    const [createWebsite] = useCreateWebsite(inputs)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createWebsite().catch(console.error);
        resetForm();
        router.push({pathname: `/`});
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Create New Website</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="name">
                    Title
                    <input
                        required
                        type="text"
                        name="label"
                        placeholder="Website Title"
                        autoComplete="label"
                        value={inputs.label}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
