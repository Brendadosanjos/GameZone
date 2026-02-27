import marcaRepository from "../repository/marca.repository.js"

const listarTodos = async (req, res) => {
    return await marcaRepository.listarTodos()
}

const listarPorId = async (id) => {
    return await marcaRepository.listarPorId(id)
}

const criarMarca = async (body) => {
    return await marcaRepository.criarMarca(body)
}

const atualizarMarca = async (id, body) => {
    return await marcaRepository.atualizarMarca(id, body)
}

const deletarMarca = async (id) => {
    return await marcaRepository.deletarMarca(id)
}

export default {listarPorId, listarTodos, atualizarMarca, criarMarca, deletarMarca}