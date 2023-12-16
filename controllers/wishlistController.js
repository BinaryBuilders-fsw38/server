let self = (module.exports = {
  addWishlist: async function (req, res) {
    const user_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    const created_at = new Date();
    const updated_at = new Date();
    const getUser = await query.select("user", { user_id });
    const getProduct = await query.select("wishlist", {
      product_id,
    });
    const data = {
      user_id: user_id,
      product_id: product_id,
      created_at: created_at,
      updated_at: updated_at,
    };

    if (getProduct.length > 0 ) {
      response.ERROR(res, {
        status: "failed",
        message: "wishlist barang yang sama sudah ada",
        data: [],
      });
     
      } else{
        await query.insert("wishlist", data);
        response.CREATED(res, {
          status: "success",
          message: "Wishlist Berhasil Ditambahkan",
          data: data,
          });
    } 
  },

  deleteWishlist: async function (req, res) {
    const wishlist_id = parseInt(req.params.id);
    const getWishlistData = await query.select("wishlist", {
      wishlist_id: wishlist_id,
    });

    if (getWishlistData.length > 0) {
      await query.delete("wishlist", { wishlist_id: wishlist_id });
      response.OK(res, {
        status: "success",
        message: "Wishlist Berhasil dihapus",
        data: getWishlistData,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "Wishlist Tidak ada",
        data: [],
      });
    }
  },
});
