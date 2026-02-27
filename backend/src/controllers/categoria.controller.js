import categoriaService from "../services/categoria.service.js"

const listarTodos = async (req, res) => {
    try {
        const categoria = await categoriaService.listarTodos()
        res.status(200).send(categoria)
    } catch (error) {
        res.status(500).send(`Erro na listagem de categoria ${error}`)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const categoria = await categoriaService.listaPorId(id)
        res.status(200).send(categoria)
    } catch (error) {
        res.status(500).send(`Erro ao encontrar categoria ${error}`)
    }
}

const criarCategoria = async (req, res) => {
    try {
        const categoria = await categoriaService.criarCategoria(req.body)
        res.status(200).send("Categoria criada com sucesso!")
    } catch (error) {
        res.status(500).send(`Erro na criação de categoria ${error}`)
    }
}

const atualizarCategoria = async (req, res) => {
    try {
        const categoria = await categoriaService.atualizarCategoria(req.params.id, req.body)
        res.status(200).send("Categoria editada com sucesso")
    } catch (error) {
        res.status(500).send(`Erro na edição do categoria ${error}`)

    }
}

const deletarCategoria = async (req, res) => {
    try {
        const categoria = await categoriaService.deletarCategoria(req.params.id)
        res.status(200).send("Categoria deletada com sucesso")
    } catch (error) {
        res.status(500).send(`Erro ao deletar categoria ${error}`)

    }

}

export default {listaPorId, listarTodos, atualizarCategoria, criarCategoria, deletarCategoria}