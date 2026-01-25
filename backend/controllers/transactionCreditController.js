import Transaction from "../models/Transaction.js"
import Stripe from 'stripe';

const plans = [
  {
    "_id": "basic",
    "name": "Basic Plan",
    "price": 10,
    "credits": 100,
    "features": [
      "100 text generations",
      "Access to standard tools",
      "Email support",
      "Single device usage",
      "80 image generations"
    ]
  },
  {
    "_id": "pro",
    "name": "Pro Plan",
    "price": 30,
    "credits": 500,
    "features": [
      "Priority support",
      "Multi-device access",
      "Advanced analytics",
      "Customizable settings",
      "500 text generations",
      "300 image generations"
    ]
  },
  {
    "_id": "premium",
    "name": "Premium Plan",
    "price": 50,
    "credits": 1000,
    "features": [
      "Dedicated account manager",
      "Unlimited device usage",
      "API access",
      "Advanced security features",
      "Team collaboration tools",
      "2000 text generations",
      "1000 image generations"
    ]
  }
]

// Api controller to get all plans
export const getPlans = async (req, res) => {
  try {
    res.json({ success: true, plans })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Api controller to purchase plans
export const purchasePlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;
    const plan = plans.find(plan => plan._id === planId);
    if (!plan) {
      return res.json({ success: false, message: "Invalid Plan" });
    }
    // Create new transaction
    const transaction = await Transaction.create({
      userId: userId,
      planId: planId,
      amount: plan.price,
      credits: plan.credits,
      isPaid: false
    });

    const {origin} = req.headers;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: plan.price * 100,
            product_data: {
              name: plan.name
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/loading`,
      cancel_url: `${origin}`,
      metadata: {transactionId: transaction._id.toString(), appId: "Chat-ai-app"},
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // expires in 30 minutes
    });

    res.json({success: true, url: session.url});
    
  } catch (error) {
    res.json({success:false, message: error.message})
  }
}


