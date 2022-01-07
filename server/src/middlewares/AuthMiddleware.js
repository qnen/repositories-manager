import User from "../models/User.js";

export default class AuthMiddleware {
   async auth(request, response, next) {
      
      console.log(request.headers);
      if(request.headers.authorization === undefined) {
         return response.status(401).json({ msg: 'Autenticação inválida. Faça login e tente novamente.' })
      }
      const userId = request.headers.authorization;

      if (!userId || userId === null || userId.length !== 24) {
         return response.status(401).json({ msg: 'Autenticação inválida. Faça login e tente novamente.' })
      }

      const userExists = await User.findOne({
         _id: `${userId}`
      });

      if(userExists === null) {
         return response.status(401).json({ msg: 'Autenticação inválida. Faça login e tente novamente.' })
      }

      next();
   }
}