import authService from "../services/auth.service.js";

function sendError(res, error) {
  res.status(error.status || 500).json({
    message: error.message || "Erro interno do servidor.",
  });
}

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    sendError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    sendError(res, error);
  }
};

export default { login, register };
