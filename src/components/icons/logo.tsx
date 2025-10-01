import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 20V14" />
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 14H9V11H6Z" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" />
      <path d="M12 10H15V7H12Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
    </svg>
  );
}
