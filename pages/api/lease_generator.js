import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { state, landlordName, tenantName, propertyAddress, rentAmount, leaseStart, leaseEnd } = req.body;

  if (!state || !landlordName || !tenantName || !propertyAddress || !rentAmount || !leaseStart || !leaseEnd) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
  Generate a basic residential lease agreement for the state of ${state}.
  Include the following details:

  - Landlord: ${landlordName}
  - Tenant: ${tenantName}
  - Property Address: ${propertyAddress}
  - Rent Amount: $${rentAmount} per month
  - Lease Term: ${leaseStart} to ${leaseEnd}

  Be sure to use appropriate legal formatting and clauses for residential leases in ${state}.
  `;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a legal assistant helping to draft lease agreements." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const leaseText = completion.data.choices[0].message.content;
    res.status(200).json({ lease: leaseText });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate lease." });
  }
}
