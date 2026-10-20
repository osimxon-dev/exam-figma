import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/ui";
import { useStore } from "../store";
import { box, btn, btnOutline, container } from "../styles";

const row = "grid grid-cols-[347px_323px_353px_auto] items-center px-10";

export function Thumb({ img: [file, w, h] }) {
  const s = 50 / Math.max(w, h);
  return (
    <span className="relative block size-[54px] shrink-0">
      <img
        src={`/images/${file}.png`}
        alt=""
        className="absolute"
        style={{
          width: w * s,
          height: h * s,
          left: (54 - w * s) / 2,
          top: (54 - h * s) / 2,
        }}
      />
    </span>
  );
}

export function CartTotal({ subtotal, children }) {
  const { t } = useStore();
  const line = "flex justify-between";
  const divided = `${line} mb-[15px] border-b border-black/40 pb-4`;
  return (
    <>
      <div className={divided}>
        <span>{t("Subtotal:")}</span>
        <span>${subtotal}</span>
      </div>
      <div className={divided}>
        <span>{t("Shipping:")}</span>
        <span>{t("Free")}</span>
      </div>
      <div className={line}>
        <span>{t("Total:")}</span>
        <span>${subtotal}</span>
      </div>
      {children}
    </>
  );
}

export function Coupon() {
  const { t } = useStore();
  return (
    <div className="flex gap-4">
      <input
        placeholder={t("Coupon Code")}
        className="h-14 w-[300px] rounded border border-black px-6"
      />
      <button className={btn}>{t("Apply Coupon")}</button>
    </div>
  );
}

export default function Cart() {
  const { cart, setQty, removeFromCart, t } = useStore();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <main className={`${container} pt-20 pb-35`}>
      <Breadcrumb items={["Home", "Cart"]} />
      <div className={`${row} ${box} mt-20 h-[72px]`}>
        <span>{t("Product")}</span>
        <span>{t("Price")}</span>
        <span>{t("Quantity")}</span>
        <span>{t("Subtotal")}</span>
      </div>
      {cart.map((i) => (
        <div
          key={i.id}
          className={`${row} ${box} group relative mt-10 h-[102px]`}
        >
          <span className="flex items-center gap-5">
            <button
              className="absolute top-5 left-[30px] z-1 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => removeFromCart(i.id)}
            >
              <img src="/icons/cart-cancel.svg" alt="Remove" />
            </button>
            <Thumb img={i.img} />
            {i.name}
          </span>
          <span>${i.price}</span>
          <span>
            <span className="inline-flex h-11 w-[72px] items-center justify-between rounded border-[1.5px] border-black/40 py-1.5 pr-[11px] pl-3">
              {String(i.qty).padStart(2, "0")}
              <span className="flex flex-col">
                <button onClick={() => setQty(i.id, 1)}>
                  <img src="/icons/drop-up-small.svg" alt="Increase" />
                </button>
                <button onClick={() => setQty(i.id, -1)}>
                  <img src="/icons/drop-down-small.svg" alt="Decrease" />
                </button>
              </span>
            </span>
          </span>
          <span>${i.price * i.qty}</span>
        </div>
      ))}
      <div className="mt-6 flex items-center justify-between">
        <Link to="/" className={btnOutline}>
          {t("Return To Shop")}
        </Link>
        <button className={btnOutline}>{t("Update Cart")}</button>
      </div>
      <div className="mt-20 flex items-start justify-between">
        <Coupon />
        <div className="w-[470px] rounded border-[1.5px] border-black px-6 py-8">
          <h3 className="mb-6 text-xl/7 font-medium">{t("Cart Total")}</h3>
          <CartTotal subtotal={subtotal}>
            <Link to="/checkout" className={`${btn} mt-4 ml-[65px]`}>
              {t("Procees to checkout")}
            </Link>
          </CartTotal>
        </div>
      </div>
    </main>
  );
}
