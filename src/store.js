import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { cartItems, wishlist as wishlistSeed } from "./data";
import { toast } from "react-toastify";
import { translate } from "./i18n";

const StoreContext = createContext(null);

function usePersisted(key, seed) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? seed;
    } catch {
      return seed;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  }, [key, value]);
  return [value, setValue];
}

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = usePersisted("wishlist", wishlistSeed);
  const [cart, setCart] = usePersisted("cart", cartItems);
  const [lang, setLang] = usePersisted("lang", "en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = (s) => translate(lang, s);

  const inWishlist = (id) => wishlist.some((p) => p.id === id);
  // toasts fire outside the state updaters: StrictMode runs updaters twice
  const toggleWishlist = (p) => {
    const had = inWishlist(p.id);
    setWishlist((list) =>
      list.some((x) => x.id === p.id)
        ? list.filter((x) => x.id !== p.id)
        : [...list, p],
    );
    if (had) toast.info(t("Removed from wishlist"));
    else toast.success(t("Added to wishlist"));
  };
  const removeFromWishlist = (id) => {
    setWishlist((list) => list.filter((p) => p.id !== id));
    toast.info(t("Removed from wishlist"));
  };

  const add = (list, p, qty) =>
    list.some((x) => x.id === p.id)
      ? list.map((x) => (x.id === p.id ? { ...x, qty: x.qty + qty } : x))
      : [...list, { ...p, qty }];
  const addToCart = (p, qty = 1) => {
    setCart((list) => add(list, p, qty));
    toast.success(t("Added to cart"));
  };
  const setQty = (id, d) =>
    setCart((list) =>
      list.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x,
      ),
    );
  const removeFromCart = (id) =>
    setCart((list) => list.filter((x) => x.id !== id));
  const moveAllToCart = () => {
    if (!wishlist.length) return;
    setCart((list) => wishlist.reduce((l, p) => add(l, p, 1), list));
    setWishlist([]);
    toast.success(t("All items moved to cart"));
  };

  const value = {
    wishlist,
    cart,
    inWishlist,
    toggleWishlist,
    removeFromWishlist,
    addToCart,
    setQty,
    removeFromCart,
    moveAllToCart,
    lang,
    setLang,
    t,
  };
  return createElement(StoreContext.Provider, { value }, children);
}

export const useStore = () => useContext(StoreContext);
