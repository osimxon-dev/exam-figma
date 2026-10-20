import { useState } from "react";
import { Link } from "react-router-dom";
import { circleBtn } from "../styles";
import { useStore } from "../store";

export function Stars({ rating }) {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <img
          key={i}
          alt=""
          className="size-5"
          src={`/icons/${i <= rating ? "star" : i - 0.5 === rating ? "star-half" : "star-empty"}.svg`}
        />
      ))}
    </span>
  );
}

export function SectionLabel({ children, big }) {
  return (
    <div
      className={
        "flex h-10 items-center gap-4 " +
        (big
          ? "text-xl/[26px] text-black"
          : "text-base/5 font-semibold text-brand")
      }
    >
      <span className="h-10 w-5 rounded bg-brand" />
      {children}
    </div>
  );
}

export function Arrows({ onPrev, onNext }) {
  return (
    <div className="ml-auto flex gap-2">
      <button className={circleBtn} onClick={onPrev}>
        <img src="/icons/arrow-left.svg" alt="Previous" />
      </button>
      <button className={circleBtn} onClick={onNext}>
        <img src="/icons/arrow-right.svg" alt="Next" />
      </button>
    </div>
  );
}

export function Dots({ active, onChange, light, className = "" }) {
  return (
    <div className={"flex items-center justify-center gap-3 " + className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          aria-label={`Slide ${i + 1}`}
          onClick={() => onChange(i)}
          className={
            "rounded-full " +
            (i !== active
              ? "size-3 " + (light ? "bg-white/50" : "bg-black/30")
              : light
                ? "size-3.5 border-2 border-white bg-brand"
                : "size-4 border-2 border-black/30 bg-brand bg-clip-content p-px")
          }
        />
      ))}
    </div>
  );
}

export function Breadcrumb({ items }) {
  const { t } = useStore();
  return (
    <div className="flex items-center gap-3 text-sm/[21px]">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 && (
            <span
              aria-hidden
              className="mx-[2.5px] h-[13px] w-px rotate-[27deg] bg-black/30"
            />
          )}
          {i === items.length - 1 ? (
            t(item)
          ) : (
            <Link to={item === "Home" ? "/" : "#"} className="text-black/50">
              {t(item)}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}

export function Services() {
  const { t } = useStore();
  const items = [
    [
      "svc-delivery",
      "FREE AND FAST DELIVERY",
      "Free delivery for all orders over $140",
      "w-[249px]",
    ],
    [
      "svc-customer",
      "24/7 CUSTOMER SERVICE",
      "Friendly 24/7 customer support",
      "w-[262px]",
    ],
    [
      "svc-secure",
      "MONEY BACK GUARANTEE",
      "We reurn money within 30 days",
      "w-[256px]",
    ],
  ];
  return (
    <div className="mt-35 flex justify-center gap-[88px]">
      {items.map(([icon, title, text, w]) => (
        <div
          key={title}
          className={"flex flex-col items-center text-center " + w}
        >
          <img src={`/icons/${icon}.svg`} alt="" className="size-20" />
          <h4 className="mt-6 whitespace-nowrap text-xl/7 font-semibold">
            {t(title)}
          </h4>
          <p className="mt-2 text-sm/[21px]">{t(text)}</p>
        </div>
      ))}
    </div>
  );
}

export function ColorPicker({ colors }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex gap-2">
      {colors.map((c, i) => (
        <button
          key={c}
          className={
            "size-5 rounded-full bg-clip-content" +
            (i === active ? " border-2 border-black p-0.5" : "")
          }
          style={{ backgroundColor: c }}
          onClick={() => setActive(i)}
          aria-label={c}
        />
      ))}
    </div>
  );
}
