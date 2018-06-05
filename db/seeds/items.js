
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          id: "1",
          title: "Hugo",
          details:
            "Grey, long-haired. Has neurological deficit and will shake head if he feels scared or threatened. This cat is very timid!",
          last_seen: "June 1st, 2018",
          reward: "50",
          found: false,
          returned: false,
          edit_code: "1dX",
          location: "303 Spring St. New York, NY",
          email: "andrew@galvanize.com",
          phone: "555-1212",
          img_link:
            "https://www.amazon.com/drive/v1/nodes/tWBcTGgLT4ub9oLc5IiStQ/contentRedirection?querySuffix=%3FviewBox%3D603%2C635&ownerId=A3EI94I4G6PB8Y&cb=1528050027189"
        },
        {
          id: "2",
          title: "Bracelet",
          details:
            "Silver bracelet with double pattern. 2 inches in diameter, no clasp.",
          last_seen: "May 23st, 2018",
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
