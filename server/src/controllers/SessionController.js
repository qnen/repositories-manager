import User from '../models/User.js';

export default class SessionController {
   async create(request, response) {
      const { user, password } = request.body;

      if (!user || !password) {
         return response.status(422).json({ msg: 'Usuário e senha não podem ser vazios' })
      }

      const userExists = await User.findOne({
         user: `${user}`,
         password: `${password}`
      });
      
      if(userExists === null) {
         return response.status(401).json({ msg: 'Usuário ou senha inválidos' })
      }
      console.log(userExists);
      return response.json(userExists._id);
   }
}
