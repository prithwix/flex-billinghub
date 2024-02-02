using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Common.JVFile
{
    public class JVFileRequestModel
    {
        public string? SequenceNumber { get; set; }
        public string? CompanyCode { get; set; }
        public string? CostCenter { get; set; }
        public string? GLAccount { get; set; }
        public string? ProjectID { get; set; }
        public string? Quantity { get; set; }
        public string? Amount { get; set; }
        public string? MgrEmailOrEmpWWID { get; set; }
        public string? FAEmail { get; set; }
        public string? DescriptionForInvoice { get; set; }
        public string? ProductInfo { get; set; }
        public string? IndentifiersEmailOrURL { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
