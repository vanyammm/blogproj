import './Post.scss';
import { ProgressiveImage } from '../ProgressiveImage/ProgressiveImage';

import { useState } from 'react';

export const Post = ({ id, picture, title, body }) => {

    const [counter, setCounter] = useState(0);

    return (
        <div className='post'>
              <ProgressiveImage src={picture} id={id} />
              <button onClick={() => setCounter((prev) => prev + 1)}>count: {counter}</button>
              <div className='post-main'>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
        </div>
    );
};