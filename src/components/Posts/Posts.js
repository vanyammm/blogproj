
import { Post } from '../Post/Post';

export const Posts = ({ posts }) => {

    return (
        <div className='posts-block'>
          {posts.map((post) => {
            return (
                <Post key={post.id} picture={post.picture} title={post.title} body={post.body} id={post.id} />
            );
          })}
        </div>
    );
};