export const metadata = {
  title: "Order Confirmed",
  description: "Your Mow Lee & Co. order has been confirmed.",
  alternates: { canonical: "/checkout/success" },
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessLayout({ children }) {
  return children;
}
