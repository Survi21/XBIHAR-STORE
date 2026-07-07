
import express from 'express';
import crypto from 'crypto';

const router = express.Router();

router.post('/razorpay-webhook', async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  // Razorpay ke signal ko verify karna ki yeh asli hai ya fake
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    const event = req.body.event;
    
    // Agar payment successful ho gayi hai
    if (event === 'payment.captured') {
      const orderId = req.body.payload.payment.entity.order_id;
      
      // 📝 YAHAN AAPKA DATABASE UPDATE CODE AAYEGA:
      // example: await Order.findOneAndUpdate({ orderId }, { status: 'Paid' });
      console.log(`Order ${orderId} successfully marked as PAID via Webhook!`);
    }
    
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(400).send('Invalid webhook signature');
  }
});

export default router;
