import generoRepository from "../repository/genero.repository.js"

const listarTodos = async (req, res) => {
    return await generoRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await generoRepository.listaPorId(id)
}

const criarGenero = async (body) => {
    return await generoRepository.criarGenero(body)
}

const atualizarGenero = async (id, body) => {
    return await generoRepository.atualizarGenero(id, body)
}

const deletarGenero = async (id) => {
    return await generoRepository.deletarGenero(id)
}

export default {listaPorId, listarTodos, atualizarGenero, criarGenero, deletarGenero}