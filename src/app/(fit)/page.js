import Home from "@/containers/Home";
import TrangChinh from "@/containers/TrangChinh";
import axios from "axios";
import config from "@/utils/config";

export function generationViewport() {
    return {
        viewport: 'width=device-width, initial-scale=1'
    }
}

export async function generateMetadata() {
    const respone = await axios.get(`${config.API_URL}/api/index-page?populate=deep`);
    const data = response.data.data;
    const seo = data.attributes.seo;
    const carousel = data.attributes.carousel;

    const defaultTitle = 'Trường nghệ thông - Đại học Kinh tế Quốc dân';
    const defaultDescription = 'Trường Công nghệ – một thành viên của Trường Đại học Kinh tế Quốc dân, nơi khai phóng tiềm năng công nghệ và sáng tạo.';

    const majorKeywords = carousel?.map(item => item.title).join(', ');

    return {

        title: seo?.metaTitle || defaultTitle,
        description: seo?.metaDescription || defaultDescription,
        keywords: seo?.keywords || `${majorKeywords},Trường Công nghệ Đại học Kinh tế Quốc dân`,

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
        canonical: seo?.canonicalURL || config.SITE_URL,
        openGraph: {
            title: seo?.metaTitle || defaultTitle,
            description: seo?.metaDescription || defaultDescription,
            url: 'https://nct-frontend-liard.vercel.app',
            siteName: 'Trường Công nghệ  - Đại học Kinh tế Quốc dân',
            type: 'website',
            locale: 'vi_VN',
            images: [{
                url: 'https://nct-frontend-liard.vercel.app/admin/uploads/thumbnail_Logo_NCT_2c6aabc9dc.png',
                width: 1200,
                height: 630,
                alt: 'Logo Trường Công nghệ '
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: seo?.metaTitle || defaultTitle,
            description: seo?.metaDescription || defaultDescription,
            images: ['https://nct-frontend-liard.vercel.app/admin/uploads/thumbnail_Logo_NCT_2c6aabc9dc.png'],
        },
        other: {
            'application/ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: 'Trường Công nghệ - Đại học Kinh tế Quốc dân',
                url: 'https://nct-frontend-liard.vercel.app',
                description: seo?.metaDescription || defaultDescription,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Hai Bà Trưng, Hà Nội',
                    addressCountry: 'VN'
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Chương trình đào tạo',
                    itemListElement: carousel?.map(major => ({
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'EducationalOccupationalProgram',
                            name: major.title,
                            url: `https://nct-frontend-liard.vercel.app${major.url}`
                        }
                    }))
                }
            })



        }
    };


}



export default function HomePage() {
    return (
        // <Home />
        <TrangChinh />
    );
}
