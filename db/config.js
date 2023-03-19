import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
      await mongoose.connect(process.env.DB_CNN);
      console.log('Base de datos online')
  } catch (e) {
      console.log(e);
      throw new Error('Error al iniciar la base de datos');
  }
}

