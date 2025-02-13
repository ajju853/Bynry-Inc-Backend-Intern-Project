
import ServiceRequestForm from "@/components/ServiceRequestForm";
import RequestStatus from "@/components/RequestStatus";
import ServicesList from "@/components/ServicesList";
import AccountSection from "@/components/AccountSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Gas Utility Service</h1>
            <AccountSection />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <ServicesList />
          </section>
          
          <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <ServiceRequestForm />
          </section>
          
          <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <RequestStatus />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
