

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
    },
    
    email: {
      type: String,
    },
    
    guestName: {
      type: String,
    },
 

products: [{
      product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },

      
        productId: String,   
        title: String,     
        price: Number,    
        image: String,    
        quantity: {
          type: Number,
          default: 1,
        },
    
        size: {
          type: String,
        },
      },
    ],


    totalPrice: {
      type: Number,
      required: true,
    },

   
    shippingCharge: {
      type: Number,
      default: 0,
    },
    
    courierName: String,
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
    
      city: {
        type: String,
        required: true,
      },
    
      state: {
        type: String,
        required: true,
      },
    
      pincode: {
        type: String,
        required: true,
      },
    },



    
    deliveryName: {
      type: String,
    },
    
    deliveryPhone: {
      type: String,
    },

    



courier: String,
trackingUrl: String,
shipmentId: String,



    paymentStatus: {
      type: String,
      default: "pending",
    },

    orderStatus: {
      type: String,
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
