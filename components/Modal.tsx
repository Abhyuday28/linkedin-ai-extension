import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import InsertIcon from "@/assets/icons/insert";
import RegenerateIcon from "@/assets/icons/regenerate";
import SendIcon from "@/assets/icons/send";
import { createRoot } from "react-dom/client";

const Modal = ({
  closeModal,
  insertResponse,
}: {
  closeModal: () => void;
  insertResponse: (responseText: string) => void;
}) => {
  const [input, setInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState(1);

  const handleGenerate = () => {
    setResponseText(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
    setInputText(input);
    setInput("");
    setStep(2);
  };

  const insertResponseModal = () => {
    insertResponse(responseText);
    closeModal(); // Close modal on successful insertion
  };

  return (
    <div className="">
      <div
        className="fixed bg-[#000] z-[200] opacity-50 top-0 w-[100vw] h-[100vh]"
        onClick={closeModal}
      ></div>
      <div className="w-[60vw] opacity-100 translate-x-[-50%] translate-y-[-50%] z-[9999] bg-[#fff] fixed top-[50%] left-[50%] h-[auto] flex justify-center bg-[#F9FAFB] relative p-[26px] rounded-lg shadow-lg flex-col ">
        {step === 2 && (
          <div className="flex gap-[26px] flex-col mb-[26px]">
            <div className="ml-auto max-w-[75%] rounded-[12px] bg-[#DFE1E7] p-[16px]">
              <p>{inputText}</p>
            </div>
            <div className="mr-auto max-w-[75%] rounded-[12px] bg-[#DBEAFE] p-[16px]">
              <p>{responseText}</p>
            </div>
          </div>
        )}
        <div className=" w-full flex flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border h-[50px] border-[#C1C7D0] border-[1px] p-2 w-full rounded-[8px] rounded-lg text-[1.125em]"
            placeholder="Your Prompt"
            style={{
              borderRadius: "8px",
              height: "50px",
              border: "1px solid #C1C7D0",
              padding: "8px",
              width: "100%",
              fontSize: "1.125em",
            }}
          />
          <div className=" ml-auto flex justify-center mt-[26px]">
            {step === 2 ? (
              <div className="flex flex-row">
                <button
                  onClick={insertResponseModal}
                  className="border-[1px] border-[#666D80] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#666D80] text-[1.125em] mr-[26px]"
                  style={{
                    border: "1px solid #666D80",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "1.125em",
                  }}
                >
                  <InsertIcon height={"16px"} />
                  Insert
                </button>
                <button
                  onClick={handleGenerate}
                  className="bg-[#3B82F6] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#fff] text-[1.125em]"
                >
                  <RegenerateIcon width={"20px"} height={"20px"} />
                  Regenerate
                </button>
              </div>
            ) : (
              <button
                onClick={handleGenerate}
                className="bg-[#3B82F6] py-[12px] gap-[10px] items-center rounded-[8px] px-[24px] flex text-[#fff] text-[1.125em]"
              >
                <SendIcon width={"20px"} height={"20px"} />
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Function to mount the modal
export const mountModal = (insertResponse: (responseText: string) => void) => {
  // Create a container for the modal
  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";
  document.body.appendChild(modalContainer);

  // Create the root for React 18
  const root = createRoot(modalContainer);

  const closeModal = () => {
    // Unmount the modal and remove the container
    root.unmount(); // This replaces ReactDOM.unmountComponentAtNode
    modalContainer.remove();
  };

  // Render the Modal into the modalContainer
  root.render(
    <Modal closeModal={closeModal} insertResponse={insertResponse} />
  );
};
