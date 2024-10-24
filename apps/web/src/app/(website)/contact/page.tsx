import { Metadata } from "next";
import { PageHeader } from "@/components/base/page-header";
import { ContactForm } from "@/components/page/contact";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <section className="container relative max-w-6xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
      <PageHeader
        title="Contact"
        description="アクティ部へのご質問やご意見、コラボレーションのご提案など、どんな内容でもお気軽にご連絡ください。皆さまからのお問い合わせをお待ちしています。"
      />

      <div className="flex flex-col items-center">
        <div className="max-w-lg w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
