import { describe, it, expect, beforeEach, vi } from "vitest";
import { post, getUserPosts } from "../controllers/post.controller.js";

const mockRequest = (body = {}, file = null, params = {}) => ({
  body,
  file,
  params,
});

const mockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

vi.mock("../db.js", () => ({
  default: {
    query: vi.fn(),
  },
}));

import pool from "../db.js";

describe("Post Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe devolver 400 si el precio del post es inválido", async () => {
    const req = mockRequest({
      user_id: "1",
      title: "Test Post",
      description: "Descripción",
      price: "-100", // precio inválido
      rental_duration: "5",
      rental_unit: "días",
      status: "activo",
      type_post: "alquiler",
    });

    const res = mockResponse();
    await post(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Datos inválidos para el post" });
  });

  it("debe devolver 400 si el ID del usuario es inválido", async () => {
    const req = mockRequest({}, null, { id: "abc" }); // id inválido

    const res = mockResponse();
    await getUserPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "ID de usuario inválido" });
  });

  it("debe devolver 500 si ocurre un error inesperado en getUserPosts", async () => {
    pool.query.mockRejectedValue(new Error("DB error"));

    const req = mockRequest({}, null, { id: "1" });
    const res = mockResponse();

    await getUserPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error interno del servidor",
      error: new Error("DB error"),
    });
  });
});
