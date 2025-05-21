export const fetchPageContent = async (url: string) => {
    // Step 1: Fetch page content
    let pageContent = '';
    try {
        const response = await fetch(url);
        pageContent = await response.text();
    } catch (err) {
        console.error('Failed to fetch page:', err);
        pageContent = ''
    }

    return pageContent
}