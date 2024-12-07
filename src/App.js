import './App.scss';

import { useEffect, useState } from "react";

import { fetchPostData, preloadImages } from './modules';

import { Pagination } from './components/Pagination/Pagination';
import { Skeleton } from './components/Skeleton/Skeleton';
import { Posts } from './components/Posts/Posts';

function App() {
  
  console.log('APP');
    
  const [posts, setPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts[currentPage]) return;
      setIsLoading(true);

      const startValue = (currentPage - 1) * 10 + 1;
      const endValue = startValue + 10;
      const fetchedPosts = [];

      for (let i = startValue; i < endValue; i++) {
        const post = await fetchPostData(i);
        if (post) fetchedPosts.push(post);
      }

      await preloadImages(fetchedPosts);

      setPosts((prev) => ({
        ...prev,
        [currentPage]: fetchedPosts,
      }));
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  const currentPosts = posts[currentPage] || [];

  return (
    <div className="App">
      {isLoading ? <Skeleton /> : <Posts posts={currentPosts} />}
      <div className='navigation'>
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default App;
