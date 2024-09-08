import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { payment_method_id, payment_intent_id, customer_id } = body;

    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        // eslint-disable-next-line prettier/prettier
        { status: 400 }
      );
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      payment_method_id,
      // eslint-disable-next-line prettier/prettier
      { customer: customer_id }
    );

    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment successful",
        result: result,
        // eslint-disable-next-line prettier/prettier
      })
    );
  } catch (error) {
    console.error("Error paying:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
