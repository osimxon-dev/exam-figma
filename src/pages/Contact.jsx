import { Breadcrumb } from "../components/ui";
import { box, btn, container } from "../styles";
import { useStore } from "../store";

const heading = "flex items-center gap-4 font-medium";
const text = "text-sm/[21px]";

export default function Contact() {
  const { t } = useStore();
  return (
    <main className={`${container} pt-20 pb-35`}>
      <Breadcrumb items={["Home", "Contact"]} />
      <div className="mt-20 flex gap-7.5">
        <div className={`${box} h-[457px] w-[340px] px-[35px] py-10`}>
          <div>
            <h4 className={heading}>
              <img src="/icons/phone.svg" alt="" className="size-10" />
              {t("Call To Us")}
            </h4>
            <p className={`${text} mt-6 w-[262px]`}>
              {t("We are available 24/7, 7 days a week.")}
            </p>
            <p className={`${text} mt-4 w-[262px]`}>{t("Phone")}: +8801611112222</p>
          </div>
          <hr className="my-8 w-[270px] border-black/50" />
          <div>
            <h4 className={heading}>
              <img src="/icons/mail.svg" alt="" className="size-10" />
              {t("Write To US")}
            </h4>
            <p className={`${text} mt-6 w-[250px]`}>
              {t("Fill out our form and we will contact you within 24 hours.")}
            </p>
            <p className={`${text} mt-4 w-[250px]`}>
              {t("Emails")}: customer@exclusive.com
            </p>
            <p className={`${text} mt-4 w-[250px]`}>
              {t("Emails")}: support@exclusive.com
            </p>
          </div>
        </div>
        <form
          className={`${box} flex h-[457px] w-[800px] flex-col items-end gap-8 px-[31px] py-10`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex gap-4">
            {["Your Name", "Your Email", "Your Phone"].map((p) => (
              <label key={p} className="relative h-[50px] w-[235px]">
                <input
                  placeholder=" "
                  className="peer size-full rounded bg-soft px-4"
                />
                <span className="pointer-events-none absolute top-[13px] left-4 text-black/50 peer-[:not(:placeholder-shown)]:hidden">
                  {t(p)} <em className="text-brand not-italic opacity-50">*</em>
                </span>
              </label>
            ))}
          </div>
          <textarea
            placeholder={t("Your Massage")}
            className="h-[207px] w-[737px] resize-none rounded bg-soft px-4 py-[13px]"
          />
          <button className={btn}>{t("Send Massage")}</button>
        </form>
      </div>
    </main>
  );
}
