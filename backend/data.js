import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'behnam',
      email: 'behnamzare100@yahoo.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'ali',
      email: 'ali@yahoo.com',
      password: bcrypt.hashSync('111111'),
      isAdmin: false
    },
  ], 
  products: [
    {
      //_id: 0,
      name: "سانسوریا گلدان فلزی",
      slug: "sanseveria1",
      image: "/images/sanseveria(1).jpg",
      category: "آپارتمانی",
      price: 990000,
      countInStock: 5,
      brand: "pronia",
      rating: 4.3,
      numReviews: 5,
      description: "گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.",
      images: [
        '/images/sanseveria(1).jpg',
        '/images/sanseveria(7).jpg',
        '/images/sanseveria(6).jpg',
      ]
    },

    {
      //_id: 4,
      name: "سانسوریا گلدان سنگی",
      slug: "sanseveria5",
      image: "/images/sanseveria(7).jpg",
      category: "آپارتمانی",
      price: 1290000,
      countInStock: 3,
      brand: "pronia",
      rating: 4,      
      numReviews: 33,
      description:"یاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کید.",
      images: [
        '/images/sanseveria(1).jpg',
        '/images/sanseveria(7).jpg',
        '/images/sanseveria(6).jpg',
      ]
    },

    {
      //_id: 6,
      name: "درخت بنجامین",
      slug: "benjamin1",
      image: "/images/benjamin1.jpg",
      category: "آپارتمانی",
      price: 2100000,
      countInStock: 5,
      brand: "pronia",
      rating: 4.2,
      numReviews: 5,
      description: "گیاه بنجامین جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.",
      images: [
        '/images/benjamin1.jpg',
        '/images/benjamin2.jpg',
      ]
    },
    {
      //_id: 7,
      name: "بنجامین بافته شده",
      slug: "benjamin8",
      image: "/images/benjamin2.png",
      category: "آپارتمانی",
      price: 640000,
      countInStock: 6,
      brand: "pronia",
      rating: 3.6,
      numReviews: 3,
      description: "گیاه بنجامین جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.",
      images: [
        '/images/benjamin1.jpg',
        '/images/benjamin2.jpg',
      ]
    },
    {
      //_id: 8,
      name: "آدنیوم عربیکم",
      slug: "adeniom",
      image: "/images/adeniom.jpg",
      category: "آپارتمانی",
      price: 650000,
      countInStock: 4,
      brand: "pronia",
      rating: 4.5,
      numReviews: 2,
      description: "گیاه آدنیوم جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.",
      images: [
        "/images/adeniom.jpg",
      ]
    },
    {
      //_id: 9,
      name: "بیلچه",
      slug: "shovel",
      image: "/images/shovel1.jpg",
      category: "ابزارآلات",
      price: 340000,
      countInStock: 4,
      brand: "tools",
      rating: 4.5,
      numReviews: 2,
      description: "بیلچه یکی از ابزار های لازم برای هر کشاورز است و ما به شما یکی از با کیفیت ترین بیلچه های موجود در بازار را معرفی میکنیم",
      images: [
        '/images/shovel1.jpg',
      ]
    },
    {
      //_id: 9,
      name: "سمپاش",
      slug: "sprayer",
      image: "/images/sprayer.jpg",
      category: "ابزارآلات",
      price: 1100000,
      countInStock: 4,
      brand: "tools",
      rating: 4.9,
      numReviews: 2,
      description: "سمپاشی یکی از حساس ترین کارها در کشاورزی است و شما قطعا نیاز به یک محصول کاملا ایمن دارید",
      images: [
        '/images/sprayer.jpg',
      ]
    },
    {
      //_id: 9,
      name: "آبپاش",
      slug: "sprinkler",
      image: "/images/sprinkler.jpg",
      category: "ابزارآلات",
      price: 100000,
      countInStock: 4,
      brand: "tools",
      rating: 4.9,
      numReviews: 2,
      description: "این محصول با دارای بودن قدرت پاشش بسیار عالی و همین طور طول عمر بالا بهترین گزینه برای زمینهای کشاورزی با ابعاد بزرگ است.",
      images: [
        '/images/sprinkler.jpg',
      ]
    },
    {
      //_id: 9,
      name: "کود npk 20-20-20",
      slug: "npk",
      image: "/images/npk.jpg",
      category: "کود و سموم",
      price: 100000,
      countInStock: 4,
      brand: "Fertilizer",
      rating: 4.9,
      numReviews: 2,
      description: "این کود با دارا بودن عناصر نیتروژن، فسفر، پتاسیم بهترین گزینه برای گیاهان شماست",
      images: [
        '/images/npk.jpg',
      ]
    },
    {
      //_id: 9,
      name: "پرلیت",
      slug: "perlit",
      image: "/images/perlit.jpg",
      category: "بستر کشت",
      price: 100000,
      countInStock: 4,
      brand: "soil",
      rating: 4.9,
      numReviews: 2,
      description: "یک بستر کشت مناسب به دلیل جذب آب بسیار بالا و مناسب برای گیاهانی که در خاکهای سبک رشد خوبی دارند.",
      images: [
        '/images/perlit.jpg',
      ]
    },
    {
      //_id: 9,
      name: "خاک باغچه",
      slug: "garden-soil",
      image: "/images/gardensoil.jpg",
      category: "بستر کشت",
      price: 100000,
      countInStock: 4,
      brand: "soil",
      rating: 4.9,
      numReviews: 2,
      description: "خاک باغچه با دارا بودن مواد مختلف باعث رشد فراوان گیاهان شما میشود.",
      images: [
        '/images/gardensoil.jpg',
      ]
    },
    {
      //_id: 9,
      name: "گلدان فلزی",
      slug: "pot1",
      image: "/images/pot2.jpg",
      category: "بستر کشت",
      price: 88000,
      countInStock: 4,
      brand: "pot",
      rating: 4.9,
      numReviews: 2,
      description: "گلدان مناسب برای گیاهان شما حتما ویژگیهای منحصر به فردی دارد از جمله کیفیت ساخت بالا و همین طور زهکشی مناسب اگر به دنبال این ویژگیها هستید ما گلدان شماره 1 را به شما معرفی میکنیم",
      images: [
        '/images/pot2.jpg',
      ]
    },
    {
      //_id: 9,
      name: "گلدان آبی",
      slug: "pot2",
      image: "/images/pot3.jpg",
      category: "بستر کشت",
      price: 92000,
      countInStock: 4,
      brand: "pot",
      rating: 4.9,
      numReviews: 2,
      description: "گلدان مناسب برای گیاهان شما حتما ویژگیهای منحصر به فردی دارد از جمله کیفیت ساخت بالا و همین طور زهکشی مناسب اگر به دنبال این ویژگیها هستید ما گلدان شماره 2 را به شما معرفی میکنیم",
      images: [
        '/images/pot3.jpg',
      ]
    },
    {
      //_id: 9,
      name: "کوکوپیت",
      slug: "cocopit",
      image: "/images/cocopit.jpg",
      category: "بستر کشت",
      price: 128000,
      countInStock: 4,
      brand: "soil",
      rating: 4.9,
      numReviews: 2,
      description: "کوکوپیت با دارا بودن ویژگی های بسیار مناسب یکی از محبوب ترین بسترهای کشت برای گیاهان آپارتمانی است",
      images: [
        '/images/cocopit.jpg',
      ]
    },
    {
      //_id: 9,
      name: "پیت ماس",
      slug: "pitmas",
      image: "/images/pitmas.jpg",
      category: "بستر کشت",
      price: 130000,
      countInStock: 4,
      brand: "soil",
      rating: 4.9,
      numReviews: 2,
      description: "پیت ماس با دارا بودن ویژگی های بسیار مناسب یکی از محبوب ترین بسترهای کشت برای گیاهان آپارتمانی است",
      images: [
        '/images/pitmas.jpg',
      ]
    },
    {
      //_id: 9,
      name: "ورمی کمپوست",
      slug: "vermicompost1",
      image: "/images/vermicompost.jpg",
      category: "کود و سموم",
      price: 118000,
      countInStock: 4,
      brand: "Fertilizer",
      rating: 4.9,
      numReviews: 2,
      description: "ورمی کمپوست یکی از بهترین گزینه ها برای بهبود عملکرد گیاه شماست",
      images: [
        '/images/vermicompost.jpg',
      ]
    },

    {
      //_id: 9,
      name: "سم قارچکش بردو",
      slug: "bordo",
      image: "/images/bordo.jpg",
      category: "کود و سموم",
      price: 123000,
      countInStock: 4,
      brand: "poison",
      rating: 4.9,
      numReviews: 2,
      description: "یکی از معروف ترین سموم که برای از بین بردن قارچها استفاده میشود.",
      images: [
        '/images/bordo.jpg',
      ]
    },
    {
      //_id: 9,
      name: "سم قارچکش کاربندازیم",
      slug: "karbendazim",
      image: "/images/karbendazim.jpg",
      category: "کود و سموم",
      price: 1170000,
      countInStock: 4,
      brand: "poison",
      rating: 4.9,
      numReviews: 2,
      description: "یکی از معروف ترین سموم که برای از بین بردن قارچها استفاده میشود.",
      images: [
        '/images/karbendazim.jpg',
      ]
    },
  ],
};
export default data;


