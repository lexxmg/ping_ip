
import { useState, useEffect } from 'react';

const useScroll = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handle = () => setScroll(window.scrollY);

    window.addEventListener('scroll', handle);

    return () => {
      window.removeEventListener('scroll', handle);
    }
  });

  return scroll;
}

export default useScroll;
