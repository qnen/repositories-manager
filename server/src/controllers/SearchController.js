import Repository from "../models/Repository.js";

export default class SearchController {
   async index(request, response) {
      const { repoName } = request.body;

      const repositories = await Repository.find({
         "repository": new RegExp(".*"+repoName+".*", "i")
      });

      console.log(repositories);
      console.log(repoName);

      return response.status(200).json(repositories);
   }
}