// import bcrypt from 'bcryptjs';

// const data = {
//   users: [
//     {
//       name: 'Basir',
//       email: 'admin@example.com',
//       password: bcrypt.hashSync('123456'),
//       isAdmin: true,
//     },
//     {
//       name: 'John',
//       email: 'user@example.com',
//       password: bcrypt.hashSync('123456'),
//       isAdmin: false,
//     },
//   ],
//   products: [
//     {
//       // _id: '4',
//       name: 'سانسوریا',
//       slug: 'sanseveria1',
//       category: 'آپارتمانی',
//       image: '/images/sanseveria (1).jpg',
//       price: 490000,
//       countInStock: 5,
//       brand: 'pronia',
//       rating: 4.5,
//       numReviews: 10,
//       description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
//     },
    // {
    //   // _id: '4',
    //   name: 'سانسوریا',
    //   slug: 'sanseveria2',
    //   category: 'آپارتمانی',
    //   image: '/images/sanseveria (2).jpg',
    //   price: 750000,
    //   countInStock: 5,
    //   brand: 'pronia',
    //   rating: 4.5,
    //   numReviews: 10,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: '2سانسوریا',
    //   slug: 'sanseveria3',
    //   category: 'آپارتمانی',
    //   image: '/images/sanseveria (5).jpg',
    //   price: 1100000,
    //   countInStock: 3,
    //   brand: 'pronia',
    //   rating: 2.9,
    //   numReviews: 10,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'سانسوریا',
    //   slug: 'sanseveria4',
    //   category: 'آپارتمانی',
    //   image: '/images/sanseveria (6).jpg',
    //   price: 810000,
    //   countInStock: 5,
    //   brand: 'pronia',
    //   rating: 3.3,
    //   numReviews: 3,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'سانسوریا',
    //   slug: 'sanseveria5',
    //   category: 'آپارتمانی',
    //   image: '/images/sanseveria (7).jpg',
    //   price: 900000,
    //   countInStock: 0,
    //   brand: 'pronia',
    //   rating: 4.7,
    //   numReviews: 19,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'سانسوریا',
    //   slug: 'sanseveria6',
    //   category: 'آپارتمانی',
    //   image: '/images/sanseveria(8).png',
    //   price: 470000,
    //   countInStock: 13,
    //   brand: 'pronia',
    //   rating: 5,
    //   numReviews: 1,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'بنجامین',
    //   slug: 'benjamin1',
    //   category: 'آپارتمانی',
    //   image: '/images/benjamin1.jpg',
    //   price: 670000,
    //   countInStock: 30,
    //   brand: 'pronia',
    //   rating: 3.9,
    //   numReviews: 5,
    //   description: 'گیاه سانسوریا جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'بنجامین',
    //   slug: 'benjamin2',
    //   category: 'آپارتمانی',
    //   image: '/images/benjamin2.png',
    //   price: 750000,
    //   countInStock: 2,
    //   brand: 'pronia',
    //   rating: 4.1,
    //   numReviews: 23,
    //   description: 'گیاه بنجامین جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
    // {
    //   // _id: '4',
    //   name: 'آدنیوم',
    //   slug: 'sanseveria1',
    //   category: 'آپارتمانی',
    //   image: '/images/adeniom.jpg',
    //   price: 840000,
    //   countInStock: 12,
    //   brand: 'pronia',
    //   rating: 3.9,
    //   numReviews: 5,
    //   description: 'گیاه آدنیوم جزو زیباترین و در عین حال مقاوم ترین نوع گیاهان آپارتمانی محسوب میشود و شما عزیزان هم اکنون میتوانید این گیاه را از سایت پرونیا تهیه کنید.',
    // },
//   ],
// };
// export default data;
