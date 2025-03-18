import LearningEnviroment
 from "@/containers/LearningEnviroment";
async function getLearnEnvi() {
    const response = await fetch(
      `https://nct-frontend-liard.vercel.app/admin/api/learning-environment-page?populate=*`
    );
    const data = await response.json();

    return {
      learnEnvi: data.data.attributes.content,
      imageArray: data.data.attributes.images.data

    }
}

export default async function LearnEnvi() {
  const {learnEnvi, imageArray} = await getLearnEnvi();

  return (
    <div>
      <LearningEnviroment LearnEnvi={learnEnvi}  imageArray={imageArray}/>
    </div>
  );
}
