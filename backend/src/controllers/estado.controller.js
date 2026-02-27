import estadoService from "../services/estado.service.js"

const listarTodos = async (req, res) => {
    try {
        const estado = await estadoService.listarTodos()
        res.send(estado).status(200)
    } catch (error) {
        res.send(`Erro na listagem de estado ${error}`).status(500)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const estado = await estadoService.listaPorId(id)
        res.send(estado).status(200)
    } catch (error) {
        res.send(`Erro ao encontrar estado ${error}`).status(500)
    }
}

const criarEstado = async (req, res) => {
    try {
        const estado = await estadoService.criarEstado(req.body)
        res.send("estado criado com sucesso!").status(200)
    } catch (error) {
        res.send(`Erro na criação de estado ${error}`).status(500)
    }
}

const atualizarEstado = async (req, res) => {
    try {
        const estado = await estadoService.atualizarEstado(req.params.id, req.body)
        res.send("estado editado com sucesso").status(200)
    } catch (error) {
        res.send(`Erro na edição do estado ${error}`).status(500)

    }
}

const deletarEstado = async (req, res) => {
    try {
        const estado = await estadoService.deletarEstado(req.params.id)
        res.send("estado Deletado com sucesso").status(200)
    } catch (error) {
        res.send(`Erro ao deletar estado ${error}`).status(500)

    }

}

export default {listaPorId, listarTodos, atualizarEstado, criarEstado, deletarEstado}