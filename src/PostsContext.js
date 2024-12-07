// PostsContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    // Відновлення постів з Local Storage
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Зберігати пости в Local Storage при оновленні
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Фетчимо дані
  const fetchPosts = useCallback(async (page) => {
    console.log('fetchPosts()')
    const startIndex = (page - 1) * 10 + 1;
    const endIndex = startIndex + 9;

    const fetchedPosts = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`);
      const post = await response.json();

      const imageResponse = await fetch(`https://picsum.photos/id/${i + 10}/200`);
      post.picture = imageResponse.url;

      fetchedPosts.push(post);
    }

    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, ...fetchedPosts];
      return Array.from(new Map(newPosts.map((item) => [item.id, item])).values());
    });
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        currentPage,
        setCurrentPage,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
