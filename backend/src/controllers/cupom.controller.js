import cupomService from "../services/cupom.service.js"

const listarTodos = async (req, res) => {
    try {
        const cupom = await cupomService.listarTodos()
        res.send(cupom).status(200)
    } catch (error) {
        res.send(`Erro na listagem de cupom ${error}`).status(500)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const cupom = await cupomService.listaPorId(id)
        res.send(cupom).status(200)
    } catch (error) {
        res.send(`Erro ao encontrar cupom ${error}`).status(500)
    }
}

const criarCupom = async (req, res) => {
    try {
        const cupom = await cupomService.criarCupom(req.body)
        res.send("cupom criado com sucesso!").status(200)
    } catch (error) {
        res.send(`Erro na criação de cupom ${error}`).status(500)
    }
}

const atualizarCupom = async (req, res) => {
    try {
        const cupom = await cupomService.atualizarCupom(req.params.id, req.body)
        res.send("cupom editado com sucesso").status(200)
    } catch (error) {
        res.send(`Erro na edição do cupom ${error}`).status(500)

    }
}

const deletarCupom = async (req, res) => {
    try {
        const cupom = await cupomService.deletarCupom(req.params.id)
        res.send("cupom Deletado com sucesso").status(200)
    } catch (error) {
        res.send(`Erro ao deletar cupom ${error}`).status(500)

    }

}

export default {listaPorId, listarTodos, atualizarCupom, criarCupom, deletarCupom}