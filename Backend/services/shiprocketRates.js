
const axios = require("axios");
const { getShiprocketToken } = require("./shiprocketService");

const SHIPROCKET_BASE = "https://apiv2.shiprocket.in/v1/external";

const getCourierRates = async (pincode, weight) => {
  try {
    const token = await getShiprocketToken();
    if (!token) throw new Error("Token missing");

    const response = await axios.get(
      `${SHIPROCKET_BASE}/courier/serviceability/`,
      {
        params: {
          pickup_postcode: "110092",
          delivery_postcode: pincode,
          weight: weight || 0.5,
          cod: 0,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const couriers = response?.data?.data?.available_courier_companies || [];
    console.log("✅ API DATA RECEIVED. Total options =", couriers.length);

    if (!couriers.length) {
      return { success: false };
    }

    // ✅ STEP 1: Remove unwanted couriers (Air ones)
    const filteredCouriers = couriers.filter(
      (c) => !c.courier_name.toLowerCase().includes("air")
    );

    // Fallback agar saare air couriers hi bache hon
    const finalCouriers = filteredCouriers.length > 0 ? filteredCouriers : couriers;

    // ✅ STEP 2: Sort by cheapest total `rate` (Low to High price)
    const sortedByPrice = finalCouriers.sort(
      (a, b) => Number(a.rate) - Number(b.rate)
    );

    const selectedCourier = sortedByPrice[0]; 

    console.log("🚀 ACTUAL CHEAPEST COURIER =", selectedCourier.courier_name, "| Shiprocket Rate = ₹", selectedCourier.rate);

    // 💡 CALCULATION: Shiprocket ke rate me ₹5 notify charge add karna
    const shiprocketRate = Number(selectedCourier.rate);
    const notifyCharge = 5;
    const finalTotalCharge = shiprocketRate + notifyCharge;

    console.log("📊 FINAL CALCULATION: Base Rate =", shiprocketRate, "+ Notify Fee =", notifyCharge, "➔ Total =", finalTotalCharge);

    return {
      success: true,
      courier: {
        name: selectedCourier.courier_name,
        charge: finalTotalCharge, 
        etd: selectedCourier.etd,
      },
    };
  } catch (err) {
    console.log("SHIPROCKET RATES SERVICE ERROR =", err.message);
    return { success: false };
  }
};

module.exports = { getCourierRates };