import { useState } from "react";
import { Breadcrumb, Dots, Services } from "../components/ui";
import { container } from "../styles";
import { useStore } from "../store";

const stats = [
  ["svc-shop", "10.5k", "Sallers active our site"],
  ["svc-sale", "33k", "Mopnthly Produduct Sale", true],
  ["svc-bag", "45.5k", "Customer active in our site"],
  ["svc-moneybag", "25k", "Anual gross sale in our site"],
];

const team = [
  ["team1", "Tom Cruise", "Founder & Chairman", [236, 391, 67, 39]],
  ["team2", "Emma Watson", "Managing Director", [294, 397, 38, 33]],
  ["team3", "Will Smith", "Product Designer", [326, 392, 22, 38]],
];

export default function About() {
  const { t } = useStore();
  const [slide, setSlide] = useState(2);
  return (
    <main className="pt-20 pb-35">
      <div className={container}>
        <Breadcrumb items={["Home", "About"]} />
      </div>
      <section className="mt-[42px] flex items-center pl-[calc((100%-1170px)/2)]">
        <div className="w-[525px] shrink-0">
          <h1 className="font-inter text-[54px]/16 font-semibold tracking-[3.24px]">
            {t("Our Story")}
          </h1>
          <p className="mt-10 leading-[26px]">
            {t("Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.")}{" "}
          </p>
          <p className="mt-6 w-[505px] leading-[26px]">
            {t("Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.")}
          </p>
        </div>
        <div className="relative ml-[75px] h-[609px] flex-1 overflow-hidden rounded-l bg-[#eb7ea8]">
          <img
            src="/images/about.png"
            alt=""
            className="absolute top-0 left-0 h-[609px] w-[837px] max-w-none"
          />
        </div>
      </section>

      <div className={container}>
        <div className="mt-35 flex gap-7.5">
          {stats.map(([icon, num, text, active]) => (
            <div
              key={num}
              className={
                "flex h-[230px] w-[270px] flex-col items-center rounded " +
                (active
                  ? "bg-brand pt-8 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                  : "border border-black/30 pt-[29px]")
              }
            >
              <img src={`/icons/${icon}.svg`} alt="" className="size-20" />
              <b className="mt-6 font-inter text-[32px]/[30px] font-bold tracking-[1.28px]">
                {num}
              </b>
              <span className={active ? "mt-2" : "mt-3"}>{t(text)}</span>
            </div>
          ))}
        </div>

        <div className="mt-35 flex gap-7.5">
          {team.map(([img, name, role, [w, h, x, y]]) => (
            <div key={name} className="w-[370px]">
              <div className="relative h-[430px] overflow-hidden rounded bg-soft">
                <img
                  src={`/images/${img}.png`}
                  alt={name}
                  className="absolute max-w-none"
                  style={{ width: w, height: h, left: x, top: y }}
                />
              </div>
              <h3 className="mt-8 font-inter text-[32px]/[30px] font-medium tracking-[1.28px]">
                {name}
              </h3>
              <p className="mt-2">{t(role)}</p>
              <div className="mt-4 flex gap-4">
                {["twitter", "instagram", "linkedin"].map((s) => (
                  <a key={s} href="#">
                    <img
                      src={`/icons/${s}.svg`}
                      alt={s}
                      className="size-6 invert"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Dots active={slide} onChange={setSlide} className="mt-10" />
        <Services />
      </div>
    </main>
  );
}
