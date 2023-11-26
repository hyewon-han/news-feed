import { db } from 'firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import styled from 'styled-components';

function LikeFeed({ feed }) {
  const [like, setLike] = useState(0);

  useEffect(() => {
    setLike(feed.like || 0);
  }, [feed]);

  const updateFeedLike = async () => {
    setLike(like + 1);
    const feedRef = doc(db, 'feeds', feed.id);
    await updateDoc(feedRef, {
      like: like + 1
    });
  };

  return (
    <Like>
      <div>{like}</div>
      <Button color="yellow" size="small" onClick={updateFeedLike}>
        ❤️
      </Button>
    </Like>
  );
}

export default LikeFeed;

const Like = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
