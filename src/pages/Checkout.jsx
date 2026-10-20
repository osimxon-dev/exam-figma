import { useState } from "react";
import { Breadcrumb } from "../components/ui";
import { CartTotal, Coupon, Thumb } from "./Cart";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { sendTelegram } from "../telegram";
import { btn, container, fieldInput } from "../styles";

const fields = [
  ["First Name", true],
  ["Company Name"],
  ["Street Address", true],
  ["Apartment, floor, etc. (optional)"],
  ["Town/City", true],
  ["Phone Number", true],
  ["Email Address", true],
];

const payments = [
  ["bkash", "w-[38px]"],
  ["visa", "w-[38px]"],
  ["mastercard", "w-[39px]"],
  ["nagad", "w-[39px]"],
];

const radioDot =
  "size-6 bg-[url(/icons/radio.svg)] peer-checked:bg-[url(/icons/radio-checked.svg)]";

export default function Checkout() {
  const [pay, setPay] = useState("cash");
  const [save, setSave] = useState(true);
  const [sending, setSending] = useState(false);
  const { cart, t } = useStore();

  const submit = async (e) => {
    e.preventDefault();
    if (!cart.length) return toast.error(t("Your cart is empty"));
    const info = [...new FormData(e.target)]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const items = cart
      .map(
        (i, n) =>
          `${n + 1}. ${i.name}\n   Narxi: $${i.price} × ${i.qty} = $${i.price * i.qty}`,
      )
      .join("\n");
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    setSending(true);
    try {
      await sendTelegram(
        `🛒 Yangi buyurtma\n\n${items}\n\nJami: $${total}\nTo‘lov: ${pay === "cash" ? "Naqd (yetkazilganda)" : "Bank"}\n\n${info}`,
      );
      toast.success(t("Order placed successfully!"));
    } catch {
      toast.error(t("Something went wrong, try again"));
    } finally {
      setSending(false);
    }
  };

  return (
    <main className={`${container} pt-20 pb-35`}>
      <Breadcrumb
        items={["Account", "My Account", "Product", "View Cart", "CheckOut"]}
      />
      <h1 className="mt-20 font-inter text-4xl/[30px] font-medium tracking-[1.44px]">
        {t("Billing Details")}
      </h1>
      <div className="mt-12 flex items-start justify-between">
        <form
          id="billing"
          className="flex w-[470px] flex-col gap-8"
          onSubmit={submit}
        >
          {fields.map(([label, req]) => (
            <label key={label} className="flex flex-col gap-2">
              <span className="opacity-40">
                {t(label)}
                {req && <em className="text-brand not-italic">*</em>}
              </span>
              <input className={fieldInput} name={label} required={req} />
            </label>
          ))}
          <label className="-mt-2 flex cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              className="peer hidden"
              checked={save}
              onChange={() => setSave(!save)}
            />
            <span className="size-6 rounded border border-black/40 peer-checked:border-0 peer-checked:bg-[url(/icons/checkbox.svg)]" />
            {t("Save this information for faster check-out next time")}
          </label>
        </form>

        <div className="mt-8 flex w-[527px] flex-col gap-8">
          {cart.map((i) => (
            <div key={i.id} className="flex w-[425px] items-center gap-6">
              <Thumb img={i.img} />
              <span>{i.name}</span>
              <span className="ml-auto">${i.price * i.qty}</span>
            </div>
          ))}
          <div className="w-[422px]">
            <CartTotal
              subtotal={cart.reduce((s, i) => s + i.price * i.qty, 0)}
            />
          </div>
          <label className="flex w-[427px] cursor-pointer items-center gap-4">
            <input
              type="radio"
              className="peer hidden"
              checked={pay === "bank"}
              onChange={() => setPay("bank")}
            />
            <span className={radioDot} />
            {t("Bank")}
            <span className="ml-auto flex gap-2">
              {payments.map(([p, w]) => (
                <span
                  key={p}
                  className="flex h-7 w-[42px] items-center justify-center"
                >
                  <img src={`/images/${p}.png`} alt={p} className={w} />
                </span>
              ))}
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-4">
            <input
              type="radio"
              className="peer hidden"
              checked={pay === "cash"}
              onChange={() => setPay("cash")}
            />
            <span className={radioDot} />
            {t("Cash on delivery")}
          </label>
          <Coupon />
          <button
            form="billing"
            className={`${btn} self-start`}
            disabled={sending}
          >
            {t("Place Order")}
          </button>
        </div>
      </div>
    </main>
  );
}
