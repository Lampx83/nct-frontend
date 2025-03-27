import axios from "axios";
import LabsDescription from "@/components/labs/LabsIntro";
import LabList from "@/components/labs/LabsList";
async function getDescription() {
    const res = await axios.get(
      `https://nct-frontend-liard.vercel.app/admin/api/labs-page`
    );
    return res.data.data.attributes.description;
  }

async function getLabs() {
    const res = await axios.get(
      `https://nct-frontend-liard.vercel.app/admin/api/labs?populate=*`
    );
    return res.data.data;
}

export default async function LabsPage() {
    const description = await getDescription();
    const labs = await getLabs();
    return (
        <div className="p-4 shadow-md bg-white mt-5 pt-5 container mx-auto">
            <LabsDescription description={description} />
            <LabList labs={labs} />
        </div>
    );
}
