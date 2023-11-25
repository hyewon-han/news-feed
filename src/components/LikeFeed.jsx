import { db } from 'firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Button from './Button';

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
    <>
      <div>{like}</div>
      <Button onClick={updateFeedLike}>👍</Button>
    </>
  );
}

export default LikeFeed;
