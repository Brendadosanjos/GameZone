import estadoRepository from "../repository/estado.repository.js"

const listarTodos = async (req, res) => {
    return await estadoRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await estadoRepository.listaPorId(id)
}

const criarEstado = async (body) => {
    return await estadoRepository.criarEstado(body)
}

const atualizarEstado = async (id, body) => {
    return await estadoRepository.atualizarEstado(id, body)
}

const deletarEstado = async (id) => {
    return await estadoRepository.deletarEstado(id)
}

export default {listaPorId, listarTodos, atualizarEstado, criarEstado, deletarEstado}