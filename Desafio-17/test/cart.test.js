import chai from "chai";
import supertest from "supertest";

import productModel from "../src/Dao/models/products.js";
import userModel from "../src/Dao/models/user.js";
import cartModel from "../src/Dao/models/cart.js";

import { app } from "../src/app.js";
import { createHash } from "../src/utils.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Testing Cart routes", () => {
  const mockProductTest = {
    title: "Product Test ",
    description: "Remera Test test ",
    price: 1001,
    category: "remeras",
    stock: 10,
    thumbnail: "imagen de prueba",
    code: "abc1232",
    status: false,
  };

  const passwordd = "123456";
  let productTest;
  let userPremium;
  let newCart;
  let responseLogin;
  let sessionCookie;
  let cartCreatedForTest;
  before(async function () {
    this.timeout(10000);
    try {
      newCart = await cartModel.create({});

      userPremium = await userModel.create({
        email: "userTest2@userTest.com",
        first_name: "Test",
        last_nam: "SuperTest",
        password: createHash(passwordd),
        cart: newCart._id,
        role: "admin",
      });

      responseLogin = await requester
        .post("/api/session/login")
        .send({ email: userPremium.email, password: passwordd });
      sessionCookie = responseLogin.header["set-cookie"];

      productTest = await productModel.create(mockProductTest);
    } catch (error) {
      console.log(error);
    }
  });

  after(async function () {
    try {
      await userModel.findOneAndRemove({ email: userPremium.email });
      await productModel.findOneAndRemove({ code: "abc1232" });
      await cartModel.findByIdAndDelete(newCart._id);
      await cartModel.findByIdAndDelete(cartCreatedForTest._id);
      process.exit();
    } catch (error) {
      console.log(error);
    }
  });

  it("Obtener todos los carritos (adminAcces), Validar que devuelva un array con todos los carts actuales en la bd", async function () {
    try {
      const response = await requester
        .get("/api/cartsDb/allCarts")
        .set("Cookie", sessionCookie);
      expect(response.status).to.be.equal(200);
      expect(response._body.status).to.be.equal("success");
      expect(Array.isArray(response.body.payload)).to.deep.equal(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Crear un carrito en la bd", async function () {
    try {
      const response = await requester.post("/api/cartsDb");
      expect(response.status).to.be.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

  it("Obtener carrito por id y Validar que devuelva un array de productos", async function () {
    try {
      cartCreatedForTest = await requester.get(`/api/cartsDb/${newCart._id}`);
      expect(cartCreatedForTest.status).to.be.equal(200);
      expect(cartCreatedForTest._body.status).to.be.equal("success");
      expect(
        Array.isArray(cartCreatedForTest.body.payload.products)
      ).to.deep.equal(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Agregar un producto al carrito", async function () {
    try {
      const response = await requester
        .post(`/api/cartsDb/${newCart._id}/product/${productTest._id}`)
        .set("Cookie", sessionCookie);
      expect(response.status).to.be.equal(200);
      expect(response._body.status).to.be.equal("success");
    } catch (error) {
      console.log(error);
    }
  });

  it("Borrar un producto del carrito", async function () {
    try {
      const response = await requester
        .delete(`/api/cartsDb/${newCart._id}/product/${productTest._id}`)
        .set("Cookie", sessionCookie);
      expect(response.status).to.be.equal(200);
      expect(response._body.status).to.be.equal("success");
    } catch (error) {
      console.log(error);
    }
  });

  it("Borrar un carrito por completo", async function () {
    try {
      const response = await requester.delete(`/api/cartsDb/${newCart._id}`);

      expect(response.status).to.be.equal(200);
    } catch (error) {
      console.log(error);
    }
  });

});
