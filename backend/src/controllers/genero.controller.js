import generoService from "../services/genero.service.js"

const listarTodos = async (req, res) => {
    try {
        const genero = await generoService.listarTodos()
        res.send(genero).status(200)
    } catch (error) {
        res.send(`Erro na listagem de genero ${error}`).status(500)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const genero = await generoService.listaPorId(id)
        res.send(genero).status(200)
    } catch (error) {
        res.send(`Erro ao encontrar genero ${error}`).status(500)
    }
}

const criarGenero = async (req, res) => {
    try {
        const status = await generoService.criarGenero(req.body)
        res.send("genero criada com sucesso!").status(200)
    } catch (error) {
        res.send(`Erro na criação de genero ${error}`).status(500)
    }
}

const atualizarGenero = async (req, res) => {
    try {
        const status = await generoService.atualizarGenero(req.params.id, req.body)
        res.send("genero editada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro na edição do genero ${error}`).status(500)

    }
}

const deletarGenero = async (req, res) => {
    try {
        const genero = await generoService.deletarGenero(req.params.id)
        res.send("genero Deletada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro ao deletar genero ${error}`).status(500)

    }

}

export default {listaPorId, listarTodos, atualizarGenero, criarGenero, deletarGenero}