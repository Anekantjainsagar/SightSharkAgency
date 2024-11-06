import Image from "next/image";

const TemplateBlock = ({ data }) => {
  return (
    <div
      className="border border-gray-400/20 rounded-xl p-1 relative"
      onClick={() => {
        window.open(data?.template_link, "__blank");
      }}
    >
      {data?.template_image && (
        <Image
          src={data?.template_image}
          alt={data?.template_image?.src}
          width={1000}
          height={1000}
          className="rounded-md cursor-pointer h-[10vh] object-cover"
        />
      )}
      <p className="text-center text-sm my-1 mx-auto">{data?.template_name}</p>
    </div>
  );
};

export default TemplateBlock;
