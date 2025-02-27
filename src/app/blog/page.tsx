"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation";
import OrgContentBody from "@/components/about-body";
import { useState, useEffect } from "react";

export default function Blog({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Screen>
          <h1>Blog</h1>
        </Screen>
      </div>
    </>
  );
}
