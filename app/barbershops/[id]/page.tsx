import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-items";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopsDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopsDetailsPage = async ({
  params,
}: BarbershopsDetailsPageProps) => {

const session =  await getServerSession(authOptions)
  if (!params.id) {
    // TODO: redirecionar pra home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },

    include: {
        services: true,
    }
  });

  if (!barbershop) {
    // TODO: redirecionar pra home page
    return null;
  }
 
  return ( <div>
  
    <BarbershopInfo barbershop={barbershop}/>

    <div className="px-5 flex flex-col gap-4 py-6">
    {barbershop.services.map((service) => (
        <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user}/>
    ))}
    
    </div>
  </div>
  );

};

export default BarbershopsDetailsPage;
 