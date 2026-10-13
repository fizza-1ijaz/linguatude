import type { Metadata } from "next";
import { HelpCenterChat } from "@/app/components/dashboard/help-center-chat";

export const metadata: Metadata = {
  title: "Chat with Ayra | Linguatude",
  description: "Chat with Ayra, your Linguatude AI assistant.",
  robots: { index: false, follow: false },
};

export default function HelpCenterChatPage() {
  return <HelpCenterChat />;
}
