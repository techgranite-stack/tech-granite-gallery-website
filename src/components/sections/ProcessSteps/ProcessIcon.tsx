import type { ProcessIconName } from '@/types';

const PATHS: Record<ProcessIconName, React.ReactNode> = {
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z" />,
  slab: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M4 9c4-2 6 2 10 0s4-1 6-1M4 15c4-2 6 2 10 0s4-1 6-1" />
    </>
  ),
  visualize: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  truck: (
    <>
      <path d="M2 6h11v10H2zM13 10h5l3 3v3h-8z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  factory: <path d="M3 21V10l6 3V10l6 3V6h3v15zM7 17h2M12 17h2" />,
  build: <path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6" />,
};

export default function ProcessIcon({ name }: { name: ProcessIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
