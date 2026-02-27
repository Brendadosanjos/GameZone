
import promocaoRepository from "../repository/promocao.repository.js"

const listarTodos = async (req, res) => {
    return await promocaoRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await promocaoRepository.listaPorId(id)
}

const criarPromocao = async (body) => {
    return await promocaoRepository.criarPromocao(body)
}

const atualizarPromocao = async (id, body) => {
    return await promocaoRepository.atualizarPromocao(id, body)
}

const deletarPromocao = async (id) => {
    return await promocaoRepository.deletarPromocao(id)
}

export default {listaPorId, listarTodos, atualizarPromocao, criarPromocao, deletarPromocao}