import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "@/constants";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

const SITE_URL = SITE_CONFIG.url;
const DEFAULT_IMAGE = "/logo.jpg";

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex,
}: SEOProps) {
  const { data: settings } = useSiteSettings();

  const siteName = settings?.seo_title || SITE_CONFIG.name;
  const ogImage = settings?.seo_og_image || image;
  const twitterHandle = settings?.seo_twitter_handle || "@leogad";

  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...(path !== "/"
        ? [{
            "@type": "ListItem",
            position: 2,
            name: path.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()),
            item: url,
          }]
        : []),
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${ogImage}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />

      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
}
