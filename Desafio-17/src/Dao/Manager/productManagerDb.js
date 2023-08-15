// import productModel from "../models/products.js";

// export default class ProductManagerDb {
//   async getAllProducts(category, options) {
//     try {
//       const result = await productModel.paginate(
//         { category: category || { $exists: true } },
//         options
//       );
//       const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
//         result;
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   async getProductById(id) {
//     try {
//       const result = await productModel.findById(id);
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   async createProduct(product) {
//     try {
//       const result = await productModel.create(product);
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   async updateProduct(id, product) {
//     const {
//       title,
//       description,
//       stock,
//       price,
//       thumbnail,
//       code,
//       category,
//       status,
//     } = product;
//     try {
//       const result = await productModel.findByIdAndUpdate(id, {
//         title,
//         description,
//         stock,
//         price,
//         thumbnail,
//         code,
//         category,
//         status,
//       });
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   async deleteProductId(id) {
//     try {
//       const result = await productModel.findByIdAndDelete(id);
//       return result;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }
