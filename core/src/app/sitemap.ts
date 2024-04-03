import { MetadataRoute } from 'next';
import { appNavs } from '@/data/navigation';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_APP_DOMAIN,
      lastModified: new Date(),
    },
    ...appNavs.map((page) => ({
      url: process.env.NEXT_PUBLIC_APP_DOMAIN + page.href,
      lastModified: new Date(),
    })),
  ];
}
