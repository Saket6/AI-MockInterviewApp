

export const searchPlaylists = async (topics) => {
    const query = "Best videos for placement interviews preparations on:"+ topics
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;  // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=playlist&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error searching playlists:', error);
        return [];
    }
};