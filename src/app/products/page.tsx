"use client";
import Screen from "@/components/screen/screen";
import { useTranslation } from "@/hooks/useTranslation";
import { Analytics } from "@vercel/analytics/react";

import BuyButton from "./products/buybutton";

export default function Products() {
  const { t } = useTranslation();
  
  return (
    <Screen>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("products.title")}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("products.description")}
          </p>
        </div>
      </div>
      <BuyButton
        componentId="product-component-1754935153925"
        productId="7900658729014"
      />
      <BuyButton
        componentId="product-component-1754937482467"
        productId="7813628297270"
      />
      <Analytics />
    </Screen>
  );
}
