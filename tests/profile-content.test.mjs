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
    "artificium",
    "seo-track",
    "calculate",
  ]);
  assert.ok(urls.every((url) => url.startsWith("https://")));
  assert.ok(urls.every((url) => !url.includes("ganievrystam.github.io")));
});

test("publishes Artificium as an honest bilingual UI prototype", async () => {
  const profile = await loadProfile();
  const project = profile.projects.find(({ id }) => id === "artificium");

  assert.deepEqual(project, {
    id: "artificium",
    name: "Artificium",
    category: "UI prototype",
    description: {
      ru: "Адаптивный TypeScript-прототип рабочего пространства для командной работы с интерфейсами входа, управления проектами и чата.",
      en: "A responsive TypeScript collaboration workspace UI prototype with sign-in, project-management, and chat interfaces.",
    },
    stack: ["TypeScript", "SCSS", "Webpack"],
    repository: "https://github.com/developerRustam/artificium",
    live: "https://developerrustam.github.io/artificium/#chat",
    media: {
      chat: {
        desktop: "assets/projects/artificium/chat-desktop.webp",
        mobile: "assets/projects/artificium/chat-mobile.webp",
        alt: {
          ru: "Интерфейс командного чата Artificium",
          en: "Artificium collaboration chat interface",
        },
      },
      auth: {
        desktop: "assets/projects/artificium/auth-desktop.webp",
        alt: {
          ru: "Экран входа Artificium",
          en: "Artificium sign-in screen",
        },
      },
    },
  });
  assert.doesNotMatch(JSON.stringify(project), /AI-powered|AI service|ИИ-сервис/i);
});

test("publishes the restored Calculate project with its live URL", async () => {
  const profile = await loadProfile();
  const project = profile.projects.find(({ id }) => id === "calculate");

  assert.deepEqual(project, {
    id: "calculate",
    name: "Password Craft",
    category: "Frontend",
    description: {
      ru: "Адаптивный генератор паролей на React и TypeScript с Web Crypto API и поддержкой русского и английского языков.",
      en: "A responsive React and TypeScript password generator using the Web Crypto API with Russian and English localization.",
    },
    stack: ["React", "TypeScript", "Web Crypto", "i18next"],
    repository: "https://github.com/developerRustam/Calculate",
    live: "https://developerrustam.github.io/Calculate/",
  });
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
