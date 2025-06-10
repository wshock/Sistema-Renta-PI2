import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/auth.controller.js";

// Mock de las dependencias
vi.mock("../db.js", () => ({
  default: {
    query: vi.fn()
  }
}));

vi.mock("../libs/jwt.js", () => ({
  createAccessToken: vi.fn()
}));

vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

// Importar los mocks después de mockearlos
import pool from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

describe("Controladores de Autenticación - Backend", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReq = {
      body: {},
      cookies: {},
      user: {}
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("controlador de registro", () => {
    it("debería registrar un nuevo usuario exitosamente", async () => {
      mockReq.body = {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "password123"
      };

      const hashedPassword = "hashedPassword123";
      const mockUser = {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        password: hashedPassword
      };
      const mockToken = "jwt-token-123";

      vi.mocked(bcrypt.hash).mockResolvedValue(hashedPassword);
      vi.mocked(pool.query).mockResolvedValue({ rows: [mockUser] });
      vi.mocked(createAccessToken).mockResolvedValue(mockToken);

      await register(mockReq, mockRes);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        ["Juan Pérez", "juan@example.com", hashedPassword]
      );
      expect(createAccessToken).toHaveBeenCalledWith({ id: 1 });
      expect(mockRes.cookie).toHaveBeenCalledWith("token", mockToken);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com"
      });
    });

    it("debería manejar error de email duplicado (409 Conflicto)", async () => {
      mockReq.body = {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "password123"
      };

      const duplicateError = new Error("Duplicate email");
      duplicateError.code = "23505";

      vi.mocked(bcrypt.hash).mockResolvedValue("hashedPassword");
      vi.mocked(pool.query).mockRejectedValue(duplicateError);

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith([
        "Este email ya está en uso, prueba con otro."
      ]);
    });

    it("debería manejar errores generales del servidor (500)", async () => {
      mockReq.body = {
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "password123"
      };

      const generalError = new Error("Database connection failed");

      vi.mocked(bcrypt.hash).mockResolvedValue("hashedPassword");
      vi.mocked(pool.query).mockRejectedValue(generalError);

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Database connection failed"
      });
    });
  });

  describe("controlador de login", () => {
    it("debería hacer login exitosamente con credenciales correctas", async () => {
      mockReq.body = {
        email: "juan@example.com",
        password: "password123"
      };

      const mockUser = {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedPassword123"
      };
      const mockToken = "jwt-token-123";

      vi.mocked(pool.query).mockResolvedValue({ rows: [mockUser] });
      vi.mocked(bcrypt.compare).mockResolvedValue(true);
      vi.mocked(createAccessToken).mockResolvedValue(mockToken);

      await login(mockReq, mockRes);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["juan@example.com"]
      );
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
      expect(createAccessToken).toHaveBeenCalledWith({ id: 1 });
      expect(mockRes.cookie).toHaveBeenCalledWith("token", mockToken);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com"
      });
    });

    it("debería retornar 404 para email inexistente", async () => {
      mockReq.body = {
        email: "noexiste@example.com",
        password: "password123"
      };

      vi.mocked(pool.query).mockResolvedValue({ rows: [] });

      await login(mockReq, mockRes);

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["noexiste@example.com"]
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(["Email o contraseña incorrectos"]);
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("debería retornar 400 para contraseña incorrecta", async () => {
      mockReq.body = {
        email: "juan@example.com",
        password: "wrongpassword"
      };

      const mockUser = {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        password: "hashedPassword123"
      };

      vi.mocked(pool.query).mockResolvedValue({ rows: [mockUser] });
      vi.mocked(bcrypt.compare).mockResolvedValue(false);

      await login(mockReq, mockRes);

      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedPassword123");
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(["Email o contraseña incorrectos"]);
      expect(createAccessToken).not.toHaveBeenCalled();
      expect(mockRes.cookie).not.toHaveBeenCalled();
    });

    it("debería manejar errores de base de datos durante login (500)", async () => {
      mockReq.body = {
        email: "juan@example.com",
        password: "password123"
      };

      const dbError = new Error("Database connection failed");
      vi.mocked(pool.query).mockRejectedValue(dbError);

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Database connection failed"
      });
    });
  });
});


describe("Auth Controller Extra Tests", () => {
  const mockRequest = (body = {}) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.cookie = vi.fn();
    return res;
  };

  it("debe devolver 409 si el email ya existe", async () => {
    pool.query.mockRejectedValue({ code: "23505" });

    const req = mockRequest({
      name: "Matias",
      email: "matias@example.com",
      password: "123456"
    });
    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith([
      "Este email ya está en uso, prueba con otro."
    ]);
  });

  it("debe devolver 400 si la contraseña es incorrecta", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: "Matias",
          email: "matias@example.com",
          password: "hashedPassword"
        }
      ]
    });

    vi.mocked(bcrypt.compare).mockResolvedValue(false);

    const req = mockRequest({
      email: "matias@example.com",
      password: "wrongPassword"
    });
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith([
      "Email o contraseña incorrectos"
    ]);
  });
});
