"use client";
import Screen from "@/components/screen/screen";
import { SubStack } from "./substack";
import { Analytics } from "@vercel/analytics/react";
import Container from "@/components/layout/container";
import InstagramSection from "@/components/instagram/instagram-section";
import type { IgPost } from "@/services/instagram";

export default function Blog({ igPosts }: { igPosts: IgPost[] | null }) {
  return (
    <Screen>
      <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
        <SubStack />
      </div>
      <Container size="wide">
        <InstagramSection posts={igPosts} />
      </Container>
      <Analytics />
    </Screen>
  );
}
