import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const profilePath = path.join(root, "src/shared/config/profile/profile.json");

test("every project media asset is deployable under the Portfolio base path", async () => {
  const profile = JSON.parse(await readFile(profilePath, "utf8"));
  const mediaPaths = profile.projects.flatMap((project) =>
    Object.values(project.media ?? {}).flatMap(({ desktop, mobile }) =>
      [desktop, mobile].filter(Boolean),
    ),
  );

  assert.ok(mediaPaths.length > 0);
  assert.ok(mediaPaths.every((mediaPath) => !mediaPath.startsWith("/")));
  assert.ok(mediaPaths.every((mediaPath) => mediaPath.endsWith(".webp")));

  for (const mediaPath of mediaPaths) {
    const assetPath = path.join(root, "public", mediaPath);
    await access(assetPath);
    assert.ok((await stat(assetPath)).size > 0);
  }
});
