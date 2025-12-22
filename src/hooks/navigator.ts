'use client';

import { useEffect, useState } from 'react';

export function useHash() {
  const [hash, setHash] = useState('');

  useEffect(() => {
    const update = () => setHash(window.location.hash);

    update(); // 初始化
    window.addEventListener('hashchange', update);

    return () => {
      window.removeEventListener('hashchange', update);
    };
  }, []);

  return hash;
}
