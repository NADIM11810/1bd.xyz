import dotenv from "dotenv";
import pdftopic from "pdftopic";
import tesseract from "tesseract.js";
dotenv.config();

const convertPdfToImage = async (pdfBase64) => {
  try {
    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    const imagesBuffer = await pdftopic.pdftobuffer(pdfBuffer, 0);
    return imagesBuffer[0];
  } catch (error) {
    throw new Error("Error converting PDF to image: " + error.message);
  }
};

const extractTextFromImage = async (base64Image) => {
  try {
    const { data } = await tesseract.recognize(
      Buffer.from(base64Image, "base64"),
      "eng+ben"
    );
    return data.text;
  } catch (error) {
    throw new Error("Error extracting text from image: " + error.message);
  }
};

export const extractBirthInfo = async (req, res) => {
  try {
    const { fileBase64, type } = req.body;

    if (!fileBase64) {
      return res.status(400).json({ error: "No PDF or Image data provided" });
    }

    const imageBase64 = type.includes("image")
      ? fileBase64
      : await convertPdfToImage(fileBase64);
    const extractedText = await extractTextFromImage(imageBase64);

    const url = "https://api.fireworks.ai/inference/v1/completions";
    const payload = {
      model: "accounts/fireworks/models/deepseek-v3",
      max_tokens: 16384,
      top_p: 1,
      top_k: 40,
      presence_penalty: 0,
      frequency_penalty: 0,
      temperature: 0.1,
      prompt: `Extract all relevant birth certificate details from the following text and return them as a structured JSON. Ensure that:
                          - Names and addresses are in title case.
                          - Dates follow the format 'MM/DD/YYYY'.
                          - Date of birth is also formatted in words (e.g., Twenty Seventh of January Two Thousand Five).
                          - registerOfficeAddress should be extracted as a single field (e.g., Sakpura Union Parishad).

                          Extract these fields:
                          1. registerOfficeAddress
                          2. upazilaOrCity
                          3. birthRegistrationNumber
                          4. leftBarcode
                          5. dateOfRegistration
                          6. dateOfIssuance
                          7. dateOfBirth
                          8. gender
                          9. dateOfBirthInWords
                          10. nameInBangla
                          11. nameInEnglish
                          12. fatherNameInBangla
                          13. fatherNameInEnglish
                          14. motherNameInBangla
                          15. motherNameInEnglish
                          16. placeOfBirthInBangla
                          17. placeOfBirthInEnglish
                          18. permanentAddressInBangla
                          19. permanentAddressInEnglish

                          Text:
                          ${extractedText}`,
    };
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    const jsonResponse = await response.json();

    if (!jsonResponse.choices?.[0]?.text) {
      throw new Error("Invalid response from Fireworks API");
    }

    res.status(200).json({
      content: JSON.parse(
        jsonResponse.choices[0].text.split("```")[1].replace("json", "")
      ),
    });
  } catch (error) {
    console.error("Error processing certificate:", error);
    res
      .status(500)
      .json({ error: "Failed to process birth certificate: " + error.message });
  }
};
