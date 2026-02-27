import cupomRepository from "../repository/cupom.repository.js"

const listarTodos = async (req, res) => {
    return await cupomRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await cupomRepository.listaPorId(id)
}

const criarCupom = async (body) => {
    return await cupomRepository.criarCupom(body)
}

const atualizarCupom = async (id, body) => {
    return await cupomRepository.atualizarCupom(id, body)
}

const deletarCupom = async (id) => {
    return await cupomRepository.deletarCupom(id)
}

export default {listaPorId, listarTodos, atualizarCupom, criarCupom, deletarCupom}