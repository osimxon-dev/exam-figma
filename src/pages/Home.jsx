import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Arrows, Dots, SectionLabel, Services } from "../components/ui";
import { useCountdown } from "../useCountdown";
import {
  bestSelling,
  categories,
  explore,
  flashSales,
  sideCategories,
} from "../data";
import { btn, circleBtn, container, grid4 } from "../styles";
import { useStore } from "../store";

const secTitle =
  "whitespace-nowrap font-inter text-4xl/12 font-semibold tracking-[1.44px]";
const bigTitle = "font-inter text-5xl/[60px] font-semibold tracking-[1.92px]";
const noScrollbar = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function Feature({
  className,
  img,
  imgClass,
  glow,
  title,
  text,
  textClass = "bottom-6 left-6 gap-4",
}) {
  const { t } = useStore();
  return (
    <div className={"relative overflow-hidden rounded text-light " + className}>
      {glow && (
        <span
          className={
            "absolute rounded-full bg-[#d9d9d9]/90 blur-[150px] " + glow
          }
        />
      )}
      <img
        src={`/images/${img}.png`}
        alt={title}
        className={"absolute max-w-none " + imgClass}
      />
      <div className={"absolute flex flex-col items-start " + textClass}>
        <h3 className="whitespace-nowrap font-inter text-2xl/6 font-semibold tracking-[0.72px]">
          {title}
        </h3>
        <p className="text-sm/[21px]">{text}</p>
        <Link
          to="/product"
          className="border-b border-white/50 font-medium text-white"
        >
          {t("Shop Now")}
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useStore();
  const flashRef = useRef(null);
  const catRef = useRef(null);
  const [activeCat, setActiveCat] = useState("Camera");
  const [slide, setSlide] = useState(2);
  const flash = useCountdown(3 * 86400 + 23 * 3600 + 19 * 60 + 56);
  const music = useCountdown(5 * 86400 + 23 * 3600 + 59 * 60 + 35);
  const scroll = (ref, dir) =>
    ref.current.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <main>
      <section className={`${container} flex items-start`}>
        <ul className="flex h-96 w-[233px] flex-col gap-4 border-r border-black/30 pt-10 pr-4">
          {sideCategories.map(([name, arrow]) => (
            <li
              key={name}
              className="flex cursor-pointer items-center justify-between"
            >
              {t(name)}
              {arrow && (
                <img src="/icons/dropdown.svg" alt="" className="size-6" />
              )}
            </li>
          ))}
        </ul>
        <div className="relative mt-10 ml-[45px] h-[344px] w-[892px] overflow-hidden bg-black text-light">
          <img
            className="absolute top-4 left-[396px] h-[352px] w-[496px] max-w-none"
            src="/images/hero-iphone.png"
            alt="iPhone 14"
          />
          <div className="absolute top-[58px] left-16 flex items-center gap-6">
            <img
              src="/images/apple-logo.png"
              alt=""
              className="h-[49px] w-10"
            />
            <span>iPhone 14 Series</span>
          </div>
          <h1 className={`absolute top-[127px] left-16 w-[294px] ${bigTitle}`}>
            {t("Up to 10% off Voucher")}
          </h1>
          <Link
            to="/product"
            className="absolute top-[269px] left-[67px] flex items-start gap-2 font-medium"
          >
            <span className="border-b border-light pb-[3px]">{t("Shop Now")}</span>
            <img src="/icons/arrow-right-white.svg" alt="" className="mt-0.5" />
          </Link>
          <Dots
            light
            active={slide}
            onChange={setSlide}
            className="absolute top-[319px] left-[353px]"
          />
        </div>
      </section>

      <section className={`${container} mt-35`}>
        <div className="flex h-[103px] items-end">
          <div className="w-[211px]">
            <SectionLabel>{t("Today’s")}</SectionLabel>
            <h2 className={`mt-6 ${secTitle}`}>{t("Flash Sales")}</h2>
          </div>
          <div className="ml-[87px] flex">
            {["Days", "Hours", "Minutes", "Seconds"].map((l, i) => (
              <div key={l} className="flex items-start">
                {i > 0 && (
                  <span className="mx-[17px] mt-[26px] flex flex-col gap-2">
                    <i className="size-1 rounded-full bg-brand-hover" />
                    <i className="size-1 rounded-full bg-brand-hover" />
                  </span>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-xs/4.5 font-medium">{t(l)}</span>
                  <b className="font-inter text-[32px]/[30px] font-bold tracking-[1.28px]">
                    {flash[l.toLowerCase()]}
                  </b>
                </div>
              </div>
            ))}
          </div>
          <Arrows
            onPrev={() => scroll(flashRef, -1)}
            onNext={() => scroll(flashRef, 1)}
          />
        </div>
        <div
          className={`mt-10 mr-[calc((1170px-100vw)/2)] flex gap-7.5 overflow-x-auto ${noScrollbar}`}
          ref={flashRef}
        >
          {flashSales.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="mt-15 flex justify-center">
          <Link to="/product" className={btn}>
            {t("View All Products")}
          </Link>
        </div>
      </section>

      <hr className={`${container} mt-15 border-black/30`} />

      <section className={`${container} mt-20`}>
        <div className="flex items-end">
          <div>
            <SectionLabel>{t("Categories")}</SectionLabel>
            <h2 className={`mt-5 ${secTitle}`}>{t("Browse By Category")}</h2>
          </div>
          <Arrows
            onPrev={() => scroll(catRef, -1)}
            onNext={() => scroll(catRef, 1)}
          />
        </div>
        <div
          className={`mt-15 flex gap-7.5 overflow-x-auto ${noScrollbar}`}
          ref={catRef}
        >
          {categories.map(([name, icon]) => {
            const active = activeCat === name;
            return (
              <button
                key={name}
                onClick={() => setActiveCat(name)}
                className={
                  "group flex h-[145px] w-[170px] shrink-0 flex-col items-center gap-4 rounded border pt-6 transition-colors " +
                  (active
                    ? "border-brand bg-brand text-light shadow-box"
                    : "border-black/30 hover:border-brand hover:bg-brand hover:text-light hover:shadow-box")
                }
              >
                <img
                  src={`/icons/${icon}.svg`}
                  alt=""
                  className={
                    "size-14 " + (active ? "invert" : "group-hover:invert")
                  }
                />
                <span>{t(name)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <hr className={`${container} mt-[70px] border-black/30`} />

      <section className={`${container} mt-[70px]`}>
        <div className="flex items-end">
          <div>
            <SectionLabel>{t("This Month")}</SectionLabel>
            <h2 className={`mt-5 ${secTitle}`}>{t("Best Selling Products")}</h2>
          </div>
          <Link to="/product" className={`${btn} ml-auto`}>
            {t("View All")}
          </Link>
        </div>
        <div className={`${grid4} mt-15`}>
          {bestSelling.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section
        className={`${container} relative mt-35 h-[500px] overflow-hidden bg-black text-light`}
      >
        <div className="absolute top-0 left-[552px] h-[500px] w-[504px] rounded-full bg-[#d9d9d9]/30 blur-[100px]" />
        <img
          className="absolute top-[82px] left-[542px] h-[330px] w-[568px] max-w-none"
          src="/images/jbl.png"
          alt="JBL Boombox"
        />
        <span className="absolute top-[69px] left-14 font-semibold leading-5 text-accent">
          {t("Categories")}
        </span>
        <h2
          className={`absolute top-[121px] left-14 whitespace-nowrap ${bigTitle}`}
        >
          {t("Enhance Your")}
          <br />
          {t("Music Experience")}
        </h2>
        <div className="absolute top-[273px] left-14 flex gap-6">
          {[
            ["hours", "Hours"],
            ["days", "Days"],
            ["minutes", "Minutes"],
            ["seconds", "Seconds"],
          ].map(([k, l]) => (
            <div
              key={k}
              className="flex size-[62px] flex-col items-center justify-center rounded-full bg-white text-black"
            >
              <b className="font-semibold leading-5">{music[k]}</b>
              <span className="-mt-1 text-[11px]/4.5">{t(l)}</span>
            </div>
          ))}
        </div>
        <Link
          to="/product"
          className="absolute top-[375px] left-14 inline-flex h-14 items-center justify-center whitespace-nowrap rounded bg-accent px-12 font-medium text-light"
        >
          {t("Buy Now!")}
        </Link>
      </section>

      <section className={`${container} mt-[71px]`}>
        <div className="flex items-end">
          <div>
            <SectionLabel>{t("Our Products")}</SectionLabel>
            <h2 className={`mt-5 ${secTitle}`}>{t("Explore Our Products")}</h2>
          </div>
          <Arrows />
        </div>
        <div className={`${grid4} mt-15`}>
          {explore.map((p) => (
            <ProductCard key={p.id} p={p} mode="inline" />
          ))}
        </div>
        <div className="mt-15 flex justify-center">
          <Link to="/product" className={btn}>
            {t("View All Products")}
          </Link>
        </div>
      </section>

      <section className={`${container} mt-35`}>
        <SectionLabel>{t("Featured")}</SectionLabel>
        <h2 className={`mt-5 ${secTitle}`}>{t("New Arrival")}</h2>
        <div className="mt-15 flex gap-7.5">
          <Feature
            className="h-[600px] w-[570px] bg-black"
            img="ps5"
            imgClass="top-[89px] left-[29px] w-[511px]"
            title={t("PlayStation 5")}
            text={t("Black and White version of the PS5 coming out on sale.")}
            textClass="bottom-8 left-8 w-[242px] gap-4"
          />
          <div className="flex flex-col gap-8">
            <Feature
              className="h-[284px] w-[570px] bg-[#0d0d0d]"
              img="woman"
              imgClass="top-0 left-[138px] w-[432px]"
              title={t("Women’s Collections")}
              text={t("Featured woman collections that give you another vibe.")}
              textClass="bottom-6 left-6 w-[255px] gap-4"
            />
            <div className="flex gap-7.5">
              <Feature
                className="h-[284px] w-[270px] bg-black"
                glow="top-11 left-[37px] size-[196px]"
                img="speakers"
                imgClass="top-[31px] left-10 w-[190px]"
                title={t("Speakers")}
                text={t("Amazon wireless speakers")}
                textClass="bottom-6 left-6 w-[191px] gap-2"
              />
              <Feature
                className="h-[284px] w-[270px] bg-black"
                glow="top-[23px] left-4 size-[238px]"
                img="perfume"
                imgClass="top-[38px] left-[34px] w-[201px]"
                title={t("Perfume")}
                text={t("GUCCI INTENSE OUD EDP")}
                textClass="bottom-6 left-6 w-[191px] gap-2"
              />
            </div>
          </div>
        </div>
      </section>

      <div className={`${container} relative pb-35`}>
        <Services />
        <button
          className={`${circleBtn} absolute top-[223px] -right-[46px]`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/icons/arrow-up.svg" alt="Back to top" />
        </button>
      </div>
    </main>
  );
}
