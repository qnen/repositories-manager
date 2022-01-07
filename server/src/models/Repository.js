import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
   author: {
      type: String,
      require: true
   },
   repository: {
      type: String,
      require: true
   },
   url: {
      type: String,
      require: true
   },
}, {
   versionKey: false
});

const Repository = mongoose.model('Repository', repositorySchema);

export default Repository;