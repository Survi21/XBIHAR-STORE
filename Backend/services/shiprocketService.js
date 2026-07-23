
const axios = require("axios");

const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

let tokenCache = null;
let tokenExpiry = null;

// ✅ TOKEN GENERATE
const getShiprocketToken = async () => {
  try {
    if (tokenCache && tokenExpiry > Date.now()) {
      return tokenCache;
    }

    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });

    tokenCache = res.data.token;
    tokenExpiry = Date.now() + 50 * 60 * 1000;

    return tokenCache;

  } catch (err) {
    console.log("❌ TOKEN ERROR:", err.response?.data || err.message);
    return null;
  }
};

// ✅ MAIN FUNCTION
const createShiprocketOrder = async (order) => {
  try {
    const token = await getShiprocketToken();

    if (!token) throw new Error("Token not generated");

    // ✅ STEP 1 — DYNAMIC WEIGHT
    const ITEM_WEIGHT = 0.5; // per product (kg)

    const totalWeight = order.products.reduce(
      (total, p) => total + p.quantity * ITEM_WEIGHT,
      0
    );

    // ✅ STEP 2 — CREATE ORDER
    const orderRes = await axios.post(
      `${BASE_URL}/orders/create/adhoc`,
      {
        order_id: order._id.toString(),
        order_date: new Date().toISOString(),
        pickup_location: "XBIHAR DISPATCH",
        billing_customer_name: order.name?.split(" ")[0] || "Customer",
        billing_last_name: order.name?.split(" ").slice(1).join(" ") || "User",
        billing_phone: order.deliveryPhone,
        billing_email: order.email,
        // billing_address: order.shippingAddress || "Address details",
        // billing_city: "City Name", 
        // billing_state: "State Name",
billing_address: order.shippingAddress?.address || "Address details",
        billing_city: order.shippingAddress?.city || "City Name",
        billing_state: order.shippingAddress?.state || "State Name",

        billing_country: "India",
        billing_pincode: order.shippingAddressPincode || "110001",
        shipping_is_billing: true,
        order_items: order.products.map((p) => ({
          name: p.title,
          sku: p.productId,
          units: p.quantity,
          selling_price: p.price,
        })),
        payment_method: "Prepaid",
        sub_total: order.totalPrice,
        length: 10,
        breadth: 10,
        height: 10,
        weight: totalWeight,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ ORDER CREATED:", orderRes.data);

    const shipment_id = orderRes.data.shipment_id;

    // ✅ STEP 3 — CHECK SERVICEABILITY
    const serviceRes = await axios.get(
      `${BASE_URL}/courier/serviceability`,
      {
        params: {
          pickup_postcode: "110092", 
          delivery_postcode: order.shippingAddressPincode || "110001",
          weight: totalWeight,
          cod: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const couriers = serviceRes.data.data.available_courier_companies;

    if (!couriers || couriers.length === 0) {
      throw new Error("No courier available");
    }

    // ✅ CHEAPEST COURIER AUTO SELECT
    const courier = couriers.sort((a, b) => a.rate - b.rate)[0];

    console.log("✅ COURIER SELECTED:", courier.courier_name);

    // ✅ STEP 4 — SAFE AWB (IMPORTANT)
    let tracking_url = null;

    try {
      const awbRes = await axios.post(
        `${BASE_URL}/courier/assign/awb`,
        {
          shipment_id,
          courier_id: courier.courier_company_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ AWB GENERATED");
      tracking_url = awbRes.data?.data?.tracking_url;

    } catch (err) {
      console.log("⚠️ AWB FAILED (order still created)");
    }

    return {
      shipment_id,
      courier_name: courier.courier_name,
      tracking_url: tracking_url,
    };

  } catch (error) {
    console.log(
      "❌ SHIPROCKET ERROR:",
      error.response?.data || error.message
    );
    return null;
  }
};

module.exports = {
  getShiprocketToken,
  createShiprocketOrder,
};
