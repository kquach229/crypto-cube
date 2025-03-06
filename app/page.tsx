'use client';

import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function Home() {
  const { theme } = useTheme();

  return <div>hello</div>;
}
