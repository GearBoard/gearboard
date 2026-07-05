import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/libs/utils";

export interface AboutCardProps {
  title?: ReactNode;
  description?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function AboutCard({
  title = "เกี่ยวกับ Gearboard",
  description = (
    <>
      <span className="font-bold">GearBoard</span> คือพื้นที่แลกเปลี่ยนความรู้ แชร์ข้อมูล และพูดคุย
      ทุกเรื่องราวระหว่างชาววิศวฯ ทั้งนักศึกษา และอาจารย์
      เพื่อสร้างคอมมูนิตี้ที่เหนียวแน่นและเติบโตไปด้วยกัน
    </>
  ),
  buttonText = "ดูเพิ่มเติม",
  onButtonClick,
  className,
}: AboutCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg flex flex-col items-start gap-3 px-[19px] py-6 font-poppins w-[296px] h-[250px]",
        className
      )}
    >
      <h3 className="font-bold text-primary-red text-lg leading-[135%]">{title}</h3>
      <p className="font-medium text-dark-gray text-sm leading-[193%]">{description}</p>
      <Button color="red" size="lg" className="w-full font-sans" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
}
