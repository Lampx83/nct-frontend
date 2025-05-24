import AboustUs from "@/containers/AboutUs";
async function getAboutUs() {
    const response = await fetch(
      `https://nct.neu.edu.vn/admin/api/about-us-page?populate=*`,
      {
        cache: "no-cache"
      }
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
