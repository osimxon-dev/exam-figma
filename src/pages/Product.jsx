import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Breadcrumb, ColorPicker, SectionLabel, Stars } from "../components/ui";
import { flashSales, related } from "../data";
import { useStore } from "../store";
import { btnSmall, container, grid4 } from "../styles";

const thumbs = [
  ["gamepad-1", 121, 114, 24, 12],
  ["gamepad-2", 112, 97, 29, 20],
  ["gamepad-3", 134, 94, 18, 22],
  ["gamepad-4", 122, 106, 24, 16],
];

const optLabel = "font-inter text-xl/5 tracking-[0.6px]";
const deliveryText = "mt-2 block text-xs/4.5 font-medium";

export default function Product() {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(2);
  const { inWishlist, toggleWishlist, addToCart, t } = useStore();
  const navigate = useNavigate();
  const p = flashSales[0];
  const wished = inWishlist(p.id);

  return (
    <main className={`${container} pt-20 pb-35`}>
      <Breadcrumb items={["Account", "Gaming", "Havic HV G-92 Gamepad"]} />
      <div className="mt-20 flex items-start">
        <div className="flex flex-col gap-4">
          {thumbs.map(([f, w, h, x, y]) => (
            <div
              key={f}
              className="relative h-[138px] w-[170px] overflow-hidden rounded bg-soft"
            >
              <img
                src={`/images/${f}.png`}
                alt=""
                className="absolute"
                style={{ width: w, height: h, left: x, top: y }}
              />
            </div>
          ))}
        </div>
        <div className="relative ml-7.5 h-[600px] w-[500px] rounded bg-soft">
          <img
            src="/images/gamepad-main.png"
            alt="Havic HV G-92 Gamepad"
            className="absolute top-[154px] left-[27px] h-[315px] w-[446px]"
          />
        </div>
        <div className="ml-[70px] w-[400px]">
          <h1 className="font-inter text-2xl/6 font-semibold tracking-[0.72px]">
            Havic HV G-92 Gamepad
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm/[21px]">
            <Stars rating={4} />
            <span className="opacity-50">(150 {t("Reviews")})</span>
            <span className="mx-2 h-4 w-px bg-black/50" />
            <span className="text-accent opacity-60">{t("In Stock")}</span>
          </div>
          <p className="mt-4 font-inter text-2xl/6 tracking-[0.72px]">
            $192.00
          </p>
          <p className="mt-6 w-[373px] text-sm/[21px]">
            {t("PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.")}
          </p>
          <hr className="mt-6 border-black/50" />
          <div className="mt-6 flex items-center gap-6 pl-px">
            <span className={optLabel}>{t("Colours:")}</span>
            <ColorPicker colors={["#a0bce0", "#e07575"]} />
          </div>
          <div className="mt-6 flex items-center gap-6 pl-px">
            <span className={optLabel}>{t("Size:")}</span>
            <div className="flex gap-4">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={
                    "size-8 rounded border text-sm/[21px] font-medium " +
                    (s === size
                      ? "border-brand bg-brand text-light"
                      : "border-black/50 hover:border-brand hover:bg-brand hover:text-light")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center pl-px">
            <div className="flex h-11">
              <button
                className="flex h-11 w-10 items-center justify-center rounded-l border border-black/50"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <img src="/icons/minus.svg" alt="Decrease" />
              </button>
              <span className="-ml-px w-20 border border-black/50 text-center text-xl/[42px] font-medium">
                {qty}
              </span>
              <button
                className="-ml-px flex h-11 w-[41px] items-center justify-center rounded-r bg-brand"
                onClick={() => setQty(qty + 1)}
              >
                <img src="/icons/plus.svg" alt="Increase" />
              </button>
            </div>
            <button
              className={`${btnSmall} ml-4`}
              onClick={() => {
                addToCart(p, qty);
                navigate("/cart");
              }}
            >
              {t("Buy Now")}
            </button>
            <button
              className={
                "ml-[19px] flex size-10 items-center justify-center rounded border border-black/50" +
                (wished ? " bg-brand" : "")
              }
              onClick={() => toggleWishlist(p)}
            >
              <img
                src="/icons/wishlist.svg"
                alt="Add to wishlist"
                className={wished ? "invert" : ""}
              />
            </button>
          </div>
          <div className="mt-10 ml-px w-[399px] rounded border border-black/50">
            <div className="flex h-[90px] items-center gap-4 px-4">
              <img src="/icons/delivery.svg" alt="" className="size-10" />
              <div>
                <h4 className="font-medium">{t("Free Delivery")}</h4>
                <a href="#" className={`${deliveryText} underline`}>
                  {t("Enter your postal code for Delivery Availability")}
                </a>
              </div>
            </div>
            <div className="flex h-[90px] items-center gap-4 border-t border-black/50 px-4">
              <img src="/icons/return.svg" alt="" className="size-10" />
              <div>
                <h4 className="font-medium">{t("Return Delivery")}</h4>
                <p className={deliveryText}>
                  {t("Free 30 Days Delivery Returns.")}{" "}
                  <a href="#" className="underline">
                    {t("Details")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-35">
        <SectionLabel>{t("Related Item")}</SectionLabel>
        <div className={`${grid4} mt-15`}>
          {related.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
