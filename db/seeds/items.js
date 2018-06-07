
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          id: "1",
          title: "Dog",
          details:
            "Responds to 'Ginger'. Black lab mix. Very sweet natured.",
          last_seen: "2018-04-05",
          reward: "1000",
          found: false,
          returned: false,
          edit_code: "1dX",
          location: "303 Spring St. New York, NY",
          email: "andrew@galvanize.com",
          phone: "555-1212",
          img_link: "https://bit.ly/2Jj7p8Z"
        },
        {
          id: "2",
          title: "Bracelet",
          details:
            "Silver bracelet with double pattern. 2 inches in diameter, no clasp.",
          last_seen: "2018-03-12",
          reward: "10",
          found: false,
          edit_code: "9db",
          email: "andrew@galvanize.com",
          location: "Van Saun Park, Paramus, NJ",
          phone: "555-1212",
          returned: false,
          img_link:
            "https://images-na.ssl-images-amazon.com/images/I/81OndQ7LIPL._UX695_.jpg"
        }
      ]);
    });
};
