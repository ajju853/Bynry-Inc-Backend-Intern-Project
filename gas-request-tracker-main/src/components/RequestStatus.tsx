
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from backend in real app
const mockRequest = {
  id: "SR-2024-001",
  type: "Gas Leak Investigation",
  status: "In Progress",
  lastUpdated: "2024-02-20T10:00:00",
  estimatedCompletion: "2024-02-21T14:00:00",
};

const RequestStatus = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-utility-success text-white";
      case "in progress":
        return "bg-utility-warning text-black";
      case "pending":
        return "bg-utility-gray text-white";
      default:
        return "bg-utility-accent text-white";
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold">Request Status</h2>
        <Badge className={getStatusColor(mockRequest.status)}>
          {mockRequest.status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Request ID</p>
            <p className="font-medium">{mockRequest.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{mockRequest.type}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(mockRequest.lastUpdated).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Completion</p>
            <p className="font-medium">
              {new Date(mockRequest.estimatedCompletion).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RequestStatus;
