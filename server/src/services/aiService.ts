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
    "PostgreSQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "REST API",
    "Next.js",
    "Redux",
    "Testing",
    "Python",
    "Java",
    "C++",
    "AWS",
    "Docker",
    "Azure",
    "CI/CD",
    "MERN",
    "GraphQL"
  ];

  const lower = text.toLowerCase();

  return commonSkills.filter((skill) =>
    lower.includes(skill.toLowerCase())
  );
}

function extractUrl(text: string): string {
  const match = text.match(/https?:\/\/[^\s)]+/i);
  return match?.[0] ?? "";
}

function extractSalaryRange(text: string): string {
  const patterns = [
    /₹\s?[\d,]+(?:\s?-\s?|\s?to\s?)₹?\s?[\d,]+(?:\s?(?:LPA|CTC|per year|annum))?/i,
    /\b\d+(?:\.\d+)?\s?(?:LPA|lakhs?|Lacs?)\s?(?:-\s?|\s?to\s?)\d+(?:\.\d+)?\s?(?:LPA|lakhs?|Lacs?)\b/i,
    /\$\s?\d[\d,]*(?:\s?-\s?|\s?to\s?)\$\s?\d[\d,]*/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0].trim();
  }

  return "";
}

function extractLocation(text: string): string {
  const cities = [
    "Bengaluru",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Remote",
    "Hybrid",
    "Onsite"
  ];

  for (const city of cities) {
    const regex = new RegExp(`\\b${city}\\b`, "i");
    if (regex.test(text)) {
      return city;
    }
  }

  const locationMatch = text.match(
    /location\s*[:\-]\s*([^\n.]+)/i
  );

  return locationMatch?.[1]?.trim() ?? "";
}

function extractSeniority(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes("intern")) return "Intern";
  if (lower.includes("junior")) return "Junior";
  if (lower.includes("entry level")) return "Entry Level";
  if (lower.includes("associate")) return "Associate";
  if (lower.includes("fresher")) return "Fresher";
  if (lower.includes("senior")) return "Senior";
  if (lower.includes("mid-level") || lower.includes("mid level")) return "Mid-Level";

  const expMatch = text.match(/(\d+\s?[-–]\s?\d+\s+years?|\d+\+?\s+years?)/i);
  if (expMatch) return expMatch[0];

  return "";
}

function extractCompanyAndRole(text: string): { company: string; role: string } {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let company = "";
  let role = "";

  for (const line of lines) {
    if (!company && /company\s*:/i.test(line)) {
      company = line.split(":")[1]?.trim() ?? "";
    }

    if (!role && /(role|position|job title)\s*:/i.test(line)) {
      role = line.split(":")[1]?.trim() ?? "";
    }
  }

  if (!company) {
    const companyMatch = text.match(/([A-Z][A-Za-z0-9&.\- ]+?)\s+(?:is hiring|is looking|is currently hiring)/);
    company = companyMatch?.[1]?.trim() ?? "";
  }

  if (!role) {
    const roleMatch = text.match(
      /(Full Stack Developer|Frontend Developer|Backend Developer|Software Engineer|Junior Full Stack Developer|Full Stack Engineer|React Developer|MERN Stack Developer)/i
    );
    role = roleMatch?.[1]?.trim() ?? "";
  }

  return {
    company,
    role
  };
}

function buildShortNotes(
  company: string,
  role: string,
  location: string,
  salaryRange: string,
  skills: string[]
): string {
  const parts: string[] = [];

  if (company && role) {
    parts.push(`${company} is hiring for ${role}.`);
  } else if (role) {
    parts.push(`Hiring for ${role}.`);
  }

  if (location) {
    parts.push(`Location: ${location}.`);
  }

  if (salaryRange) {
    parts.push(`Salary: ${salaryRange}.`);
  }

  if (skills.length) {
    parts.push(`Main skills: ${skills.slice(0, 6).join(", ")}.`);
  }

  return parts.join(" ");
}

function localParseJobDescription(jdText: string): ParsedJobData {
  const { company, role } = extractCompanyAndRole(jdText);
  const requiredSkills = extractSkillsFromText(jdText);
  const niceToHaveSkills = requiredSkills.slice(0, 3);
  const seniority = extractSeniority(jdText);
  const location = extractLocation(jdText);
  const salaryRange = extractSalaryRange(jdText);
  const jdLink = extractUrl(jdText);
  const notes = buildShortNotes(company, role, location, salaryRange, requiredSkills);

  const resumeSuggestions = [
    `Built responsive and user-friendly interfaces aligned with ${role || "the job"} requirements using modern frontend technologies.`,
    `Developed scalable backend APIs and integrated them with frontend applications for reliable end-to-end functionality.`,
    `Worked with tools and technologies such as ${requiredSkills.slice(0, 5).join(", ") || "modern web technologies"} in real-world project development.`,
    `Collaborated on feature development, debugging, and performance improvements to deliver maintainable software solutions.`,
    `Applied clean coding practices, problem-solving, and version control workflows to build high-quality applications.`
  ];

  return {
    company,
    role,
    requiredSkills,
    niceToHaveSkills,
    seniority,
    location,
    salaryRange,
    jdLink,
    notes,
    resumeSuggestions
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
  "salaryRange": "string",
  "jdLink": "string",
  "notes": "string",
  "resumeSuggestions": ["string", "string", "string"]
}

Rules:
- Extract exact salary range if present.
- Extract location even if city name is mentioned in paragraph form.
- Extract jdLink if any URL is present.
- Generate a short professional notes summary in 1-2 lines.
- Generate 3 to 5 resumeSuggestions.
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
        content: prompt
      }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
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
    salaryRange: parsed.salaryRange || "",
    jdLink: parsed.jdLink || "",
    notes: parsed.notes || "",
    resumeSuggestions: Array.isArray(parsed.resumeSuggestions)
      ? parsed.resumeSuggestions
      : []
  };
}