const products = [
  {
    title: "Pantalón de mezclilla",
    description: "Pantalón cómodo y resistente de mezclilla.",
    price: 28.99,
    code: "P001",
    category: "pantalones",
    status: true,
    stock: 10,
    thumbnail:
      "https://img.freepik.com/foto-gratis/pantalones_1203-8092.jpg?size=626&ext=jpg&ga=GA1.2.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera de algodón",
    description: "Remera de algodón suave y cómoda.",
    price: 12.99,
    code: "P002",
    category: "remeras",

    status: true,
    stock: 20,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/943/997/products/boy-beige1-2e3a2fe4fc6ce264d016676887628942-1024-1024.webp",
  },
  {
    title: "Zapatillas deportivas",
    description: "Zapatillas cómodas y duraderas para hacer deporte.",
    price: 65.99,
    code: "P003",
    category: "zapatos",
    status: true,
    stock: 5,
    thumbnail:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/a3b3c26ba11f450a9f91ae9b00f43cb9_9366/Zapatillas_Galaxy_6_Negro_GW3847_01_standard.jpg",
  },
  {
    title: "Camisa de vestir",
    description: "Camisa de vestir elegante para ocasiones especiales.",
    price: 42.99,
    code: "P004",
    category: "camisas",
    status: true,
    stock: 8,
    thumbnail: "https://m.media-amazon.com/images/I/71Jo+KiDkXL._AC_UL400_.jpg",
  },
  {
    title: "Jeans ajustados",
    description: "Jeans ajustados y modernos para cualquier ocasión.",
    price: 34.99,
    code: "P005",
    category: "pantalones",
    status: true,
    stock: 15,
    thumbnail:
      "https://img.freepik.com/foto-gratis/pantalones_1203-8308.jpg?size=626&ext=jpg&ga=GA1.2.833696058.1677364273&semt=sph",
  },
  {
    title: "Sweater de lana",
    description: "Sweater de lana suave y cálido para los días fríos.",
    price: 24.99,
    code: "P006",
    category: "remeras",
    status: true,
    stock: 12,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/943/997/products/boy-marron1-17a822d3e01ce50ccc16676887357891-1024-1024.webp",
  },
  {
    title: "Botas de cuero",
    description: "Botas de cuero resistentes para cualquier clima.",
    price: 89.99,
    code: "P007",
    category: "zapatos",
    status: true,
    stock: 3,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_733657-MLA31063284630_062019-O.jpg",
  },
  {
    title: "Camisa casual",
    description: "Camisa casual y cómoda para cualquier ocasión.",
    price: 19.99,
    code: "P008",
    category: "camisas",
    status: true,
    stock: 18,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_723685-MLA54491820712_032023-W.jpg",
  },
  {
    title: "Pantalón chino",
    description: "Pantalón chino de tela suave y fresca.",
    price: 32.99,
    code: "P009",
    category: "pantalones",
    status: true,
    stock: 7,
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Museo_del_Bicentenario_-_Zapatos_de_N%C3%A9stor_Kirchner.jpg",
  },
  {
    title: "Remera sin mangas",
    description: "Remera sin mangas fresca y cómoda para el verano.",
    price: 9.99,
    code: "P010",
    category: "remeras",

    status: true,
    stock: 25,
    thumbnail:
      "https://piet.com.ar/wp-content/uploads/piet-remera-negra-cuadrado-blanco-01.jpg",
  },
  {
    title: "Zapatillas urbanas",
    description: "Zapatillas urbanas modernas y cómodas.",
    price: 59.99,
    code: "P011",
    category: "zapatos",

    status: true,
    stock: 6,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_930244-MLA47759735422_102021-O.webp",
  },
  {
    title: "Camisa de denim",
    description: "Camisa de denim resistente y moderna.",
    price: 37.99,
    code: "P012",
    category: "camisas",

    status: true,
    stock: 9,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_778262-MLM42467091474_072020-O.jpg",
  },
  {
    title: "Pantalón de vestir",
    description: "Pantalón de vestir elegante y cómodo.",
    price: 49.99,
    code: "P013",
    category: "pantalones",
    status: true,
    stock: 11,
    thumbnail:
      "https://img.freepik.com/foto-gratis/pantalones_1203-8093.jpg?size=626&ext=jpg&ga=GA1.1.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera estampada",
    description: "Remera estampada con diseño moderno y original.",
    price: 14.99,
    code: "P014",
    category: "remeras",

    status: true,
    stock: 22,
    thumbnail:
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/205/102/products/remera-lisa-fr-rj-11-ef4b6ca4b08c3f434315906905869409-640-0.jpg",
  },
  {
    title: "Zapatillas de running",
    description: "Zapatillas de running cómodas y duraderas.",
    price: 79.99,
    code: "P015",
    category: "zapatos",

    status: true,
    stock: 4,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_633150-MLA44008761414_112020-V.jpg",
  },
  {
    title: "Camisa de lino",
    description: "Camisa de lino fresca y ligera para el verano.",
    price: 29.99,
    code: "P016",
    category: "camisas",

    status: true,
    stock: 14,
    thumbnail:
      "https://i.pinimg.com/550x/96/2f/df/962fdf243d4a02152d5ed2690c9d331d.jpg",
  },
  {
    title: "Pantalón cargo",
    description: "Pantalón cargo resistente y práctico.",
    price: 45.99,
    code: "P017",
    category: "pantalones",
    status: true,
    stock: 8,
    thumbnail:
      "https://img.freepik.com/fotos-premium/blue-jeans-basicos-cinturon-cuero-aislado-sobre-blanco_624181-5858.jpg?size=626&ext=jpg&ga=GA1.1.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera de manga larga",
    description: "Remera de manga larga suave y cómoda.",
    price: 17.99,
    code: "P018",
    category: "remeras",

    status: true,
    stock: 18,
    thumbnail:
      "https://tienda.guantexindustrial.com.ar/712-large_default/remera-algodon-jersey-blanco-talle-l.jpg",
  },
  {
    title: "Zapatillas de cuero",
    description: "Zapatillas de cuero elegantes y cómodas.",
    price: 69.99,
    code: "P019",
    category: "zapatos",

    status: true,
    stock: 5,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_934245-MLA53836118983_022023-V.jpg",
  },
  {
    title: "Camisa a cuadros",
    description: "Camisa a cuadros de estilo leñador.",
    price: 33.99,
    code: "P020",
    category: "camisas",

    status: true,
    stock: 10,
    thumbnail:
      "https://i.pinimg.com/originals/39/7c/ef/397cef39cc5f5ac1c6ab0210632d6cd2.jpg",
  },
  {
    title: "Pantalón chino",
    description: "Pantalón chino clásico y versátil.",
    price: 39.99,
    code: "P021",
    category: "pantalones",
    status: true,
    stock: 13,
    thumbnail:
      "https://img.freepik.com/fotos-premium/turista-masculino-que-lleva-pantalones-cargo-que-colocan-parque_38810-2208.jpg?size=626&ext=jpg&ga=GA1.2.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera de algodón",
    description: "Remera de algodón suave y cómoda.",
    price: 12.99,
    code: "P022",
    category: "remeras",

    status: true,
    stock: 30,
    thumbnail:
      "https://tiendaboutique.com.ar/wp-content/uploads/Remera-Black-Gris-oscuro-1.jpg",
  },
  {
    title: "Botas de cuero",
    description: "Botas de cuero resistentes y duraderas.",
    price: 99.99,
    code: "P023",
    category: "zapatos",

    status: true,
    stock: 3,
    thumbnail:
      "https://www.clarin.com/img/2022/11/13/los-zapatos-de-cuero-son___fjxGqJcfc_2000x1500__1.jpg",
  },
  {
    title: "Camisa de lana",
    description: "Camisa de lana abrigada y cómoda.",
    price: 47.99,
    code: "P024",
    category: "camisas",

    status: true,
    stock: 8,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNNONonL6wwWnibsPEoAzNbp1gIVduwKyfXjCX66WLTJRptPSVypz3-APnW__YMQaBTw&usqp=CAU",
  },
  {
    title: "Pantalón cargo corto",
    description: "Pantalón cargo corto resistente y práctico.",
    price: 29.99,
    code: "P025",
    category: "pantalones",
    status: true,
    stock: 15,
    thumbnail:
      "https://img.freepik.com/foto-gratis/pantalones-percha-fondo-verde_23-2150264166.jpg?size=626&ext=jpg&ga=GA1.1.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera estampada de manga larga",
    description: "Remera estampada de manga larga con diseño moderno.",
    price: 19.99,
    code: "P026",
    category: "remeras",

    status: true,
    stock: 20,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/966/536/products/1024x1024-21-b321421924a8680bc316440191914454-1024-1024.webp",
  },
  {
    title: "Zapatillas deportivas",
    description: "Zapatillas deportivas cómodas y resistentes.",
    price: 84.99,
    code: "P027",
    category: "zapatos",

    status: true,
    stock: 7,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_929339-MLA42214885837_062020-O.webp",
  },
  {
    title: "Camisa de franela",
    description: "Camisa de franela abrigada y cómoda.",
    price: 45.99,
    code: "P028",
    category: "camisas",

    status: true,
    stock: 11,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_802895-MLA52376498110_112022-W.jpg",
  },
  {
    title: "Pantalón jogger",
    description: "Pantalón jogger de estilo urbano y cómodo.",
    price: 49.99,
    code: "P029",
    category: "pantalones",
    status: true,
    stock: 17,
    thumbnail:
      "https://img.freepik.com/fotos-premium/turista-masculino-parque-concepto-turismo-viajes-pantalones-carga_38810-2970.jpg?size=626&ext=jpg&ga=GA1.2.833696058.1677364273&semt=sph  ",
  },
  {
    title: "Remera básica de algodón",
    description: "Remera básica de algodón suave y cómoda.",
    price: 9.99,
    code: "P030",
    category: "remeras",

    status: true,
    stock: 40,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0517/6282/3347/products/HXIM09525081_b1d0ae06-9907-42b5-bd65-d54eb3850524_800x.jpg?v=1672319457",
  },
  {
    title: "Zapatillas de running",
    description: "Zapatillas de running con buena amortiguación.",
    price: 89.99,
    code: "P031",
    category: "zapatos",

    status: true,
    stock: 6,
    thumbnail:
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/294/867/products/jujuy-negro-619-21-f0d96791036322bf8116026320850043-1024-1024.jpg",
  },
  {
    title: "Camisa de cuadros",
    description: "Camisa de cuadros con diseño clásico.",
    price: 34.99,
    code: "P032",
    category: "camisas",

    status: true,
    stock: 9,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_778262-MLM42467091474_072020-O.jpg",
  },
  {
    title: "Pantalón de lino",
    description: "Pantalón de lino fresco y cómodo.",
    price: 59.99,
    code: "P033",
    category: "pantalones",
    status: true,
    stock: 12,
    thumbnail:
      "https://img.freepik.com/fotos-premium/turista-masculino-parque-concepto-turismo-viajes-pantalones-carga_38810-4072.jpg?size=626&ext=jpg&ga=GA1.1.833696058.1677364273&semt=sph",
  },
  {
    title: "Remera estampada de manga corta",
    description: "Remera estampada de manga corta con diseño moderno.",
    price: 14.99,
    code: "P034",
    category: "remeras",

    status: true,
    stock: 25,
    thumbnail:
      "https://d2r9epyceweg5n.cloudfront.net/stores/001/205/102/products/remera-lisa-am-rj-111-3374707c83b41fb15515911954612335-1024-1024.jpg",
  },
  {
    title: "Botas de montaña",
    description: "Botas de montaña resistentes y cómodas.",
    price: 119.99,
    code: "P035",
    category: "zapatos",

    status: true,
    stock: 4,
    thumbnail:
      "https://media.gq.com.mx/photos/5ff8edcd9274cd36fe356805/master/w_2000,h_3000,c_limit/Zapatos%20Oxford.jpg",
  },
  {
    title: "Camisa de denim",
    description: "Camisa de denim resistente y duradera.",
    price: 39.99,
    code: "P036",
    category: "camisas",

    status: true,
    stock: 7,
    thumbnail: "https://example.com/denim-shirt.jpg",
  },
  {
    title: "Pantalón cargo",
    description: "Pantalón cargo resistente y con muchos bolsillos.",
    price: 54.99,
    code: "P037",
    category: "pantalones",
    status: true,
    stock: 15,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_796757-MLM45826297711_052021-O.webp",
  },
  {
    title: "Remera con estampado de bandas de rock",
    description: "Remera con estampado de bandas de rock clásicas.",
    price: 19.99,
    code: "P038",
    category: "remeras",

    status: true,
    stock: 20,
    thumbnail:
      "https://woker.vtexassets.com/arquivos/ids/267457-800-800?v=637828842607970000&width=800&height=800&aspect=true",
  },
  {
    title: "Zapatillas de skate",
    description: "Zapatillas de skate resistentes y con buen agarre.",
    price: 69.99,
    code: "P039",
    category: "zapatos",

    status: true,
    stock: 8,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/1177/6306/files/brogue_negros_ventana_2048x.jpg?v=1678383416",
  },
  {
    title: "Camisa de algodón",
    description: "Camisa de algodón suave y cómoda.",
    price: 29.99,
    code: "P040",
    category: "camisas",

    status: true,
    stock: 10,
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/I/61DHYW4RBhL._AC_UL330_SR330,330_.jpg",
  },
  {
    title: "Pantalón chino",
    description: "Pantalón chino clásico y elegante.",
    price: 49.99,
    code: "P041",
    category: "pantalones",
    status: true,
    stock: 14,
    thumbnail:
      "https://www.lto.com.ar/wp-content/uploads/2022/09/samueltlomen5355-1.jpg",
  },
  {
    title: "Remera de tirantes",
    description: "Remera de tirantes suave y cómoda.",
    price: 7.99,
    code: "P042",
    category: "remeras",

    status: true,
    stock: 35,
    thumbnail:
      "https://www.cottonclub.com.ar/pub/media/catalog/product/cache/65e2670acbf1788249a95924f3789a80/0/a/0a1a2803-5a72-4a5a-82d3-a2e89d7069a3.jpg",
  },
  {
    title: "Botas de cuero",
    description: "Botas de cuero elegantes y duraderas.",
    price: 99.99,
    code: "P043",
    category: "zapatos",

    status: true,
    stock: 5,
    thumbnail:
      "https://dinobutelli.com.ar/wp-content/uploads/2020/07/zapato-hombre-vestir-dino-butelli-argentina.jpg",
  },
  {
    title: "Camisa estampada",
    description: "Camisa estampada con diseño original.",
    price: 42.99,
    code: "P044",
    category: "camisas",

    status: true,
    stock: 8,
    thumbnail:
      "https://m.media-amazon.com/images/I/71Cb3TjQllL._AC_UY1000_.jpg",
  },
  {
    title: "Pantalón de cuero",
    description: "Pantalón de cuero resistente y elegante.",
    price: 149.99,
    code: "P045",
    category: "pantalones",
    status: true,
    stock: 4,
    thumbnail:
      "https://tienda.guantexindustrial.com.ar/809-large_default/pantalon-jeans-bufalo-talle-60.jpg",
  },
  {
    title: "Remera de manga larga",
    description: "Remera de manga larga suave y cómoda.",
    price: 12.99,
    code: "P046",
    category: "remeras",

    status: true,
    stock: 50,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/029/842/products/camp-half1-c832ebb77cb82c639e16091074486787-640-0.jpg",
  },
  {
    title: "Jean Slim Fit",
    description: "Jean Slim Fit de alta calidad y cómodo",
    price: 35.99,
    code: "P047",
    category: "pantalones",
    status: true,
    stock: 30,
    thumbnail:
      "https://alcatraz.com.ar/wp-content/uploads/2017/10/Pantalon-Ripstop-Azul-frente-sin-cinto2.jpg",
  },
  {
    title: "Zapatillas deportivas",
    description: "Zapatillas deportivas con excelente amortiguación",
    price: 59.99,
    code: "P048",
    category: "zapatos",

    status: true,
    stock: 20,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/546/472/products/zapatos-finales021-cfa7aab3550f7cb28b15119510502101-1024-1024.jpg",
  },
  {
    title: "Camisa de cuadros",
    description: "Camisa de cuadros en algodón suave",
    price: 25.99,
    code: "P049",
    category: "camisas",

    status: true,
    stock: 40,
    thumbnail: "https://m.media-amazon.com/images/I/51mUSwICj7L._AC_SX679_.jpg",
  },
  {
    title: "Pantalón de chándal",
    description: "Pantalón de chándal de algodón suave y cómodo",
    price: 19.99,
    code: "P050",
    category: "pantalones",
    status: true,
    stock: 25,
    thumbnail:
      "https://tienda.guantexindustrial.com.ar/809-large_default/pantalon-jeans-bufalo-talle-60.jpg",
  },
];

export default products;
