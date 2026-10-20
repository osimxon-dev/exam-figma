import { Link } from "react-router-dom";
import { Breadcrumb } from "../components/ui";
import { btn, container } from "../styles";
import { useStore } from "../store";

export default function NotFound() {
  const { t } = useStore();
  return (
    <main className={`${container} pt-20 pb-35`}>
      <Breadcrumb items={["Home", "404 Error"]} />
      <h1 className="mt-35 text-center font-inter text-[110px]/[115px] font-medium tracking-[3.3px]">
        {t("404 Not Found")}
      </h1>
      <p className="mt-10 text-center">
        {t("Your visited page not found. You may go home page.")}
      </p>
      <Link to="/" className={`${btn} mt-20 ml-[437px]`}>
        {t("Back to home page")}
      </Link>
    </main>
  );
}
