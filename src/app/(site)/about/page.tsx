import Button from "@/components/Button";
import Link from "next/link";
import { FiArrowLeft, FiGithub } from "react-icons/fi";

export default function Home() {
  return (
    <div className="content">
      <Link href="/">
        <Button className="w-fit mb-8" as={"div"} icon={<FiArrowLeft />}>
          Back
        </Button>
      </Link>

      <p>
        Invoicer is an open-source tool for generating custom invoice PDFs from{" "}
        <a className="text-primary-300" href="https://toggl.com/track/">
          Toggl tracker
        </a>{" "}
        projects.
      </p>

      <p>{`If you wish to build additional features or templates, please open a pull request on GitHub!`}</p>

      <a
        href="https://github.com/bashbaugh/invoicer"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Button className="w-fit" as={"div"} icon={<FiGithub />}>
          View on GitHub
        </Button>
      </a>
    </div>
  );
}
