import OpenAI from "openai";
import dotenv from "dotenv";
import pdftopic from "pdftopic";
import tesseract from "tesseract.js";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const convertPdfToImage = async (pdfBase64) => {
    try {
        const pdfBuffer = Buffer.from(pdfBase64, 'base64');
        const imagesBuffer = await pdftopic.pdftobuffer(pdfBuffer, 0);
        return imagesBuffer[0]; 
    } catch (error) {
        throw new Error("Error converting PDF to image: " + error.message);
    }
};

const extractTextFromImage = async (base64Image) => {
    try {
        const { data } = await tesseract.recognize(Buffer.from(base64Image, "base64"), "eng+ben");
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

        const imageBase64 = type.includes('image') ? fileBase64 : await convertPdfToImage(fileBase64);

        const extractedText =  await extractTextFromImage(imageBase64)

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Extract all birth certificate information from the following text (Ensure that names and addresses are properly formatted must be title case  and any date is month number and divider is '/' like 02/04/2002 (only date of birth er format dd-mm-yyyy) , date of birth in word like Twenty Seventh of January Two Thousand Five) name, father name, mothers name and place of birth are must be title case and return as JSON with these fields: registerOfficeAddress, upazilaOrCity, birthRegistrationNumber, leftBarcode, dateOfRegistration, dateOfIssuance, dateOfBirth, gender, dateOfBirthInWords, nameInBangla, nameInEnglish, fatherNameInBangla, fatherNameInEnglish, motherNameInBangla, motherNameInEnglish, placeOfBirthInBangla, placeOfBirthInEnglish, permanentAddressInBangla, permanentAddressInEnglish. Text: ${extractedText}`
                }
            ],
            max_tokens: 4000
        });

        if (!response.choices?.[0]?.message?.content) {
            throw new Error("Invalid response from OpenAI");
        }

        res.status(200).json({ content: JSON.parse(response.choices[0].message.content.split('```')[1].replace('json', '')) });

    } catch (error) {
        console.error("Error processing certificate:", error);
        res.status(500).json({ error: "Failed to process birth certificate: " + error.message });
    }
};
