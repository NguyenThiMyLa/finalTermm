using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using FinalTerm.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailConditionController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public DetailConditionController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpPost]
        public IActionResult Post(DetailCondition emp)
        {
            string query = @"INSERT INTO [dbo].[DetailCondition] (StoreId, ConditionSafeId)
                        VALUES (@StoreId, @ConditionSafeId)";
            string connectionString = _configuration.GetConnectionString("FinalTermAppCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                foreach (var conditionSafeId in emp.ConditionSafeIds)
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        Guid idDetailCondition = Guid.NewGuid();
                        command.Parameters.AddWithValue("@Id", idDetailCondition.ToString());
                        command.Parameters.AddWithValue("@StoreId", emp.StoreId);
                        command.Parameters.AddWithValue("@ConditionSafeId", conditionSafeId);

                        command.ExecuteNonQuery();
                    }
                }

                connection.Close();
            }

            return Ok("Added Successfully");
        }
    }
}