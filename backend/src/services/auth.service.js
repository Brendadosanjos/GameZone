import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import authRepository from "../repository/auth.repository.js";

function createHttpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function sanitizeUser(user) {
  const { passwordHash, salt, ...safeUser } = user;
  return safeUser;
}

function createPasswordData(password) {
  const salt = randomBytes(16).toString("hex");
  const passwordHash = scryptSync(password, salt, 64).toString("hex");
  return { salt, passwordHash };
}

function isPasswordValid(password, salt, passwordHash) {
  const providedHash = Buffer.from(
    scryptSync(password, salt, 64).toString("hex"),
    "hex",
  );
  const storedHash = Buffer.from(passwordHash, "hex");

  if (providedHash.length !== storedHash.length) {
    return false;
  }

  return timingSafeEqual(providedHash, storedHash);
}

const register = async ({ name, email, password }) => {
  const trimmedName = name?.trim();
  const normalizedEmail = email ? normalizeEmail(email) : "";

  if (!trimmedName) {
    throw createHttpError("Nome obrigatorio.", 400);
  }

  if (!normalizedEmail) {
    throw createHttpError("E-mail obrigatorio.", 400);
  }

  if (!password || password.length < 6) {
    throw createHttpError("A senha deve ter pelo menos 6 caracteres.", 400);
  }

  const existingUser = await authRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    throw createHttpError("Ja existe uma conta com esse e-mail.", 409);
  }

  const { salt, passwordHash } = createPasswordData(password);
  const user = await authRepository.create({
    id: randomUUID(),
    name: trimmedName,
    email: normalizedEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  });

  return {
    token: randomUUID(),
    user: sanitizeUser(user),
  };
};

const login = async ({ email, password }) => {
  const normalizedEmail = email ? normalizeEmail(email) : "";

  if (!normalizedEmail || !password) {
    throw createHttpError("E-mail e senha sao obrigatorios.", 400);
  }

  const user = await authRepository.findByEmail(normalizedEmail);

  if (!user || !isPasswordValid(password, user.salt, user.passwordHash)) {
    throw createHttpError("E-mail ou senha invalidos.", 401);
  }

  return {
    token: randomUUID(),
    user: sanitizeUser(user),
  };
};

export default { login, register };
