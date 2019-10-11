var graphql = require('graphql')

var products = [
  {
    "id": "1",
    "title": "Den",
    "price": "215"
  },

  {
    "id": "2",
    "title": "Ann",
    "price": "20"
  },

  {
    "id": "3",
    "title": "Hav",
    "price": "3"
  }
]

var categories = [
  {
    "name": "sale",
    "productPrice": "3"
  },
  { 
    "name": "mid",
    "productPrice": "20"
  },
  { 
    "name": "hight",
    "productPrice": "215"
  }
]

var basket = [
  {
    "count": "2",
    "titleProduct": "Den",
    "price": "430"
  }
]


var productType = new graphql.GraphQLObjectType ({
name: 'Product',
fields: {
  title: {
    type: graphql.GraphQLString
  },
  id: {
    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
  },
  price: {
    type: graphql.GraphQLString
  }
}
})

var categoryProduct = new graphql.GraphQLObjectType ({
  name: 'Category',
  fields: {
    name: {
      type: graphql.GraphQLString
    },
    productPrice: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  }
  })

  var basketProduct = new graphql.GraphQLObjectType ({
    name: 'Basket',
    fields: {
      titleProduct: {
        type: graphql.GraphQLString
      },
      count: {
        type: graphql.GraphQLString
      },
      price: {
        type: graphql.GraphQLString
      }
    }
    })

var queryType = new graphql.GraphQLObjectType ({
name: 'Query',
fields: {
  products: {
    type: new graphql.GraphQLList(productType),
    args: {
      id: {
        type: graphql.GraphQLString, defaultValue: "2"
      }
    },
    resolve: function(parent, args) {     
      if (args.id) {
        return products.filter(it => it.id === args.id);
      }
      return products
    }
  },
  categories: {
    type: new graphql.GraphQLList(categoryProduct),
    resolve: function() {
      return categories
    }
  },

  basket: {
    type: new graphql.GraphQLList(basketProduct),
    resolve: function() {
      return basket
    }
  }
}
})

var mutation = new graphql.GraphQLObjectType({
name: 'Mutation',
fields: {
  addProduct: {
    type: queryType,
    args: {
      title: { type: graphql.GraphQLString },
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      price: { type: graphql.GraphQLString }
    },
    resolve(parent, { title, id, price }) {
      var newProduct = { title, id, price }
      products.push(newProduct)
      return products
    }
  },
  deleteProduct: {
    type: queryType,
    args: { id: { type: graphql.GraphQLString } },
    resolve(parent, { id }) {
      var prodIndex = products.findIndex(it => it.id === id)
      if (prodIndex === -1) throw new Error("Product is not found")
      var newProducts = products.splice(prodIndex, 1)
      return newProducts[0]
    }
  },
  addProductToBasket: {
    type: queryType,
    args: {
      count: { type: graphql.GraphQLString },
      titleProduct: { type: graphql.GraphQLString, defaultValue: "Hav" },
      price: { type: graphql.GraphQLString }
    },
    resolve(parent, { count, titleProduct, price }) {
      var newOrder = { count, titleProduct, price }
      basket.push(newOrder)
      return basket
    }
  },
  changeProductPrice: {
    type: queryType,
    args: { 
      id: { type: graphql.GraphQLString },
      newPrice: { type: graphql.GraphQLString }
  },
    resolve(parent, { id, newPrice }) {
      var prodIndex = products.findIndex(it => it.id === id)
      if (prodIndex === -1) throw new Error("Product is not found")
      products[prodIndex].price = newPrice
      return products[prodIndex]
    }
  },
}
});

var schema = new graphql.GraphQLSchema ({
  query: queryType,
  mutation: mutation
})

module.exports = schema