import { Link } from "react-router-dom";
import { container } from "../styles";
import { useStore } from "../store";

const title = "text-xl/7 font-medium";
const list = "mt-6 flex flex-col gap-4";

export default function Footer() {
  const { t } = useStore();
  return (
    <footer className="bg-black pt-20 text-light">
      <div className={`${container} flex h-[236px] gap-[87px]`}>
        <div className="flex w-[217px] flex-col">
          <Link
            to="/"
            className="w-[118px] whitespace-nowrap font-inter text-2xl/6 font-bold tracking-[0.72px]"
          >
            Exclusive
          </Link>
          <h4 className={`${title} mt-6`}>{t("Subscribe")}</h4>
          <p className="mt-6">{t("Get 10% off your first order")}</p>
          <label className="mt-4 flex h-12 w-[217px] items-center justify-between rounded border-[1.5px] border-light py-3 pr-[15px] pl-4">
            <input
              placeholder={t("Enter your email")}
              className="w-[130px] text-light placeholder:text-light/40"
            />
            <img src="/icons/send.svg" alt="" />
          </label>
        </div>
        <div className="flex w-[175px] flex-col">
          <h4 className={title}>{t("Support")}</h4>
          <ul className={list}>
            <li>
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>
        <div className="flex w-[123px] flex-col">
          <h4 className={title}>{t("Account")}</h4>
          <ul className={list}>
            <li>
              <Link to="/account">{t("My Account")}</Link>
            </li>
            <li>
              <Link to="/login">{t("Login / Register")}</Link>
            </li>
            <li>
              <Link to="/cart">{t("Cart")}</Link>
            </li>
            <li>
              <Link to="/wishlist">{t("Wishlist")}</Link>
            </li>
            <li>
              <Link to="/">{t("Shop")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex w-[109px] flex-col">
          <h4 className={title}>{t("Quick Link")}</h4>
          <ul className={list}>
            <li>{t("Privacy Policy")}</li>
            <li>{t("Terms Of Use")}</li>
            <li>{t("FAQ")}</li>
            <li>
              <Link to="/contact">{t("Contact")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex w-[198px] flex-col">
          <h4 className={title}>{t("Download App")}</h4>
          <p className="mt-6 text-xs/4.5 font-medium opacity-70">
            {t("Save $3 with App New User Only")}
          </p>
          <div className="mt-2 flex gap-2">
            <div className="mt-0.5 size-20 bg-black p-0.5">
              <img
                src="/images/qrcode.png"
                alt="QR code"
                className="size-[76px]"
              />
            </div>
            <div className="flex flex-col gap-1">
              {[
                ["google-play", "Google Play", "h-[30px]"],
                ["app-store", "App Store", "h-[34px]"],
              ].map(([img, alt, h]) => (
                <a
                  key={img}
                  href="#"
                  className="flex h-10 w-[110px] items-center justify-center"
                >
                  <img
                    src={`/images/${img}.png`}
                    alt={alt}
                    className={
                      "w-[104px] rounded border-[0.6px] border-light " + h
                    }
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-6">
            {["facebook", "twitter", "instagram", "linkedin"].map((s) => (
              <a key={s} href="#">
                <img src={`/icons/${s}.svg`} alt={s} className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-15 border-t border-white/8 pt-4 pb-6">
        <p className="flex items-center justify-center gap-1.5 text-white/24">
          <img
            src="/icons/copyright.svg"
            alt=""
            className="size-5 opacity-24"
          />
          {t("Copyright Rimel 2022. All right reserved")}
        </p>
      </div>
    </footer>
  );
}
