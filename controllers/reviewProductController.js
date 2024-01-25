let self = (module.exports = {
  addReview: async function (req, res) {
    const product_id = parseInt(req.params.id);
    const { user_id, comment, score } = req.body;
    const currentDate = new Date();
    const createReview = {
      product_id: product_id,
      user_id,
      comment,
      score,
      created_at: currentDate,
      updated_at: currentDate,
    };

    // validasinya diperbaiki
    if (!user_id || !comment || !score || score > 5) {
      response.ERROR(res, {
        status: "failed",
        message: "Review Gagal diinput",
        data: [],
      });
    } else {
      await query.insert("review", createReview);
      response.CREATED(res, {
        status: "success",
        message: "Review Berhasil Ditambahkan",
        data: createReview,
      });
    }
  },

  readReview: async function (req, res) {
    const product_id = req.params.id;
    const getReview = await query.join(
      ["review", "product", "user"],
      [
        ["review.product_id", "product.product_id"],
        ["review.user_id", "user.user_id"],
      ],
      { "product.product_id": product_id }
    );
    if (getReview.length == 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Review tidak ada",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "muncul",
        data: getReview,
      });
    }
  },

  averageScore: async function (req, res) {
    const product_id = req.params.id;
    const getReviews = await query.select("review", {
      product_id: product_id,
    });
    if (getReviews.length == 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Tidak ada review untuk produk ini",
        data: [],
      });
    } else {
      let sum = 0;
      let count = 0;
      for (let i = 0; i < getReviews.length; i++) {
        if (getReviews[i].score) {
          sum += getReviews[i].score;
          count++;
        }
      }
      const average = sum / count;
      response.OK(res, {
        status: "success",
        message: "Rata-rata skor telah dihitung",
        data: average,
      });
    }
  },

  updateReview: async function (req, res) {
    // tambahkan validasi user ID yang update harus sama dengan yang buat
    // bisa ditambahkan di params
    const review_id = parseInt(req.params.id);
    const { comment, score } = req.body;
    const currentDate = new Date();
    const getReview = await query.select("review", { review_id });

    if (!comment || !score) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Review Gagal diinput, Field Tidak Boleh Kosong",
        data: [],
      });
    } else if (getReview.length > 0) {
      const updateReview = {
        comment,
        score,
        updated_at: currentDate,
      };
      await query.update("review", updateReview, { review_id });
      response.OK(res, {
        status: "success",
        message: "Review Berhasil Diperbarui",
        data: updateReview,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Artikel Gagal Diperbarui",
        data: [],
      });
    }
  },
  deleteReview: async function (req, res) {
    const review_id = req.params.id;
    const getReview = await query.select("review", { review_id: review_id });
    if (getReview.length > 0) {
      await query.delete("review", { review_id: review_id });
      response.OK(res, {
        status: "success",
        message: "review berhasil dihapus",
        data: getReview,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "review tidak ada",
        data: [],
      });
    }
  },
});
