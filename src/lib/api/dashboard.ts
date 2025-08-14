// Types for dashboard data
export interface StatsData {
  apiCalls: {
    value: number;
    change: number;
  };
  emailsFound: {
    value: number;
    change: number;
  };
  phoneNumbers: {
    value: number;
    change: number;
  };
  validationRate: {
    value: number;
    change: number;
  };
}

export interface ActivityItem {
  id: string;
  type:
    | "email_found"
    | "bulk_upload"
    | "api_call"
    | "validation"
    | "phone_found";
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  status: "processing" | "completed" | "failed";
  progress: number;
  rowCount?: number;
  enriched?: number;
  failed?: number;
}

// Mock data functions with simulated delays
export async function fetchDashboardStats(): Promise<StatsData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return {
    apiCalls: {
      value: 12467,
      change: 12.5,
    },
    emailsFound: {
      value: 8392,
      change: 8.2,
    },
    phoneNumbers: {
      value: 5124,
      change: -3.8,
    },
    validationRate: {
      value: 94.7,
      change: 2.1,
    },
  };
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Simulate error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch recent activity");
  }

  return [
    {
      id: "act-1",
      type: "email_found",
      title: "Email Found",
      description: "john.doe@acme.com for John Doe at Acme Inc",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      status: "success",
    },
    {
      id: "act-2",
      type: "bulk_upload",
      title: "Bulk Upload Completed",
      description: "contacts-may-2023.csv with 1,250 records",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: "success",
    },
    {
      id: "act-3",
      type: "api_call",
      title: "API Request",
      description: "Batch enrichment via API from Zapier integration",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      status: "pending",
    },
    {
      id: "act-4",
      type: "validation",
      title: "Email Validation",
      description: "Validated 230 emails from recent import",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      status: "success",
    },
    {
      id: "act-5",
      type: "phone_found",
      title: "Phone Number Found",
      description: "+1 (555) 123-4567 for Sarah Johnson at TechCorp",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      status: "failed",
    },
  ];
}

export async function fetchFileUploads(): Promise<FileUpload[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch file uploads");
  }

  return [
    {
      id: "file-1",
      name: "may-leads.csv",
      size: 1024 * 1024 * 2.3, // 2.3MB
      uploadedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "completed",
      progress: 100,
      rowCount: 1250,
      enriched: 1180,
      failed: 70,
    },
    {
      id: "file-2",
      name: "april-contacts.xlsx",
      size: 1024 * 1024 * 4.7, // 4.7MB
      uploadedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      status: "processing",
      progress: 68,
    },
    {
      id: "file-3",
      name: "competitors.csv",
      size: 1024 * 512, // 512KB
      uploadedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      status: "failed",
      progress: 0,
    },
  ];
}
