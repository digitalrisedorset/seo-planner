import {useForm} from "@/components/global/hooks/useForm";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useUpdatePage} from "@/components/page/graphql/useUpdatePage";
import {KeystonePage} from "@/components/page/types/page";
import {router} from "next/client";
import {WebsiteSelect} from "@/components/page/components/Page/WebsiteSelect";
import {useWebsiteState} from "@/state/WebsiteStateProvider";
import {TextArea} from "@/components/global/components/Input/TextArea";
import React from "react";
import {usePage} from "@/components/page/graphql/usePage";

export interface EditPageProps {
    page: KeystonePage
}

export const EditPage: React.FC<EditPageProps> = ({page}: EditPageProps) => {
     const { inputs, handleChange, resetForm } = useForm({
         slug: page.slug,
         title: page.title,
         keywords: page.keywords,
         description: page.description,
         ranking: Number(page.ranking),
         priority: Number(page.priority)
     })
    const [updatePage] = useUpdatePage()
    //const [improvedDescription, setImprovedDescription] = useState('')
    const {websiteState} = useWebsiteState();
    const { refetch } = usePage(page.id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updatePage({
            variables: {
                "data": {
                    slug: inputs?.slug,
                    title: inputs?.title,
                    keywords: inputs?.keywords,
                    description: inputs?.description,
                    website: {
                        connect: {
                            id: websiteState.activeWebsiteId || page.website.id
                        }
                    },
                    ranking: Number(inputs?.ranking),
                    priority: Number(inputs?.priority)
                },
                "where": {
                    "id": page.id
                },
            }
        }).catch(console.error);
        await refetch();
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
                        placeholder="Page slug"
                        autoComplete="label"
                        value={inputs?.slug}
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
                        value={inputs?.title}
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
                {/*<label htmlFor="improved-description">*/}
                {/*    Improved Description*/}
                {/*    <textarea*/}
                {/*        name="improved-description"*/}
                {/*        rows={6}*/}
                {/*        placeholder="AI Input"*/}
                {/*        value={improvedDescription}*/}
                {/*        onChange={(e: ChangeEventHandler<HTMLTextAreaElement>) => setImprovedDescription(e.target.value)}*/}
                {/*    />*/}
                {/*</label>*/}
                {/*<button type="button" className="openai-button" onClick={handleTextImprovement}>Suggest Improvements*/}
                {/*</button>*/}
                <label htmlFor="improved-description">
                    Page Website
                    <WebsiteSelect page={page}/>
                </label>
                <label htmlFor="ranking">
                    Ranking
                    <input
                        required
                        type="number"
                        name="ranking"
                        placeholder="Ranking"
                        value={inputs?.ranking}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="priority">
                    Priority
                    <input
                        required
                        type="number"
                        name="priority"
                        placeholder="Priority"
                        value={inputs?.priority}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}
