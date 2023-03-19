import { PUBLIC_GIPHY_API } from '$env/static/public';

// This uses the older API method instead of the newer Giphy SDK
export const giphy = async(search, offset) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${PUBLIC_GIPHY_API}&q=${search}&limit=16&offset=${offset}&rating=g&lang=en`;

  const request = await fetch(url)
  const response = await request.json();

  const gifs = response.data;

  return gifs.map(item => item.images.original.url);
}
