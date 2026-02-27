import statusService from "../services/status.service.js"

const listarTodos = async (req, res) => {
    try {
        const status = await statusService.listarTodos()
        res.send(status).status(200)
    } catch (error) {
        res.send(`Erro na listagem de status ${error}`).status(500)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const status = await statusService.listaPorId(id)
        res.send(status).status(200)
    } catch (error) {
        res.send(`Erro ao encontrar status ${error}`).status(500)
    }
}

const criarStatus = async (req, res) => {
    try {
        const status = await statusService.criarStatus(req.body)
        res.send("status criada com sucesso!").status(200)
    } catch (error) {
        res.send(`Erro na criação de status ${error}`).status(500)
    }
}

const atualizarStatus = async (req, res) => {
    try {
        const status = await statusService.atualizarStatus(req.params.id, req.body)
        res.send("status editada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro na edição do status ${error}`).status(500)

    }
}

const deletarStatus = async (req, res) => {
    try {
        const status = await statusService.deletarStatus(req.params.id)
        res.send("status Deletada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro ao deletar status ${error}`).status(500)

    }

}

export default {listaPorId, listarTodos, atualizarStatus, criarStatus, deletarStatus}