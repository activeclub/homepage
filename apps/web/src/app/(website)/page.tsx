"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/constants";

export default function Index() {
  return (
    <section className="grow flex flex-col items-center justify-center text-center py-16 lg:py-32 px-2 lg:px-0">
      <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
        Play with Technology
      </h2>
      <div className="flex gap-4 mb-12 lg:mb-16">
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
      <section className="w-full mx-auto text-center mb-12">
        <h3 className="text-2xl font-semibold mb-4">ニュースレターを配信中</h3>
        <p className="mb-4">
          ものづくりに関連する最新ニュースやビジネス情報をお届けします。
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link
              href="https://note.com/activeclub"
              target="_blank"
              rel="noreferer noopener"
            >
              日本語 (note)
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="https://activeclub.substack.com"
              target="_blank"
              rel="noreferer noopener"
            >
              English (Substack)
            </Link>
          </Button>
        </div>
      </section>
    </section>
  );
}
