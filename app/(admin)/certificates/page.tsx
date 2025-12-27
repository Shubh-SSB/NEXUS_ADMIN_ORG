import { CertificateList } from "@/components/certificates/certificate-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground mt-1">Manage certificate templates and issuance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      <CertificateList />
    </div>
  )
}
