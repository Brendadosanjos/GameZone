import categoriaRepository from "../repository/categoria.repository.js"

const listarTodos = async (req, res) => {
    return await categoriaRepository.listarTodos()
}

const listaPorId = async (id) => {
    return await categoriaRepository.listaPorId(id)
}

const criarCategoria = async (body) => {
    return await categoriaRepository.criarCategoria(body)
}

const atualizarCategoria = async (id, body) => {
    return await categoriaRepository.atualizarCategoria(id, body)
}

const deletarCategoria = async (id) => {
    return await categoriaRepository.deletarCategoria(id)
}

export default {listaPorId, listarTodos, atualizarCategoria, criarCategoria, deletarCategoria}