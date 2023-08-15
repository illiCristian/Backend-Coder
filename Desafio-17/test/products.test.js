/* eslint-disable no-undef */
import chai from "chai";
import supertest from "supertest";

import productModel from "../src/Dao/models/products.js";
import userModel from "../src/Dao/models/user.js";
import cartModel from "../src/Dao/models/cart.js";

import { app } from "../src/app.js";
import { createHash } from "../src/utils.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Testing Products routes", () => {
  const productTest = {
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
  let userPremium;
  let newCart;
  let responseLogin;
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
        role: "premium",
      });

      responseLogin = await requester
        .post("/api/session/login")
        .send({ email: userPremium.email, password: passwordd });
     
    } catch (error) {
      console.log(error);
    }
    
  });

  after(async function () {
    try {
      await userModel.findOneAndRemove({ email: userPremium.email });
      await productModel.findOneAndRemove({ code: "abc1232" });
      await cartModel.findByIdAndDelete(newCart._id);
    } catch (error) {
      console.log(error);
    }
    
  }); 

  it("Testing prueba get products", async function () {
    const sessionCookie = responseLogin.header["set-cookie"];
    try {
      const response = await requester.get("/api/productsDatabase/products").set("Cookie", sessionCookie);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty("status");
      expect(Array.isArray(response.body.payload)).to.deep.equal(true);
    } catch (error) {
      console.log(error);
    }
  });

  it("Testing crear productos en la bd", async function () {
    const sessionCookie = responseLogin.header["set-cookie"];
    try {
      const response = await requester
        .post("/api/productsDatabase")
        .set("Cookie", sessionCookie)
        .send(productTest);
      expect(response.status).to.be.equal(200);
    } catch (error) {
      console.log(error);
    
    }
  }); 
});

//Usuario de prueba
/*
  
  
  before(async () => {
    

    

    userPremium = newUser._id;
    try {
      await requester.post("/api/session/login").send({
        email: userPremium.email,
        password: userPremium.password,
      });

      await productModel.create(productTest);

      

    } catch (error) {
      console.log(error);
    }
  }); */

/* describe("Test Super", () => {
  //Generamos un describe por cada modulo que vamos a testear
  describe("Test de modulo productos", () => {
    beforeEach(async () => {
      await productModel.deleteMany({});
    });
    it("Endpoint de creacion de productos", async () => {
      const productMock = {
        title: "Producto1",
        description: "Remera lisa",
        price: 100,
        category: "remeras",
        stock: 10,
        thumbnail: "asd",
        code: "123",
        status: true,
      };
      const result = await requester
        .post("/api/productsDatabase")
        .send(productMock);
      const { statusCode, _body } = result;

      expect(statusCode).to.be.equal(200);
      expect(_body.status).to.be.equal("succes");
    });
    it("", async () => {});
    it("", async () => {});
    it("", async () => {});
    it("", async () => {});
    it("", async () => {});
  });
});
 */
