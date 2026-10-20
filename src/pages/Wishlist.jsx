import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { SectionLabel } from "../components/ui";
import { justForYou } from "../data";
import { useStore } from "../store";
import { btnOutline, container, grid4 } from "../styles";

export default function Wishlist() {
  const { wishlist, moveAllToCart, t } = useStore();
  return (
    <main className={`${container} pt-20 pb-35`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl/[26px]">{t("Wishlist")} ({wishlist.length})</h2>
        <button className={btnOutline} onClick={moveAllToCart}>
          {t("Move All To Bag")}
        </button>
      </div>
      <div className={`${grid4} mt-15`}>
        {wishlist.map((p) => (
          <ProductCard key={p.id} p={p} mode="wishlist" />
        ))}
      </div>

      <div className="mt-20 flex items-center justify-between">
        <SectionLabel big>{t("Just For You")}</SectionLabel>
        <Link to="/" className={btnOutline}>
          {t("See All")}
        </Link>
      </div>
      <div className={`${grid4} mt-15`}>
        {justForYou.map((p) => (
          <ProductCard key={p.id} p={p} mode="foryou" />
        ))}
      </div>
    </main>
  );
}
