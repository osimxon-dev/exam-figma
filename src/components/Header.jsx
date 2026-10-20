import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { container } from "../styles";

const links = [
  ["/", "Home"],
  ["/contact", "Contact"],
  ["/about", "About"],
  ["/signup", "Sign Up"],
];

const menu = [
  ["/account", "user-white", "Manage My Account"],
  ["/account", "mallbag", "My Order"],
  ["/account", "cancel", "My Cancellations"],
  ["/account", "reviews", "My Reviews"],
  ["/login", "logout", "Logout"],
];

const variants = {
  "/": { gap: "ml-[190px]", icons: true, user: false },
  "/signup": { gap: "ml-[232px]", icons: false, auth: true },
  "/login": { gap: "ml-[232px]", icons: false, auth: true },
  "/account": { userActive: true },
};

const badge =
  "absolute top-px right-px size-4 rounded-full bg-brand text-center text-xs/4 text-light";

export default function Header() {
  const { pathname } = useLocation();
  const v = { gap: "ml-40", icons: true, user: true, ...variants[pathname] };
  const [open, setOpen] = useState(false);
  const { wishlist, cart, t, lang, setLang } = useStore();

  return (
    <header>
      <div className="h-12 bg-black text-sm/[21px] text-light">
        <div
          className={`${container} flex h-full items-center justify-end gap-[231px]`}
        >
          <p className="flex items-center gap-2">
            {t("Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!")}
            <Link to="/" className="font-semibold leading-6 underline">
              {t("ShopNow")}
            </Link>
          </p>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
            className="cursor-pointer appearance-none bg-transparent bg-[url(/icons/lang-down.svg)] bg-right bg-no-repeat pr-[29px] leading-[21px] [&>option]:text-black"
          >
            <option value="en">English</option>
            <option value="uz">O‘zbekcha</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>

      <div
        className={
          `${container} flex h-[38px] items-center ` +
          (v.auth ? "mt-[38px]" : "mt-10")
        }
      >
        <Link
          to="/"
          className="w-[118px] whitespace-nowrap font-inter text-2xl/6 font-bold tracking-[0.72px]"
        >
          Exclusive
        </Link>
        <nav className={
            "flex " +
            // shortcut: uz/ru labels are longer than the en design widths, so center the nav instead of the fixed offset
            (lang === "en" ? "gap-12 " + v.gap : "mx-auto gap-8 px-6")
          }>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                "whitespace-nowrap border-b text-center " +
                (isActive
                  ? "border-black/50"
                  : "border-transparent hover:border-black/50")
              }
            >
              {t(label)}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-6">
          <label className="flex h-[38px] w-[243px] items-center gap-[34px] rounded bg-soft py-[7px] pr-3 pl-5">
            <input
              placeholder={t("What are you looking for?")}
              className="w-[153px] text-xs/4.5"
            />
            <img src="/icons/search.svg" alt="" />
          </label>
          {v.icons && (
            <div className="flex items-center gap-4">
              <Link to="/wishlist" className="relative block size-8">
                <img src="/icons/wishlist.svg" alt="Wishlist" />
                {wishlist.length > 0 && (
                  <span className={badge}>{wishlist.length}</span>
                )}
              </Link>
              <Link to="/cart" className="relative block size-8">
                <img
                  src="/icons/cart.svg"
                  alt="Cart"
                  className={cart.length ? "mt-2 ml-px size-6" : ""}
                />
                {cart.length > 0 && (
                  <span className={badge}>{cart.length}</span>
                )}
              </Link>
              {v.user && (
                <div className="relative">
                  <button
                    className="relative block size-8"
                    onClick={() => setOpen(!open)}
                  >
                    <img
                      src={
                        v.userActive || open
                          ? "/icons/user.svg"
                          : "/icons/user-black.svg"
                      }
                      alt="Account"
                    />
                  </button>
                  {open && (
                    <div
                      className="absolute top-[35px] right-0 z-10 flex h-52 w-56 flex-col gap-[13px] rounded bg-black/4 pt-[18px] pr-3 pl-5 backdrop-blur-[75px]"
                      onClick={() => setOpen(false)}
                    >
                      {menu.map(([to, icon, label]) => (
                        <Link
                          key={label}
                          to={to}
                          className="flex items-center gap-4 text-sm/[21px] text-light"
                        >
                          <img
                            src={`/icons/${icon}.svg`}
                            alt=""
                            className={
                              icon === "user-white" ? "size-8" : "size-6"
                            }
                          />
                          {t(label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 border-b border-black/30" />
    </header>
  );
}
