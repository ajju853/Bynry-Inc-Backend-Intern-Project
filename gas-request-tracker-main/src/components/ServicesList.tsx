
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wrench, Gauge, Home, PlusCircle } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Emergency Gas Leak",
    description: "24/7 emergency response for suspected gas leaks",
    icon: AlertTriangle,
    urgent: true,
  },
  {
    id: 2,
    title: "Meter Installation",
    description: "New meter installation or replacement services",
    icon: Gauge,
  },
  {
    id: 3,
    title: "Maintenance",
    description: "Regular maintenance and inspection services",
    icon: Wrench,
  },
  {
    id: 4,
    title: "Home Connection",
    description: "New home gas connection services",
    icon: Home,
  },
];

const ServicesList = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Available Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <service.icon className={`w-8 h-8 ${service.urgent ? 'text-utility-error' : 'text-utility-accent'}`} />
                {service.urgent && (
                  <span className="bg-utility-error/10 text-utility-error text-xs font-medium px-2 py-1 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{service.description}</p>
              </div>
              <Button className="w-full" variant="outline">
                <PlusCircle className="w-4 h-4 mr-2" />
                Request Service
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
