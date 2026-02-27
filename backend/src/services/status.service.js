import statusRepository from "../repository/status.repository.js"

const listarTodos = async (req, res) => {
    return await statusRepository.listarTodos()
}

const listaPorId = async (id) => {
    
    return await statusRepository.listaPorId(id)
}

const criarStatus = async (body) => {
    return await statusRepository.criarStatus(body)
}

const atualizarStatus = async (id, body) => {
    return await statusRepository.atualizarStatus(id, body)
}

const deletarStatus = async (id) => {
    return await statusRepository.deletarStatus(id)
}

export default {listaPorId, listarTodos, atualizarStatus, criarStatus, deletarStatus}