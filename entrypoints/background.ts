export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      if (message.action === "insertResponse") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (!tabs[0]?.id) return -1;

          const tabId = tabs[0].id;

          const response = message.response;

          chrome.scripting.executeScript(
            {
              target: { tabId: tabId, allFrames: true },
              func:function(message) {
                const aiIcon = document.getElementById("ai-icon");

                // Check if the AI icon exists
                if (aiIcon) {
                  // Get the parent element of the AI icon
                  const parentElement = aiIcon.parentElement;

                  if (!parentElement)
                    return { message: "Parent element not found!" };

                  // Now select the contenteditable div that is a sibling of the AI icon
                  const editableDiv = parentElement.querySelector(
                    "div[contenteditable='true']"
                  );

                  console.log("Attempting to insert message:", message);
                  console.log("Editable div:", editableDiv);

                  if (!editableDiv) {
                    console.error("Contenteditable div not found!");
                    return { message: "Contenteditable div not found!" };
                  }

                  if (editableDiv) {
                    // Insert the response into the contenteditable div
                    const newNode = document.createTextNode(message);

                    // Append the new text node to the contenteditable div
                    const para = document.createElement("p");
                    para.appendChild(newNode);
                    editableDiv.removeChild(editableDiv?.firstChild as Node);
                    editableDiv.appendChild(para);

                    const placeholder = document.getElementsByClassName(
                      "msg-form__placeholder"
                    )[0] as HTMLElement;

                    if (placeholder) {
                      placeholder.classList.remove("msg-form__placeholder");
                    }

                    parentElement.removeChild(aiIcon);
                  } else {
                    console.error("Contenteditable div not found!");
                  }

                  return { message: "Response inserted!" };
                }
              },
              args: [response],
            },
            (res) => {
              console.log("Response from executeScript", res);
              // window?.close();
            }
          );
        });
      }
    }
  );
});
