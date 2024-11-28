import SignaturePad from "signature_pad";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('signature-pad');
  const signaturePad = new SignaturePad(canvas);

  // Clear button
  const clearButton = document.getElementById('clear-btn');
  clearButton.addEventListener('click', () => {
    signaturePad.clear();
  });

  // Save button
  const saveButton = document.getElementById('save-btn');
  saveButton.addEventListener('click', async () => {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature");
      return;
    }

    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const dataURL = signaturePad.toDataURL();

    try {
      const response = await fetch("/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ signature: dataURL }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Signature saved");
        console.log(result);
      } else {
        throw new Error("Failed to save the signature");
      }
    } catch (error) {
      console.error("Error saving signature", error);
    }
  });
});
