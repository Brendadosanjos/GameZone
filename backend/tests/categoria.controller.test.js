import categoriaController from "../src/controllers/categoria.controller.js"
import categoriaService from "../src/services/categoria.service.js"

jest.mock("../src/services/categoria.service.js")

describe('Categoria controller test', () => {
    let req, res
    beforeEach(() => {
        req = { params: {}, body: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
    })
    //Listar categorias
    test('Deve listar todos as categorias', async () => {

        let mockCategoria = [{ id: 1, name: "Categoria 1" }]

        categoriaService.listarTodos.mockReturnThis(mockCategoria)

        await categoriaController.listarTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveReturnedTimes(1)

    })

    //Cadastrar categorias
    test('Deve cadastrar categorias', async () => {

        categoriaService.criarCategoria.mockReturnThis()

        await categoriaController.criarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Categoria criada com sucesso!")

    })

    test('Deve alterar a categoria', async () => {

        let mockCategoria = [{ id: 1, name: "categoria 1" }]

        categoriaService.atualizarCategoria.mockReturnThis(mockCategoria)

        req.params.id = "1"
        req.body = { name: "Categoria 2" }

        await categoriaController.atualizarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Categoria editada com sucesso")

    })

    test('Deve deletar uma categoria', async () => {

        categoriaService.deletarCategoria.mockReturnThis()

        req.params.id = "1"

        await categoriaController.deletarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Categoria deletada com sucesso")

    })

    //Erro na listagem de categorias
    test('Deve retornar um erro na listagem das categorias', async () => {


        let mockError = new Error("Error ao listar categorias")
        categoriaService.listarTodos.mockRejectedValue(mockError)

        await categoriaController.listarTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na listagem de categoria ${mockError}`)

    })

    //Erro na listagem de categorias
    test('Deve retornar um erro na listagem dos categorias', async () => {


        let mockError = new Error("Error ao listar categorias")
        categoriaService.listarTodos.mockRejectedValue(mockError)

        await categoriaController.listarTodos(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na listagem de categoria ${mockError}`)

    })

    //Erro na listagem de categorias
    test('Deve retornar um erro na listagem dos categorias', async () => {


        let mockError = new Error("Error ao listar categorias")
        categoriaService.criarCategoria.mockRejectedValue(mockError)

        await categoriaController.criarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na criação de categoria ${mockError}`)

    })
    //Erro na listagem de categorias
    test('Deve retornar um erro na atualização dos categorias', async () => {


        let mockError = new Error("Error ao listar categorias")
        categoriaService.atualizarCategoria.mockRejectedValue(mockError)

        await categoriaController.atualizarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro na edição do categoria ${mockError}`)

    })
    //Erro na listagem de categorias
    test('Deve retornar um erro ao deletar categorias', async () => {


        let mockError = new Error("Error ao listar categorias")
        categoriaService.deletarCategoria.mockRejectedValue(mockError)

        await categoriaController.deletarCategoria(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(`Erro ao deletar categoria ${mockError}`)

    })

})