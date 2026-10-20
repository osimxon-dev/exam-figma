import { Breadcrumb } from "../components/ui";
import { box, btn, container, fieldInput } from "../styles";
import { useStore } from "../store";

const menuList =
  "mt-4 ml-[35px] flex flex-col gap-2 text-black/50 [&>li]:cursor-pointer";

function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span>{label}</span>
      <input className={fieldInput} {...props} />
    </label>
  );
}

export default function Account() {
  const { t } = useStore();
  return (
    <main className={`${container} pt-20 pb-35`}>
      <div className="flex items-center justify-between">
        <Breadcrumb items={["Home", "My Account"]} />
        <p className="text-sm/[21px]">
          {t("Welcome!")} <span className="text-brand">Md Rimel</span>
        </p>
      </div>
      <div className="mt-20 flex">
        <aside className="w-[300px] shrink-0">
          <h4 className="font-medium">{t("Manage My Account")}</h4>
          <ul className={`${menuList} mb-6`}>
            <li className="text-brand">{t("My Profile")}</li>
            <li>{t("Address Book")}</li>
            <li>{t("My Payment Options")}</li>
          </ul>
          <h4 className="font-medium">{t("My Orders")}</h4>
          <ul className={`${menuList} mb-4`}>
            <li>{t("My Returns")}</li>
            <li>{t("My Cancellations")}</li>
          </ul>
          <h4 className="font-medium">{t("My WishList")}</h4>
        </aside>
        <form
          className={`${box} w-[870px] px-20 py-10`}
          onSubmit={(e) => e.preventDefault()}
        >
          <h3 className="mb-4 text-xl/7 font-medium text-brand">
            {t("Edit Your Profile")}
          </h3>
          <div className="grid grid-cols-[330px_330px] gap-x-[50px] gap-y-6">
            <Field label={t("First Name")} placeholder="Md" />
            <Field label={t("Last Name")} placeholder="Rimel" />
            <Field label={t("Email")} placeholder="rimel1111@gmail.com" />
            <Field label={t("Address")} placeholder="Kingston, 5236, United State" />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Field
              label={t("Password Changes")}
              type="password"
              placeholder={t("Current Passwod")}
            />
            <input
              className={fieldInput}
              type="password"
              placeholder={t("New Passwod")}
            />
            <input
              className={fieldInput}
              type="password"
              placeholder={t("Confirm New Passwod")}
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-8">
            <button type="button">{t("Cancel")}</button>
            <button className={btn}>{t("Save Changes")}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
