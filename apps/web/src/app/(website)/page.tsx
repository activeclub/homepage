"use client";

import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/constants";
import Link from "next/link";

export default function Index() {
  return (
    <section className="flex-grow flex flex-col items-center justify-center text-center py-16 lg:py-32 px-2 lg:px-0">
      <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
        Play with Technology
      </h2>
      <div className="flex space-x-4 mb-12 lg:mb-16">
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
        <Button asChild>
          <Link
            href="https://activeclub.substack.com/"
            target="_blank"
            rel="noreferer noopener"
          >
            購読する
          </Link>
        </Button>
      </section>
    </section>
  );
}
