export async function getLatestNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}`);
    const data = await response.json();
    return data.articles;
}