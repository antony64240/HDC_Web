const projectManager = require('../services/projectManager');
const manageToken = require('../middleware/manageToken');


addTodo = async (req, res) => {
    const { todo } = req.body;
    const { email } = manageToken.getData(req.headers.token);
    try {
        const result = await projectManager.addTodo(email , req.headers.id , todo )
        res.status(201).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

updateTodo = async (req, res) => {
    const { todo } = req.body;
    const { id } = req.headers;
    try {
        const result = await projectManager.updateTodo(todo, id);
        res.status(201).json(result)
    }catch (err) {
        res.status(401).json(err)
    }
}

deletTodo = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await projectManager.deletTodo(id);
        res.status(201).json(result)
    }catch (err) {
        res.status(401).json(err)
    }
}


module.exports = {
    addTodo,
    updateTodo,
    deletTodo
}

