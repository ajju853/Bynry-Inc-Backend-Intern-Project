
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    requestType: "",
    description: "",
    address: "",
    contactNumber: "",
    attachments: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, attachments: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Service request submitted successfully!");
    setFormData({
      requestType: "",
      description: "",
      address: "",
      contactNumber: "",
      attachments: [],
    });
  };

  return (
    <Card className="w-full max-w-2xl p-6 mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Submit Service Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Request Type</label>
          <Input
            value={formData.requestType}
            onChange={(e) =>
              setFormData({ ...formData, requestType: e.target.value })
            }
            placeholder="e.g., Gas Leak, Meter Installation"
            className="w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Please describe your issue..."
            className="w-full min-h-[100px]"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Address</label>
          <Input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="Enter your address"
            className="w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Number</label>
          <Input
            value={formData.contactNumber}
            onChange={(e) =>
              setFormData({ ...formData, contactNumber: e.target.value })
            }
            placeholder="Enter your contact number"
            className="w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Attachments</label>
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-full"
            multiple
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-utility-accent hover:bg-utility-accent/90 text-white transition-colors"
        >
          Submit Request
        </Button>
      </form>
    </Card>
  );
};

export default ServiceRequestForm;
