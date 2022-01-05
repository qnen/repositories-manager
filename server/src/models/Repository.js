import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
   author: String,
   repository: String,
   url: String
}, {
   versionKey: false
});

const Repository = mongoose.model('Repository', repositorySchema);

export default Repository;