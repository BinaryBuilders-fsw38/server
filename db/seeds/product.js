/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const currentDate = new Date();
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("product").del();
  await knex("product").insert([
    {
      product_name: "Ustraa Power Face wash-Energize & De Tan-100g",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705237404/PRODUCT/o0kjeirxdopb2uytklnf.jpg",
      price: 99000,
      stock: 865,
      description:
        "Diformulasikan menggunakan Niacinamide, Caffeine, Rice Particles, Clove Oil, Liqourice sangat efektif membersihkan kotoran, meminimalkan pori-pori, mengurangi kemerahan, dan juga membantu memperbaiki kerusakan pada kulit wajah. Produk ini bebas paraben dan SLS",
      brand: "Ustraa",
      category_id: 1,
      type_id: 1,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "Elvicto Deep Clean Face Wash",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705237672/PRODUCT/ep5gfy6j3z3x5kabdmf8.png",
      price: 87000,
      stock: 762,
      description:
        "Elvicto deep clean facewash merupakan sabun pembersih wajah yang di formulasikan khusus untuk jenis kulit normal dan berminyak untuk membersihkan wajah secara menyeluruh. Efektif membersihkan minyak berlebih, membersihkan pori2 dan mencerahkan kulit.",
      brand: "Elvicto",
      category_id: 1,
      type_id: 1,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "HAUM WASH ON 100 ml",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705306517/PRODUCT/ecptjqktvl1sorql1nur.png",
      price: 100000,
      stock: 563,
      description:
        "Pembersih wajah dengan kandungan Tranexamic Acid 1,5% yang membantu mencerahkan kulit wajah dan dengan Hyaluronic Acid until memberikan kelembapan.",
      brand: "HAUM",
      category_id: 1,
      type_id: 1,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "Elvicto Body Cream With Sunscreen",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705306654/PRODUCT/fjyqmvz8ufelwwbtgyph.jpg",
      price: 133000,
      stock: 234,
      description:
        "Elvicto Body Cream With Sunscreen merupakan 2in1 Products (Body Cream+Sunscreen SPF 30++) yang efektif untuk mencerahkan, melembapkan serta melindungi kulit tubuh dari paparan sinar matahari.",
      brand: "Elvicto",
      category_id: 2,
      type_id: 2,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "HMNS Farhampton",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705306738/PRODUCT/jrwigpntrc1w7qwa51gg.jpg",
      price: 385000,
      stock: 145,
      description:
        "Farhampton hadir dengan pure fragrance di level extrait dengan natural ingredients labdanum & lavender. Making this one of the best product you can get from HMNS.Farhampton Base Note: Amber/ Tonka / Ceddar. Amber-nya diambil dari Labdanum dari Marocco.",
      brand: "HMNS",
      category_id: 2,
      type_id: 2,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "Yagi Cocoa Coffee Scrub 160gr",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705307101/PRODUCT/ekwy17rlpibspfctyecy.jpg",
      price: 141000,
      stock: 84,
      description:
        "Ingredients: Coffea Arabica Seed Ground, Aqua, Sodium Methyl Sulfolaurate, Theobroma Cacao Seed (Cacao) Powder, Organic Cocos Nucifera (Virgin Coconut) Oil, Olea Europaea Fruit (Olive) Oil, Theobroma Cacao Seed (Cacao) Butter, Cetearyl Glucoside (and) Sorbitan Olivate, Cetearyl Alcohol, Hydroxypropyl Methyl Ethyl Cellulose, Dl-alpha-Tocopherol (Non-GMO), Sorbitan Caprylate, Capryloyl/Caproyl, Methyl Glucamide, Potassium Sorbate.",
      brand: "Yagi",
      category_id: 2,
      type_id: 2,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "SUP Hair Serum Travel Size 30 ML",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705307290/PRODUCT/cg1mmvjiuvo5vhmlfurp.png",
      price: 80000,
      stock: 24,
      description:
        "Hair Serum dengan kandungan Extract Honey dan Argan Oil yang dapat membantu rambut menjadi lebih halus, berkilau dan dapat menjaga kelembaban rambut. Dengan heat protectant yang dapat digunakan sebelum penataan rambut untuk mencegah kerusakan rambut.",
      brand: "SUP",
      category_id: 3,
      type_id: null,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "Kelaya Hair Treatment Shampoo 250ml",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705308245/PRODUCT/hei8yb7npdxvntbpuvey.jpg",
      price: 128000,
      stock: 37,
      description:
        "KELAYA – Hair Treatment Shampoo 250 ml Bahan utama : Minyak Kemiri Extract Aloe Vera",
      brand: "Kelaya",
      category_id: 3,
      type_id: null,
      created_at: currentDate,
      updated_at: currentDate,
    },
    {
      product_name: "CAVE Hair Tonic",
      product_file:
        "https://res.cloudinary.com/durputbem/image/upload/v1705308309/PRODUCT/cylnhfvslugjvxdtgagv.png",
      price: 125000,
      stock: 54,
      description:
        "CAVE Hair TonicMenutrisi rambut sehabis keramas, memperkuat akar rambut agar tidak mudah rontok, dan menjaga kelembaban rambut sehingga tidak cepat kering dan rusak.",
      brand: "CAVE",
      category_id: 3,
      type_id: null,
      created_at: currentDate,
      updated_at: currentDate,
    },
  ]);
};
