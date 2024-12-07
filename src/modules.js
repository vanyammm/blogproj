export const preloadImages = async (posts) => {
  const imagePromises = posts.map(async (post) => {
    if (!imageCache[post.picture]) {
      const img = new Image();
      img.src = post.picture;
      await img.decode();
      imageCache[post.picture] = img.src;
    }
  });

  await Promise.all(imagePromises); 
};

export const fetchImageUrl = async (id, lowQuality = true) => {
    try {
      const response = await fetch(`https://picsum.photos/id/${id + 10}/${lowQuality ? 50 : 200}`);
      return response.url;
    } catch (error) {
      console.error(error);
    }
  }

  export const fetchPostData = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const json = await response.json();
      const image = await fetchImageUrl(id);

      json.picture = image;

      return json;
    } catch (error) {
      console.error(error);
    }
  }

  export const fetchAndCacheImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
  
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };
  
  const imageCache = {};

export const getCachedImage = async (id, lowQuality = true) => {
    const size = lowQuality ? 50 : 200;
    const url = `https://picsum.photos/id/${id + 10}/${size}`;
  
    if (imageCache[url]) {
      return imageCache[url];
    }
  
    const imageBase64 = await fetchAndCacheImage(url);
    if (imageBase64) {
      imageCache[url] = imageBase64;
    }
    return imageBase64;
  };
  