import mongoose from 'mongoose';

const mongoConnect = async () => {
   try {
      await mongoose.connect(
         'mongodb+srv://guest:guest1234@repositoriescluster.m2ul7.mongodb.net/repositoriesdb?retryWrites=true&w=majority'
      );
      console.log("Conexão com o MongoDB estabelecida");
   } catch (err) {
      console.log("Erro ao conectar no MongoDB", err);
   }
};

export default mongoConnect;
