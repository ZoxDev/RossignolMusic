const getRandomTag = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;

    // Get all the tags
    const getAllThePages = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY}&format=json`).then(res => res.json());

    // Get a random page in result
    const randomPage = Math.floor(Math.random() * getAllThePages.tags['@attr'].totalPages) + 1;

    // Get a random tag in the page
    const getTagsOnPage = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=${API_KEY}&format=json&page=${randomPage}`).then(res => res.json());
    const getRandomTagIndex = Math.floor(Math.random() * getTagsOnPage.tags.tag.length);
    const tagName = getTagsOnPage.tags.tag[getRandomTagIndex].name;

    return console.log(tagName);
}

export default getRandomTag;