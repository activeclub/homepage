"use client";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();
  return (
    <section className="flex-grow flex flex-col items-center justify-center text-center py-16 lg:py-32">
      <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
        Play with Technology
      </h2>
      <div className="flex space-x-4 mb-8">
        {SOCIALS.map((social) => (
          <Link
            key={social.label}
            href={social.path}
            rel="noreferrer"
            target="_blank"
            className="hover:text-gray-300"
          >
            <social.icon size={24} />
          </Link>
        ))}
      </div>
      <Button onClick={() => router.push("/blog")}>ブログを読む</Button>
    </section>
  );
}
