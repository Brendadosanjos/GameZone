import marcaService from "../services/marca.service.js"

const listarTodos = async (req, res) => {
    try {
        const marca = await marcaService.listarTodos()
        res.status(200).send(marca)
    } catch (error) {
        res.status(500).send(`Erro na listagem de marca ${error}`)
    }
}

const listarPorId = async (req, res) => {
    try {
        const marca = await marcaService.listarPorId(req.params.id)
        res.status(200).send(marca)
    } catch (error) {
        res.status(500).send(`Erro ao encontrar marca ${error}`)

    }
}

const criarMarca = async (req, res) => {
    try {
        const marca = await marcaService.criarMarca(req.body)
        res.status(200).send("Marca criada com sucesso!")
        return marca
    } catch (error) {
        res.status(500).send(`Erro na criação de marca ${error}`)
    }
}

const atualizarMarca = async (req, res) => {
    try {
        const marca = await marcaService.atualizarMarca(req.params.id, req.body)
        res.status(200).send("Marca editada com sucesso")
        return marca
    } catch (error) {
        res.status(500).send(`Erro na edição da marca ${error}`)
    }
}

const deletarMarca = async (req, res) => {
    try {
        const marca = await marcaService.deletarMarca(req.params.id)
        res.status(200).send("Marca deletada com sucesso")
        return marca
    } catch (error) {
        res.status(500).send(`Erro ao deletar marca ${error}`)
    }
}

export default { listarPorId, listarTodos, atualizarMarca, criarMarca, deletarMarca }