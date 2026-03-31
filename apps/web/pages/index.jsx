'use client';
import dynamic from 'next/dynamic';

const DonutsDamariWebsite = dynamic(
() => import('../components/DonutsDamariWebsite'),
  { ssr: false }
);

export default function Home() {
  return <DonutsDamariWebsite />
}
