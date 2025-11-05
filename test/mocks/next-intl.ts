// Mock next-intl hooks
export const useTranslations = (namespace: string) => {
  return (key: string) => `${namespace}.${key}`;
};

export const useLocale = () => 'en';

// Mock next/navigation
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  prefetch: () => Promise.resolve(),
});

export const usePathname = () => '/';
