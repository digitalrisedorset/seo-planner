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
import {useFlashMessage} from "@/state/FlassMessageState";
import {useUserWebsite} from "@/components/website/graphql/useUserWebsite";
import {usePageState} from "@/state/PageStateProvider";
import {usePageVersions} from "@/components/page/graphql/usePageVersions";

export interface EditPageProps {
    page: KeystonePage
}

export const EditPage: React.FC<EditPageProps> = ({page}: EditPageProps) => {
     const { inputs, handleChange, resetForm } = useForm({
         slug: page.slug,
         title: page.currentVersion?.title,
         keywords: page.currentVersion?.keywords,
         description: page.currentVersion?.description,
         ranking: Number(page.ranking),
         priority: Number(page.priority)
     })
    const [updatePageContent] = useUpdatePage(page.id)
    const {websiteState} = useWebsiteState();
    const { refetchPageVersions } = usePageVersions(page.id)
    const {addSuccessMessage} = useFlashMessage()
    const website = useUserWebsite();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updatePageContent({
            variables: {
                updatePageContentId: page.id,
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
            }
        }).catch(console.error);
        const result = await refetchPageVersions()
        const latest = result?.data?.pageVersions?.slice(-1)[0];
        if (latest?.id) {
            //toggleActivePageVersion(latest.id); // if using version state
        }
        addSuccessMessage(`Your page was updated`)
        router.push({pathname: `/edit-page/${page.id}`});
    }

    const handleAugment = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname:`/augment/${page.id}`})
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Edit Page SEO data</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="website">
                    Website
                    <input
                        type="text"
                        name="website"
                        placeholder="Page website"
                        autoComplete="label"
                        value={website?.data?.website.label || ''}
                        disabled
                    />
                </label>
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
                <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        name="title"
                        placeholder="Page title"
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
                <button type="submit">Submit</button>&nbsp;
                <button type="button" onClick={handleAugment}>Augment Data</button>
            </fieldset>
        </Form>
    );
}
