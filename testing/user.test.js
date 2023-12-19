const request = require("supertest");
const app = require("../routes/userroutes");

describe("User Controller", () => {
  describe("GET Data User", () => {
    it("dapat mengambil data semua user", async () => {
      try {
        const response = await request(app).get("/get");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("get berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        expect(response.body.status).toBe("failed");
        expect(response.body.message).toBe("user tidak ditemukan");
        throw error;
      }
    }, 50000);
  });

  describe("POST Register User", () => {
    it("Dapat Meregister User", async () => {
      try {
        const newUser = {
          username: "newuser",
          password: "NewPass@123",
          email: "newuser@example.com",
          name: "New User",
          address: "New Address",
          phone_number: "1234567890",
        };

        const response = await request(app)
          .post("/user/register")
          .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Registrasi berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        throw error;
      }
    }, 50000);
  });

  describe("GET Users /get/:id", () => {
    it("dapat mengambil data single user", async () => {
      try {
        const userId = 1; // Ganti dengan ID user yang benar
        const response = await request(app).get(`/user/get/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("get berhasil");
        // Anda juga dapat menambahkan asertasi lebih lanjut sesuai kebutuhan
      } catch (error) {
        expect(response.body.status).toBe("failed");
        expect(response.body.message).toBe("user tidak ditemukan");
        throw error;
      }
    }, 50000);
  });
});
