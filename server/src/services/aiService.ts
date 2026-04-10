import OpenAI from "openai";
import { env } from "../config/env";
import type { ParsedJobData } from "../types";

const openai = env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
  : null;

function extractSkillsFromText(text: string): string[] {
  const commonSkills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "SQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Git",
    "REST API",
    "Next.js",
    "Redux",
    "Testing",
    "Python",
    "Java",
    "C++",
    "AWS",
    "Docker",
  ];

  const lower = text.toLowerCase();

  return commonSkills.filter((skill) =>
    lower.includes(skill.toLowerCase())
  );
}

function localParseJobDescription(jdText: string): ParsedJobData {
  const lines = jdText.split("\n").map((line) => line.trim()).filter(Boolean);
  const fullText = jdText.toLowerCase();

  let company = "Unknown Company";
  let role = "Unknown Role";
  let seniority = "";
  let location = "";

  for (const line of lines) {
    if (line.toLowerCase().includes("company")) {
      company = line.split(":")[1]?.trim() || company;
    }

    if (
      line.toLowerCase().includes("role") ||
      line.toLowerCase().includes("position") ||
      line.toLowerCase().includes("job title")
    ) {
      role = line.split(":")[1]?.trim() || role;
    }
  }

  if (fullText.includes("intern")) seniority = "Intern";
  else if (fullText.includes("junior")) seniority = "Junior";
  else if (fullText.includes("senior")) seniority = "Senior";
  else if (fullText.includes("mid")) seniority = "Mid";

  if (fullText.includes("remote")) location = "Remote";
  else if (fullText.includes("hybrid")) location = "Hybrid";
  else if (fullText.includes("onsite")) location = "Onsite";

  const requiredSkills = extractSkillsFromText(jdText);
  const niceToHaveSkills = requiredSkills.slice(0, 3);

  const resumeSuggestions = [
    `Built responsive and user-focused interfaces aligned with ${role} requirements using modern frontend practices.`,
    `Worked on scalable features, reusable components, and API integrations relevant to ${company} workflows.`,
    `Applied problem-solving, debugging, and clean code principles to deliver reliable project outcomes.`,
    `Collaborated on full stack development tasks with focus on performance, usability, and maintainability.`,
    `Used tools and technologies such as ${requiredSkills.slice(0, 4).join(", ") || "modern web stack"} in practical projects.`,
  ];

  return {
    company,
    role,
    requiredSkills,
    niceToHaveSkills,
    seniority,
    location,
    resumeSuggestions,
  };
}

export async function parseJobDescriptionWithAI(
  jdText: string
): Promise<ParsedJobData> {
  if (!env.USE_OPENAI || !openai) {
    return localParseJobDescription(jdText);
  }

  const prompt = `
You are an assistant that extracts structured information from a job description.

Return ONLY valid JSON with this exact shape:
{
  "company": "string",
  "role": "string",
  "requiredSkills": ["string"],
  "niceToHaveSkills": ["string"],
  "seniority": "string",
  "location": "string",
  "resumeSuggestions": ["string", "string", "string"]
}

Rules:
- Keep requiredSkills and niceToHaveSkills concise.
- Generate 3 to 5 resumeSuggestions.
- Suggestions must be role-specific and strong resume bullet points.
- Do not add markdown.
- If any field is missing, return empty string or empty array.

Job Description:
${jdText}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(raw) as ParsedJobData;

  return {
    company: parsed.company || "",
    role: parsed.role || "",
    requiredSkills: Array.isArray(parsed.requiredSkills) ? parsed.requiredSkills : [],
    niceToHaveSkills: Array.isArray(parsed.niceToHaveSkills) ? parsed.niceToHaveSkills : [],
    seniority: parsed.seniority || "",
    location: parsed.location || "",
    resumeSuggestions: Array.isArray(parsed.resumeSuggestions)
      ? parsed.resumeSuggestions
      : [],
  };
}