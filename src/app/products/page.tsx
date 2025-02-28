"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";

export default function Products() {
  return (
    <>
      <div>
        <Screen>
          <h1>Products</h1>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
