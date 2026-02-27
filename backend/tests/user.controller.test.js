import userController from "../src/controllers/user.controler.js"
import userService from "../src/services/user.service.js"

jest.mock("../src/services/user.service.js")

describe('User controller test', () => {
    let req, res
    beforeEach(() => {
        req = { params: {}, body: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })
    //Listar usuarios
    test('Deve listar todos os usuários', async () => {

        let mockUser = [{ id: 1, name: "Usuário 1" }]

        userService.listarTodos.mockReturnThis(mockUser)

        await userController.listarTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveReturnedTimes(1)

    })

    //Cadastrar usuarios
    test('Deve cadastrar usuarios', async () => {
        
        userService.criarUsuario.mockReturnThis()

        await userController.criarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Usuário criado com sucesso!")

    })

    test('Deve alterar o usuário', async () => {

        let mockUser = [{ id: 1, name: "Usuário 1" }]

        userService.atualizarUsuario.mockReturnThis(mockUser)

        req.params.id = "1"
        req.body = { name: "Usuário 2" }

        await userController.atualizarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Usuário editado com sucesso")

    })

    test('Deve deletar um usuário', async () => {

        userService.deletarUsuario.mockReturnThis()

        req.params.id = "1"

        await userController.deletarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Usuário Deletado com sucesso")

    })

    //Erro na listagem de produtos
    test('Deve retornar um erro na listagem dos usuários', async () => {

        let mockError = new Error("Error ao listar usuários")
        userService.listarTodos.mockRejectedValue(mockError)

        await userController.listarTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na listagem de usuários ${mockError}`)

    })

    //Erro na listagem de produtos
    test('Deve retornar um erro na listagem dos usuário', async () => {


        let mockError = new Error("Error ao listar usuário")
        userService.listaPorId.mockRejectedValue(mockError)

        await userController.listaPorId(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro ao encontrar usuário ${mockError}`)

    })

    //Erro na criação de usuários
    test('Deve retornar um erro na criação de usuários', async () => {


        let mockError = new Error("Error ao criar usuários")
        userService.criarUsuario.mockRejectedValue(mockError)

        await userController.criarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na criação de usuarios ${mockError}`)

    })
    //Erro na atualização de usuários
    test('Deve retornar um erro na atualização de usuários', async () => {


        let mockError = new Error("Error ao atualizar usuários")
        userService.atualizarUsuario.mockRejectedValue(mockError)

        await userController.atualizarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na edição do usuarios ${mockError}`)

    })
    //Erro ao deletar usuários
    test('Deve retornar um erro ao deletar usuários', async () => {


        let mockError = new Error("Error ao deletar usuários")
        userService.deletarUsuario.mockRejectedValue(mockError)

        await userController.deletarUsuario(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na deletado do usuarios ${mockError}`)

    })

})