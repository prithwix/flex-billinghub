using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Common.CostCenterModel
{
    public class SearchCostCenter : InvalidMsgModel
    {
        public string? CompanyCode { get; set; }
        public string? CostCenterId { get; set; }
        public string? CostCenterName { get; set; }
        public string? CostCenterFullName
        {
            get
            {
                return CostCenterId == null ? "" : CostCenterId + " - " + CostCenterName;
            }
        }
        public string? FaWwid { get; set; }
        public string? FaName { get; set; }
        public bool? Invalid { get; set; }
        public string? InvalidMsg { get; set; }
    }
}
