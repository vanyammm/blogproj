import { useState, useEffect } from 'react';

function Test () {

    const [pic, setPic] = useState('');
    const [picc, setPicc] = useState('');

    async function fetchImageUrl() {
        try {
          const response = await fetch(`https://picsum.photos/id/${11}/200`);
          setPic(response.url);
          const responsee = await fetch(`https://picsum.photos/id/${11}/50`);
          setPicc(responsee.url);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function fetchPostData(id) {
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

      useEffect(() => {
        fetchImageUrl();
      }, []);

    return (
        <>
        test
        <img src={pic} alt="Random from Picsum" />
        <img src={picc} style={{width: 200, height: 200}} alt="Random from Picsum" />
        </>
    );
}

export default Test;