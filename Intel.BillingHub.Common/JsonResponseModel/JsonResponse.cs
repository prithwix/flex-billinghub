using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intel.BillingHub.Common.JsonResponseModel
{
    public class JsonResponse
    {
        public string? id { get; set; }
        public Int32? status { get; set; }
        public string? message { get; set; }
        public string? error_details { get; set; }
    }
}
