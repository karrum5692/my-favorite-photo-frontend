'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function TimeAgo({ date, className }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const update = () =>
      setText(
        formatDistanceToNow(new Date(date), { locale: ko, addSuffix: true })
      );
    update();
    // 1분마다 갱신 (선택) — "방금 전" → "1분 전" 자동 반영
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [date]);

  return <span className={className}>{text}</span>;
}
