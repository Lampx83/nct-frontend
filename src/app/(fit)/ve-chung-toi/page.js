import AboustUs from "@/containers/AboutUs";
async function getAboutUs() {
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/about-us-page?populate=*`
    );
    const data = await response.json();

    return data.data
}

export default async function AboutUs() {
  const aboutUs = await getAboutUs();

  return (
    <div>
      <AboustUs aboutUs={aboutUs} />
    </div>
  );
}
