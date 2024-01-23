const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "kode rahasia";
const jwtExpired = "1d";

let self = (module.exports = {
  // untuk select semua user yg ada di tabel
  getUserAll: async function (req, res) {
    const getDataUser = await query.selectAll("user");
    if (getDataUser.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "user tidak ditemukan",
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "get berhasil",
        data: getDataUser,
      });
    }
  },
  // untuk select user berdasarkan id
  getSingleUser: async function (req, res) {
    const user_id = req.params.id;
    const getUser = await query.select("user", { user_id: user_id });
    if (getUser.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "user tidak ditemukan",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "get berhasil",
        data: getUser,
      });
    }
  },
  // untuk register mengambil data dri client dan dimasukan ke database lewat req.body
  userRegister: async function (req, res) {
    const currentDate = new Date();
    const { username, password, email, name, address, phone_number } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const getUser = await query.select("user", { username: username });
    const getUserEmail = await query.select("user", { email: email });
    // regexpassword untuk menghandle password wajib mengunakan simbol, angka, huruf besar & kecil, dan tanpa sepasi
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s]{8,}$/;

    if (
      !username ||
      !password ||
      !email ||
      !name ||
      !address ||
      !phone_number
    ) {
      response.ERROR(res, {
        status: "Gagal",
        message: "Ada field yang belum diisi",
        data: [],
      });
    } else if (getUser.length > 0 || getUserEmail.length > 0) {
      response.ERROR(res, {
        status: "failed",
        message: "Username atau email sudah terdaftar",
        data: [],
      });
    } else if (!passwordRegex.test(password)) {
      response.ERROR(res, {
        status: "failed",
        message:
          "Password harus terdiri dari setidaknya 8 karakter, setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu simbol (@$!%*?&)",
        data: [],
      });
    } else {
      const userData = {
        username,
        password: encryptedPassword,
        email,
        name,
        address,
        phone_number: `+62${phone_number}`,
        created_at: currentDate,
        updated_at: currentDate,
      };
      const inputData = await query.insertUser("user", userData);
      const user_id = inputData[0];
      const getUserInsert = await query.select("user", user_id);
      response.CREATED(res, {
        status: "success",
        message: "Registrasi berhasil",
        data: getUserInsert,
      });
    }
  },

  userLogin: async function (req, res) {
    const { username, password } = req.body;

    const getUser = await query.select("user", { username });
    console.log(getUser);
    if (!username || !password) {
      response.ERROR(res, {
        status: "Gagal",
        message: "Ada field yang belum diisi",
        data: [],
      });
    } else if (getUser.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        password,
        getUser[0].password
      );
      if (!isPasswordValid) {
        response.ERROR(res, {
          status: "failed",
          message: "password / username tidak sesuia",
          data: getUser,
        });
      } else {
        const token = jwt.sign(
          {
            id: getUser[0].user_id,
          },
          jwtSecret,
          {
            expiresIn: jwtExpired,
          }
        );

        res
          .status(200)
          .cookie("authorization", token, {
            httpOnly: true,
            secure: true,
          })
          .json({
            message: "success",
            data: { token, getUser },
          });
      }
    }
  },
  //  userUpdate untuk updating data profile user
  userUpdate: async function (req, res) {
    const user_id = req.params.id;
    const { name, address, phone_number } = req.body;

    const currentDate = new Date();
    console.log(name, "namaa");
    // validasi max char password dan username
    // validasi password requirement hurup kecil besar, simbol, spasi,
    // +62 added default
    const getUser = await query.select("user", { user_id: user_id });

    if (!name || !address || !phone_number) {
      response.ERROR(res, {
        status: "Gagal",
        message: "Ada field yang belum diisi",
        data: [],
      });
    } else if (getUser.length > 0) {
      const insertUser = {
        user_id: user_id,
        name,
        address,
        phone_number: `+62${phone_number}`,
        updated_at: currentDate,
      };

      await query.update("user", insertUser, { user_id });
      response.OK(res, {
        status: "success",
        message: "Update berhasil",
        data: insertUser,
      });
    } else {
      response.NOTFOUND(res, {
        status: "Failed",
        message: "Email tidak ditemukan",
        data: [],
      });
    }
  },
  // userUpdateAuth untuk updating user vlidation accoount
  userUpdateAuth: async function (req, res) {
    const user_id = req.params.id;
    const { email, username, new_password, old_password } = req.body;
    const getUser = await query.select("user", {
      user_id: user_id,
      email: email,
      password: old_password,
    });
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s]{8,}$/;
    if (!username || !new_password || !old_password || !email) {
      response.ERROR(res, {
        status: "Gagal",
        message: "Ada field yang belum diisi",
        data: [],
      });
    } else if (!passwordRegex.test(new_password)) {
      response.ERROR(res, {
        status: "failed",
        message:
          "Password harus terdiri dari setidaknya 8 karakter, setidaknya satu huruf kecil, satu huruf besar, satu angka, dan satu simbol (@$!%*?&)",
        data: [],
      });
    } else if (getUser.length > 0) {
      const insertData = { user_id: user_id, username, password: new_password };
      await query.update("user", insertData, { user_id });
      response.OK(res, {
        status: "success",
        message: "Update berhasil",
        data: insertData,
      });
    } else {
      response.NOTFOUND(res, {
        status: "Failed",
        message: "Email tidak ditemukan atau passwod lama salah",
        data: [],
      });
    }
  },
  // userDelete untuk menghapus account beserta data keseluruhan user ==>DONE
  // tambahkan delete user on cascade ke beberapa tabel
  userDelete: async function (req, res) {
    const user_id = req.params.id;
    const { username, password } = req.body;
    const criteria = { user_id, username, password };
    const getUser = await query.select("user", criteria);

    if (getUser.length > 0) {
      await query.delete("user", criteria);
      response.OK(res, {
        status: "success",
        message: "data berhasil dihapus",
        data: [],
      });
    } else {
      response.NOTFOUND(res, {
        status: "Failed",
        message: "data tidak ditemukan",
        data: [],
      });
    }
  },
});
