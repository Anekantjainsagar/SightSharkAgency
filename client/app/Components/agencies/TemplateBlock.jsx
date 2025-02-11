import Context from "@/app/Context/Context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const TemplateBlock = ({ data }) => {
  const history = useRouter();
  const { setLinkToEmbed } = useContext(Context);

  return (
    <div
      className="border border-gray-400/20 rounded-xl p-1 relative hover:scale-105 transition-all"
      onClick={() => {
        setLinkToEmbed(data?.template_link);
        history.push("/view-report");
      }}
    >
      {data?.templat_image && (
        <Image
          src={data?.templat_image}
          alt={data?.templat_image?.src}
          width={1000}
          height={1000}
          className="cursor-pointer h-[18vh] md:h-[16vh] object-cover rounded-xl"
        />
      )}
      <p className="text-center min-[1600px]:text-sm text-xs my-1 mx-auto">
        {data?.template_name?.replaceAll("_", " ")}
      </p>
    </div>
  );
};

export default TemplateBlock;
