let self = (module.exports = {
  addArticle: async function (req, res) {
    const admin_id = parseInt(req.params.id);
    const { title, contain } = req.body;
    const currentDate = new Date();
    const getAdmin = await query.select("admin", { admin_id });
    const createArticle = {
      admin_id: admin_id,
      title,
      contain,
      created_at: currentDate,
      updated_at: currentDate,
    };

    if (!title || !contain) {
      response.ERROR(res, {
        status: "failed",
        message: "Artikel Gagal dibuat",
        data: [],
      });
    } else {
      await query.insert("article", createArticle);
      response.CREATED(res, {
        status: "success",
        message: "Artikel Berhasil Ditambahkan",
        data: createArticle,
      });
    }
  },

  readArticle: async function (req, res) {
    // harusnya getnya by ID
    const title = req.params.title;
    const getTitle = await query.select("article", { title: title });
    if (getTitle.length == 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "article tidak ada",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "muncul",
        data: getTitle,
      });
    }
  },

  updateArticle: async function (req, res) {
    // tambahkan validasi bila article not found
    const article_id = parseInt(req.params.id);
    const { title, contain } = req.body;
    const currentDate = new Date();
    const getArticle = await query.select("article", { article_id });

    if (!title || !contain) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Artikel Gagal dibuat, Field Tidak Boleh Kosong",
        data: [],
      });
    } else if (getArticle.length > 0) {
      const updateArticle = {
        title,
        contain,
        created_at: currentDate,
        updated_at: currentDate,
      };
      await query.update("article", updateArticle, { article_id });
      response.OK(res, {
        status: "success",
        message: "Artikel Berhasil Diperbarui",
        data: updateArticle,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Artikel Gagal Diperbarui",
        data: [],
      });
    }
  },

  deleteArticle: async function (req, res) {
    const article_id = req.params.id;
    const getArticle = await query.select("article", {
      article_id: article_id,
    });
    if (getArticle.length > 0) {
      await query.delete("article", { article_id: article_id });
      response.OK(res, {
        status: "success",
        message: "artikel berhasil dihapus",
        data: getArticle,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "artikel tidak ada",
        data: [],
      });
    }
  },
});
