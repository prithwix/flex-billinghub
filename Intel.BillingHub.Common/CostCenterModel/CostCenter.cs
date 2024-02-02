using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Common.CostCenterModel
{
    public class CostCenter
    {
        public string? CostCenterId { get; set; }
        public string? CostCenterName { get; set; }
        public string? CompanyCode { get; set; }
        public bool IsActive { get; set; }
        public string? faWWID { get; set; }
        public string? faName { get; set; }
        public string? faEmail { get; set; }

    }
}
