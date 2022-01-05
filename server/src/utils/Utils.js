
export default class Util {
   getRepositoryInfo(url) {
      
      let regValidatePathName = /.+?:\/\/.+?(\/.+?)(?:#|\?|$)/;
      let pathName = regValidatePathName.exec(url)[1];
   
      let regRemoveSlashes = pathName.replace(/(^\/+|\/+$)/mg, '');
   
      let repositoryInfo = regRemoveSlashes.split('/');
   
      return {
         author: repositoryInfo[0],
         name: repositoryInfo[1]
      }
   }
   
   isGitUrl(url) {
      var regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(\github)(\.com)(.*?)(\/?|\#[-\d\w._]+?)$/;
      return regex.test(url);
    }
   
}
