import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

const SITE_URL = "https://leogad.pages.dev";
const DEFAULT_IMAGE = "/logo.jpg";
const SITE_NAME = "Hakizimana Leogad — Embedded Systems & IoT Engineer";

const breadcrumbBase = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
};

export function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const breadcrumb: typeof breadcrumbBase = {
    ...breadcrumbBase,
    itemListElement: [...breadcrumbBase.itemListElement],
  };

  if (path !== "/") {
    const label = path.replace("/", "").replace(/^\w/, (c) => c.toUpperCase());
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: url,
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
}
