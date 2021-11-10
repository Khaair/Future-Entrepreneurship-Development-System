const { Schema, model, Mongoose } = require("mongoose");

const SettingSchema = new Schema(
  {
    slider: [
      {
        slidertitle: String,
        sliderqoute: String,
        img: String,
      },
    ],
    greetingtitle: String,
    greetingqoute: String,
    greetingimg: String,
    services: [
      {
        title: String,
        qoute: String,
        img: String,
      },
    ],
    portfolios: [
      {
        title: String,
        img: String,
      },
    ],
    bussinesstitle: String,
    bussinessqoute: String,
    bussinessimg: String,
    missiontitle: String,
    missionqoute: String,

    missionimg: String,
    vissiontitle: String,
    vissionqoute: String,

    vissionimg: String,
    teams: [
      {
        img: String,
        name: String,
        designation: String,
        fblink: String,
        googlelink: String,
        twitterlink: String,
        linkdin: String,
        link: String,
      },
    ],
    faqtitle: String,
    faqs: [
      {
        title: String,
        ans: String,
        hiden: Boolean,
      },
    ],

    commission: String,
    area: {
      type: Array,
      default: [
        {
          dist: "Dhaka",
          thana: [
            "Dhaka",
            "Faridpur",
            "Gazipur",
            "Gopalganj",
            "Kishoreganj",
            "Madaripur",
            "Manikganj",
            "Narayanganj",
            "Narsingdi",
            " Rajbari",
            "Shariatpur",
            "Tangail",
          ],
        },
        {
          dist: "Chattagram",
          thana: [
            "Chittagong",
            "Rangamati",
            "Bandarban",
            "Khagrachari",
            "Cox’s Bazar",
            "Feni",
            "Brahmanbaria",
            "Lakshmipur",
            "Comilla",
            "Chandpur",
            "Noakhali",
          ],
        },
        {
          dist: "Khulna",
          thana: [
            "Khulna",
            "Satkhira",
            "Bagerhat",
            "Jessore",
            "Narail",
            "Jhenaidah",
            "Kushtia",
            "Magura",
            "Meherpur",
            "Chuadanga",
          ],
        },
        {
          dist: "Mymensingh",
          thana: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
        },
        {
          dist: "Rangpur",
          thana: [
            "Gaibandha",
            "Kurigram",
            "Lalmonirhat",
            "Nilphamari",
            "Thakurgaon",
            "Rangpur",
            "Panchagarh",
            "Dinajpur",
          ],
        },
        {
          dist: "Rajshahi",
          thana: [
            "Bogra",
            "Joypurhat",
            "Naogaon",
            "Natore",
            "Nawabganj",
            "Pabna",
            "Rajshahi",
          ],
        },
        {
          dist: "Barisal",
          thana: [
            "Barisal",
            "Patuakhali",
            "Barguna",
            "Bhola",
            "Jhalokathi",
            "Pirojpur",
          ],
        },
        {
          dist: "Sylhet",
          thana: ["Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"],
        },
      ],
    },
  },
  { timestamps: true }
);
module.exports = model("setting", SettingSchema);
