const request = require("supertest");
const app = require("../routes/userroutes");

describe("User Controller", () => {
  describe("GET Data User", () => {
    it("Dapat Meregister User", async () => {
      try {
        const response = await request(app)
          .post("/user/register")
          .set("Accept", "application/json")
          .set("Content-Type", "multipart/form-data")
          .set("connection", "keep-alive")
          .send("username", "newuser")
          .send("password", "NewPass")
          .send("email", "newuser@example.com")
          .send("name", "newuser")
          .send("address", "New Address")
          .send("phone_number", "1234567890");

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Registrasi berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        throw error;
      }
    }, 16000);

    it("dapat mengambil data semua user", async () => {
      try {
        const response = await request(app)
          .get("/get")
          .set("Accept", "application/json")
          .set("Content-Type", "multipart/form-data")
          .set("connection", "keep-alive");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("get berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        expect(response.body.status).toBe("failed");
        expect(response.body.message).toBe("user tidak ditemukan");
        throw error;
      }
    }, 11000);

    it("dapat mengambil data single user", async () => {
      try {
        const userId = 1; // Ganti dengan ID user yang benar
        const response = await request(app)
          .get(`/user/get/${userId}`)
          .set("Accept", "application/json")
          .set("Content-Type", "multipart/form-data")
          .set("connection", "keep-alive");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("get berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        expect(response.body.status).toBe("failed");
        expect(response.body.message).toBe("user tidak ditemukan");
        throw error;
      }
    }, 16000);
  });
});
