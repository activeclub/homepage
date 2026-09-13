import type { SVGProps } from "react";
import { siGithub, siX, siYoutube } from "simple-icons";

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function BrandIcon({
  path,
  size = 24,
  ...props
}: BrandIconProps & { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

export function GithubIcon(props: BrandIconProps) {
  return <BrandIcon path={siGithub.path} {...props} />;
}

export function YoutubeIcon(props: BrandIconProps) {
  return <BrandIcon path={siYoutube.path} {...props} />;
}

export function XIcon(props: BrandIconProps) {
  return <BrandIcon path={siX.path} {...props} />;
}
