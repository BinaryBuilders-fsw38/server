let self = (module.exports = {
  adminLogin: async function (req, res) {
    const { username, password } = req.body;
    const getAdmin = await query.select("admin", { username });
    if (!username || !password) {
      response.ERROR(res, {
        status: "Gagal",
        message: "Ada field yang belum diisi",
        data: [],
      });
    } else if (getAdmin.length > 0) {
      if (getAdmin[0].password === password) {
        response.OK(res, {
          status: "Success",
          message: "Login berhasil",
        });
      } else {
        response.NOTFOUND(res, {
          status: "Failed",
          message: "Password tidak sesuai",
          data: [],
        });
      }
    } else {
      response.ERROR(res, {
        status: "Failed",
        message: "Login gagal",
        data: [],
      });
    }
  },

  adminDelete: async function (req, res) {
    const admin_id = req.params.id;
    const { username, password } = req.body;
    const criteria = { admin_id, username, password };
    const getAdmin = await query.select("admin", criteria);

    if (getAdmin.length > 0) {
      await query.delete("admin", criteria);
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
