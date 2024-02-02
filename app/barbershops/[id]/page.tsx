import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";

interface BarbershopsDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopsDetailsPage = async ({
  params,
}: BarbershopsDetailsPageProps) => {
  if (!params.id) {
    // TODO: redirecionar pra home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    // TODO: redirecionar pra home page
    return null;
  }
 
  return <BarbershopInfo barbershop={barbershop}/>;
};

export default BarbershopsDetailsPage;
