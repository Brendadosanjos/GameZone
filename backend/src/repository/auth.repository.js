import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(currentDir, "../../data");
const usersFilePath = path.join(dataDir, "auth-users.json");

async function ensureUsersFile() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(usersFilePath);
  } catch {
    await fs.writeFile(usersFilePath, "[]\n", "utf-8");
  }
}

async function readUsers() {
  await ensureUsersFile();

  const content = await fs.readFile(usersFilePath, "utf-8");
  return JSON.parse(content || "[]");
}

async function writeUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(usersFilePath, `${JSON.stringify(users, null, 2)}\n`, "utf-8");
}

const findByEmail = async (email) => {
  const users = await readUsers();
  return users.find((user) => user.email === email) ?? null;
};

const create = async (user) => {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
};

export default { create, findByEmail };
