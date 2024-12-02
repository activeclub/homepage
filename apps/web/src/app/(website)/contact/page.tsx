import { PageHeader } from "@/components/base/page-header";
import {
  ContactForm,
  type Schema as ContactFormSchema,
} from "@/components/page/contact";
import { CHANNEL_ID, sendMessage } from "@/lib/discord/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  const handleContact = async (values: ContactFormSchema) => {
    "use server";

    await sendMessage(
      CHANNEL_ID,
      `ホームページからお問い合わせがありました

お名前: ${values.username}
メールアドレス: ${values.email}
件名: ${values.subject}
本文: ${values.message}`,
    );
  };

  return (
    <section className="container relative max-w-6xl py-6 lg:py-10 mx-auto px-6 lg:px-10">
      <PageHeader
        title="Contact"
        description="アクティ部へのご質問やご意見、コラボレーションのご提案など、どんな内容でもお気軽にご連絡ください。皆さまからのお問い合わせをお待ちしています。"
      />

      <div className="flex flex-col items-center">
        <div className="max-w-lg w-full">
          <ContactForm sendMessage={handleContact} />
        </div>
      </div>
    </section>
  );
}
