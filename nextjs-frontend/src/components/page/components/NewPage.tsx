import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useCreatePage} from "@/components/page/graphql/usePageCreate";
import {TextArea} from "@/components/global/components/Input/TextArea";

export const NewPage: React.FC = () => {
    const router = useRouter();
    const { inputs, handleChange, resetForm } = useForm({
        slug: '',
        title: '',
        keywords: '',
        description: '',
    });
    const [createPage] = useCreatePage(inputs)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createPage().catch(console.error);
        resetForm();
        router.push({pathname: `/`});
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Create New Page</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="slug">
                    Slug
                    <input
                        required
                        type="text"
                        name="slug"
                        placeholder="Page Slug"
                        autoComplete="label"
                        value={inputs.slug}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Title
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder="Page Title"
                        autoComplete="label"
                        value={inputs.title}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="keywords">
                    Keywords
                    <TextArea
                        name="keywords"
                        value={inputs.keywords}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <TextArea
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
