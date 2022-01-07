import Repository from '../models/Repository.js';
import Util from '../utils/Utils.js';

export default class RepositoryController {
   /** LIST REPOSITORIES */
   async index(request, response) {
      const repositories = await Repository.find({});

      return response.json(repositories)
   }

   /** CREATE REPOSITORY */
   async create(request, response) {
      const { url } = request.body;

      if(url === undefined || !(new Util().isGitUrl(url))) {
         return response.status(406).json({ msg: 'Informe um repositório válido.' })
      }

      const repository = new Util().getRepositoryInfo(url);
      
      const repositoryExists = await Repository.findOne({
         url: `${url}`
      })

      if(repositoryExists !== null) {
         return response.json({ msg: 'Repositório já cadastrado.' })
      } 
      const createdRepository = await Repository.create({
         author: `${repository.author}`,
         repository: `${repository.name}`,
         url: `${url}`
      });
      
      return response.json(createdRepository);
   }

   /** DELETE REPOSITORY */
   async delete(request, response) {
      const { id } = request.params

      if(id.length > 24) {
         return response.status(406).json({ msg: 'Informe um repositório válido.' })
      }

      const repositoryExists = await Repository.findOne({
         _id: `${id}`
      });

      if(repositoryExists === null) {
         return response.status(406).json({ msg: 'Esse repositório não existe.' })
      }

      await repositoryExists.remove();

      return response.status(204).send();
   }
}