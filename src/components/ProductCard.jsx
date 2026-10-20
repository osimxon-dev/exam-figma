import { Link } from "react-router-dom";
import { ColorPicker, Stars } from "./ui";
import { useStore } from "../store";

const icon = "flex size-[34px] items-center justify-center rounded-full";
const tag =
  "absolute top-3 left-3 z-1 rounded px-3 py-1 text-xs/4.5 text-light";

export default function ProductCard({ p, mode = "default" }) {
  const { inWishlist, toggleWishlist, removeFromWishlist, addToCart, t } =
    useStore();
  const [file, w, h, x, y] = p.img;
  const always = mode === "wishlist" || mode === "foryou";
  const icons =
    mode === "wishlist"
      ? ["delete"]
      : mode === "foryou"
        ? ["eye"]
        : ["heart", "eye"];

  return (
    <div className="group w-[270px] shrink-0">
      <div className="relative h-[250px] overflow-hidden rounded bg-soft">
        {p.tag && <span className={`${tag} bg-brand`}>{p.tag}</span>}
        {p.isNew && <span className={`${tag} bg-accent`}>{t("NEW")}</span>}
        <div className="absolute top-3 right-3 z-1 flex flex-col gap-2">
          {icons.map((i) => {
            if (i === "eye") {
              return (
                <Link key={i} to="/product" className={`${icon} bg-white`}>
                  <img src="/icons/eye.svg" alt="View" className="size-6" />
                </Link>
              );
            }
            const active = i === "heart" && inWishlist(p.id);
            return (
              <button
                key={i}
                className={`${icon} ` + (active ? "bg-brand" : "bg-white")}
                onClick={() =>
                  i === "heart" ? toggleWishlist(p) : removeFromWishlist(p.id)
                }
              >
                <img
                  src={`/icons/${i}.svg`}
                  alt={i === "heart" ? "Add to wishlist" : "Remove"}
                  className={"size-6" + (active ? " invert" : "")}
                />
              </button>
            );
          })}
        </div>
        <Link to="/product">
          <img
            className="absolute max-w-none"
            src={`/images/${file}.png`}
            alt={p.name}
            style={{ width: w, height: h, left: x, top: y }}
          />
        </Link>
        <button
          className={
            "absolute bottom-0 left-0 z-1 flex h-[41px] w-full items-center justify-center gap-2 rounded-b bg-black text-white transition-opacity " +
            (always
              ? "text-xs/4.5"
              : "font-medium opacity-0 group-hover:opacity-100")
          }
          onClick={() => addToCart(p)}
        >
          {always && (
            <img src="/icons/cart.svg" alt="" className="size-6 invert" />
          )}
          {t("Add To Cart")}
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link to="/product" className="font-medium">
          {p.name}
        </Link>
        <div className="flex items-center gap-3 font-medium">
          <span className="text-brand">${p.price}</span>
          {p.old && <span className="line-through opacity-50">${p.old}</span>}
          {mode === "inline" && <Rating p={p} className="-ml-1" />}
        </div>
        {mode !== "inline" && p.rating && <Rating p={p} />}
        {p.colors && <ColorPicker colors={p.colors} />}
      </div>
    </div>
  );
}

function Rating({ p, className = "" }) {
  return (
    <div
      className={"flex items-center gap-2 text-sm/5 font-semibold " + className}
    >
      <Stars rating={p.rating} />
      <span className="opacity-50">({p.reviews})</span>
    </div>
  );
}
