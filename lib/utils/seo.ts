import { SEOProps } from '@/types';

// Generate meta tags for SEO
export function generateMetaTags({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    keywords = [],
}: SEOProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fullTitle = `${title} | Student Platform`;
    const defaultImage = `${siteUrl}/images/og-default.jpg`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        canonical: canonical || siteUrl,
        openGraph: {
            title: fullTitle,
            description,
            url: canonical || siteUrl,
            type: ogType,
            images: [
                {
                    url: ogImage || defaultImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            images: [ogImage || defaultImage],
        },
    };
}

// Generate JSON-LD structured data for articles
export function generateArticleSchema(article: {
    title: string;
    description: string;
    author: string;
    publishedDate: Date;
    modifiedDate?: Date;
    image?: string;
    url: string;
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image || `${siteUrl}/images/og-default.jpg`,
        datePublished: article.publishedDate.toISOString(),
        dateModified: (article.modifiedDate || article.publishedDate).toISOString(),
        author: {
            '@type': 'Person',
            name: article.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Student Platform',
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': article.url,
        },
    };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Truncate text to specific length
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

// Format date
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}
