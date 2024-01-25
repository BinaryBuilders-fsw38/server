let self = (module.exports = {
  // untuk menampilkan product
  readProduct: async function (req, res) {
    const brand = req.params.brand;
    const getProduct = await query.select("product", { brand: brand });
    if (getProduct.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "data berhasil di select",
        data: getProduct,
      });
    }
  },

  readProductId: async function (req, res) {
    const product_id = req.params.id;
    const getProduct = await query.select("product", {
      product_id: product_id,
    });
    if (getProduct.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found", // fixing
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "data berhasil di select",
        data: getProduct,
      });
    }
  },

  readProductAll: async function (req, res) {
    const getProduct = await query.selectAll("product");
    if (getProduct.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "data berhasil di select",
        data: getProduct,
      });
    }
  },

  readBrands: async function (req, res) {
    const getBrands = await query.selectDistinct("product", "brand");
    if (getBrands.length === 0) {
      response.NOTFOUND(res, {
        status: "failed",
        message: "brands not found",
        data: [],
      });
    } else {
      response.OK(res, {
        status: "success",
        message: "brands successfully selected",
        data: getBrands,
      });
    }
  },
  // untuk menambahkan product
  uploadProduct: async function (req, res) {
    const {
      product_name,
      description,
      brand,
      price,
      stock,
      category_id,
      type_id,
    } = req.body;
    const product_file = req.file;
    const currentDate = new Date();

    const inserProduct = {
      product_name,
      product_file: product_file.path,
      description,
      brand,
      price,
      stock,
      category_id,
      type_id,
      created_at: currentDate,
      updated_at: currentDate,
    };

    if (!inserProduct) {
      response.ERROR(res, {
        status: "failed",
        message: "filed tidak boleh kosong",
        data: [],
      });
    } else {
      await query.insert("product", inserProduct);
      response.CREATED(res, {
        ststus: "success",
        message: "product berhasil di upload",
        data: inserProduct,
      });
    }
  },
  // untuk update product berdasarkan params id product
  updateProduct: async function (req, res) {
    const product_id = req.params.id;
    const { product_name, description, brand, price, stock, category_id } =
      req.body;
    const product_file = req.file;
    const currentDate = new Date();

    const getProduct = await query.select("product", {
      product_id: product_id,
    });

    if (getProduct.length > 0) {
      const inserProduct = {
        product_name,
        product_file: product_file.path,
        description,
        brand,
        price,
        stock,
        category_id,
        created_at: currentDate,
        updated_at: currentDate,
      };
      await query.update("product", inserProduct, { product_id });
      response.OK(res, {
        status: "success",
        message: "product updated",
        data: inserProduct,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product tidak ditemukan",
        data: [],
      });
    }
  },
  // untuk menghapus product beserta data keseluruhannya
  deleteProduct: async function (req, res) {
    const product_id = req.params.id;
    const getProduct = await query.select("product", {
      product_id: product_id,
    });
    if (getProduct.length > 0) {
      await query.delete("product", { product_id: product_id });
      response.OK(res, {
        status: "success",
        message: "product deleted",
        data: getProduct,
      });
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found",
        data: [],
      });
    }
  },

  suggestProduct: async function (req, res) {
    console.log(`Controller Connected`);

    // Tipe Skin
    // 1: Kulit Berminyak
    // 2: Kulit Normal
    // 3: Kulit Kering
    // 4: Kulit Kombinasi

    // Nanti Value akan diambil dari dropdown di front-end, dimana valuenya akan berupa type_id yakni (1/2/3/4)
    const skinType = parseInt(req.params.id);
    const getProduct = await query.select("product", {
      type_id: skinType,
    });

    if (getProduct.length > 0) {
      response.OK(res, {
        status: "success",
        message: "rekomendasi product",
        data: getProduct,
      });
      console.log(getProduct);
    } else {
      response.NOTFOUND(res, {
        status: "failed",
        message: "product not found",
        data: [],
      });
    }
  },
});

// belum menambahkan validasi
