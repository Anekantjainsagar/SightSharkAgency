"use client";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

const HelpPage = ({ showSubscribe, setShowSubscribe }) => {
  // const history = useRouter();
  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-main rounded-lg relative">
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] left-0 absolute bottom-0 rounded-full"></div>
          <div className="bg-newBubbleColor/10 w-[15vw] h-[15vw] right-0 absolute top-3/6 rounded-full"></div>
          <div className="relative rounded-lg backdrop-blur-3xl py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center w-[80vw] md:w-[22vw] min-[1600px]:w-[25vw]">
            <AiOutlineClose
              className="text-2xl absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            />
            <Image
              src={"/agent.png"}
              alt="Agent png"
              className="w-20 aspect-square rounded-full"
              width={1000}
              height={1000}
            />
            <h4 className="mainText20 w-11/12 text-center mt-3">
              Talk to a member of our Support team.
            </h4>
            <p className="bg-[#171C2A]/40 p-3 text-[#ECECED] text-center text-[13px] min-[1600px]:text-base my-3">
              Our support team is here to assist you with any questions or
              issues you may have.
            </p>
            <button
              className={`bg-newBlue w-full py-2 rounded-lg text-sm min-[1600px]:text-base text-center`}
              onClick={() => {
                window.navigator.clipboard.writeText("support@sightshark.com");
                window.open(
                  "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCJFGLmMqszhnpbMGjMzrDTxnsvddZqRvtbmvLMvXkWJgmpRbLBvjqBzxCKNSZFWMQlgrL",
                  "__blank"
                );
                setShowSubscribe(!showSubscribe);
              }}
            >
              support@sightshark.com
            </button>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpPage;
