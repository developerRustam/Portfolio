import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const profileUrl = new URL("../src/shared/config/profile/profile.json", import.meta.url);

async function loadProfile() {
  return JSON.parse(await readFile(profileUrl, "utf8"));
}

test("publishes the current professional contact links", async () => {
  const profile = await loadProfile();

  assert.deepEqual(profile.contacts, {
    github: "https://github.com/developerRustam",
    telegram: "https://t.me/rustam_develop",
    linkedin: "https://www.linkedin.com/in/rustam-ganiev-286885167/",
    email: "ganiev.rystam@gmail.com",
  });
});

test("lists current portfolio projects without retired URLs", async () => {
  const profile = await loadProfile();
  const urls = profile.projects.flatMap(({ repository, live }) =>
    [repository, live].filter(Boolean),
  );

  assert.deepEqual(profile.projects.map(({ id }) => id), [
    "seo-track",
    "rick-and-morty",
    "calculate",
  ]);
  assert.ok(urls.every((url) => url.startsWith("https://")));
  assert.ok(urls.every((url) => !url.includes("ganievrystam.github.io")));
});

test("publishes the approved skills without subjective ratings", async () => {
  const profile = await loadProfile();

  assert.deepEqual(profile.skills, {
    frontend: ["React", "TypeScript", "JavaScript", "Redux Toolkit", "RTK Query"],
    quality: [
      "Jest",
      "React Testing Library",
      "Vitest",
      "GitLab CI/CD",
      "GitHub Actions",
    ],
    engineering: [
      "REST API",
      "Responsive UI",
      "Performance",
      "Code review",
      "Mentoring",
    ],
  });
  assert.equal(JSON.stringify(profile.skills).includes("%"), false);
  assert.equal(JSON.stringify(profile.skills).includes("PHP"), false);
});

test("contains the approved employment history", async () => {
  const profile = await loadProfile();

  assert.deepEqual(
    profile.experience.map(({ company, period }) => ({ company, period })),
    [
      {
        company: "Климатические Технологии",
        period: { ru: "Июль 2024 — настоящее время", en: "July 2024 — Present" },
      },
      {
        company: "Exalter Digital",
        period: { ru: "Февраль 2022 — июнь 2024", en: "February 2022 — June 2024" },
      },
    ],
  );
  assert.deepEqual(
    profile.experience.map(({ role }) => role),
    [
      {
        ru: "Frontend-разработчик · React / TypeScript / JavaScript",
        en: "Frontend Developer · React / TypeScript / JavaScript",
      },
      { ru: "Frontend-разработчик", en: "Frontend Developer" },
    ],
  );

  const [climate, exalter] = profile.experience;
  assert.equal(climate.responsibilities.ru.length, 7);
  assert.equal(climate.responsibilities.en.length, 7);
  assert.equal(exalter.responsibilities.ru.length, 5);
  assert.equal(exalter.responsibilities.en.length, 5);

  const approvedRussianText = profile.experience
    .flatMap(({ responsibilities }) => responsibilities.ru)
    .join(" ");
  assert.match(approvedRussianText, /25–30 пунктов/);
  assert.match(approvedRussianText, /15–25%/);
  assert.match(approvedRussianText, /10\+ коммерческих веб-проектов/);
  assert.match(approvedRussianText, /7–8 часов в месяц/);
  assert.match(approvedRussianText, /примерно на 30%/);
  assert.match(approvedRussianText, /100\+ проблем/);
});
