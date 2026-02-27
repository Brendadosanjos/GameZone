import userRepository from "../repository/user.repository.js"

const listarTodos = async (req, res) => {
    return await userRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await userRepository.listaPorId(id)
}

const criarUsuario = async (body) => {
    return await userRepository.criarUsuario(body)
}

const atualizarUsuario = async (id, body) => {
    return await userRepository.atualizarUsuario(id, body)
}

const deletarUsuario = async (id) => {
    return await userRepository.deletarUsuario(id)
}

export default {listaPorId, listarTodos, atualizarUsuario, criarUsuario, deletarUsuario}