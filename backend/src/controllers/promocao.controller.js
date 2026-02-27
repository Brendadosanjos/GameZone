import promocaoService from "../services/promocao.service.js"

const listarTodos = async (req, res) => {
    try {
        const promocao = await promocaoService.listarTodos()
        res.send(promocao).status(200)
    } catch (error) {
        res.send(`Erro na listagem de Promocao ${error}`).status(500)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const promocao = await promocaoService.listaPorId(id)
        res.send(promocao).status(200)
    } catch (error) {
        res.send(`Erro ao encontrar Promocao ${error}`).status(500)
    }
}

const criarPromocao = async (req, res) => {
    try {
        const promocao = await promocaoService.criarPromocao(req.body)
        res.send("Promocao criada com sucesso!").status(200)
    } catch (error) {
        res.send(`Erro na criação de Promocao ${error}`).status(500)
    }
}

const atualizarPromocao = async (req, res) => {
    try {
        const promocao = await promocaoService.atualizarPromocao(req.params.id, req.body)
        res.send("Promocao editada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro na edição do Promocao ${error}`).status(500)

    }
}

const deletarPromocao = async (req, res) => {
    try {
        const promocao = await promocaoService.deletarPromocao(req.params.id)
        res.send("Promocao Deletada com sucesso").status(200)
    } catch (error) {
        res.send(`Erro ao deletar Promocao ${error}`).status(500)

    }

}

export default {listaPorId, listarTodos, atualizarPromocao, criarPromocao, deletarPromocao}