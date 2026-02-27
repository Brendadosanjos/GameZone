import userService from "../services/user.service.js"

const listarTodos = async (req, res) => {
    try {
        const users = await userService.listarTodos()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(`Erro na listagem de usuários ${error}`)
    }
}

const listaPorId = async (req, res) => {
    try {
        const id = req.params.id
        const users = await userService.listaPorId(id)
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(`Erro ao encontrar usuário ${error}`)
    }
}

const criarUsuario = async (req, res) => {
    try {
        const usuario = await userService.criarUsuario(req.body)
        res.status(200).send("Usuário criado com sucesso!")
    } catch (error) {
        res.status(500).send(`Erro na criação de usuarios ${error}`)
    }
}

const atualizarUsuario = async (req, res) => {
    try {
        const users = await userService.atualizarUsuario(req.params.id, req.body)
        res.status(200).send("Usuário editado com sucesso")
    } catch (error) {
        res.status(500).send(`Erro na edição do usuarios ${error}`)

    }
}

const deletarUsuario = async (req, res) => {
    try {
        const users = await userService.deletarUsuario(req.params.id)
        res.status(200).send("Usuário Deletado com sucesso")
    } catch (error) {
        res.status(500).send(`Erro na deletado do usuarios ${error}`)

    }

}

export default {listaPorId, listarTodos, atualizarUsuario, criarUsuario, deletarUsuario}