import { useSettings } from "@/hooks/useSettings";
import { templates } from "@/templates";
import Image from "next/image";
import Link from "next/link";
import { HiCheck } from "react-icons/hi";

export default function TemplatesPanel() {
  const [selectedTemplate, setSelectedTemplate] = useSettings((s) => [
    s.templateId,
    s.setTemplateId,
  ]);

  return (
    <div className="grid grid-cols-2 gap-8">
      {templates.map((template) => (
        <Link
          href="#"
          onClick={() => setSelectedTemplate(template.id)}
          key={template.name}
          className="flex flex-col gap-2 p-6 m-6 rounded-lg hover:bg-black hover:bg-opacity-5 transition-all"
        >
          <Image
            alt={template.name}
            src={template.component.previewPhoto}
            className="border-2 rounded-md overflow-clip"
          />
          <div className="text-center">
            {selectedTemplate === template.id && (
              <HiCheck className="inline-block mr-2 text-green-600 stroke-2" />
            )}
            {template.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
