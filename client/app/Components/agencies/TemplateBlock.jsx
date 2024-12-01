import Image from "next/image";

const TemplateBlock = ({ data }) => {
  return (
    <div
      className="border border-gray-400/20 rounded-xl p-1 relative hover:scale-105 transition-all"
      onClick={() => {
        window.open(data?.template_link, "__blank");
      }}
    >
      {data?.templat_image && (
        <Image
          src={data?.templat_image}
          alt={data?.templat_image?.src}
          width={1000}
          height={1000}
          className="rounded-md cursor-pointer h-[14vh] object-cover"
        />
      )}
      <p className="text-center text-sm my-1 mx-auto">{data?.template_name}</p>
    </div>
  );
};

export default TemplateBlock;
