import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { SOCIALS } from "@/constants";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <section className="container relative max-w-6xl py-6 lg:py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold leading-3 tracking-tight text-primary lg:text-5xl">
            About
          </h1>
          <p className="text-xl text-muted-foreground">アクティ部について</p>
        </div>
      </div>
      <hr className="my-8" />

      <div className="flex flex-col items-center space-y-6 lg:flex-row  lg:space-x-6 lg:space-y-0">
        <div className="mx-auto mt-8 w-[400px]">
          <div className="relative flex flex-col items-center gap-2 rounded-md bg-card px-4 py-6">
            <Image
              src="/images/icon.png"
              width={82}
              height={82}
              alt="Active Club"
              className="absolute -top-8 mb-4 rounded-full border bg-primary h-[82px] object-scale-down"
            />
            <h3 className="mt-8 text-lg font-semibold">Active Club</h3>
            <p className="text-center text-sm text-muted-foreground">
              Play with Technology
            </p>
            <div className="flex items-center space-x-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.path}
                  rel="noreferrer"
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-primary px-0 hover:bg-primary transition-colors rounded-full p-2 size-8 bg-primary/20"
                  )}
                >
                  <social.icon className="size-6" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="flex-1 text-center text-sm text-muted-foreground lg:text-start xl:text-base">
          Active Club（通称アクティ部）は、大学で出会った技術とものづくりを愛する4人の仲間によって結成されたグループです。私たちは、工学・プログラミングといった各分野での知識やスキルを活かし、新しい技術の可能性を探求しています。DIYプロジェクトや最先端の技術トレンドを発信しながら、同じ志を持つ人々と学び合い、次世代のものづくりを一緒に育んでいくことを目指しています。
        </p>
      </div>
    </section>
  );
}
