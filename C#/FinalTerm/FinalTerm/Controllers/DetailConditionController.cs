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
            string query = @"INSERT INTO [dbo].[DetailCondition] (StoreId, ConditionSafeId, Date)
                        VALUES (@StoreId, @ConditionSafeId, @Date)";
            string appraisalQuery = @"INSERT INTO [dbo].[Appraisal] (StoreId, DateCheck, StaffId, Evaluate)
                             VALUES (@StoreId, @DateCheck, @StaffId, @Evaluate)";
            string connectionString = _configuration.GetConnectionString("FinalTermAppCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String date = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                int count = 0;
                foreach (var conditionSafeId in emp.ConditionSafeIds)
                {
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        Guid idDetailCondition = Guid.NewGuid();
                        command.Parameters.AddWithValue("@Id", idDetailCondition.ToString());
                        command.Parameters.AddWithValue("@StoreId", emp.StoreId);
                        command.Parameters.AddWithValue("@ConditionSafeId", conditionSafeId);
                        command.Parameters.AddWithValue("@Date", date);
                        command.ExecuteNonQuery();
                        count++;
                    }
                }
                double result = ((double)count / 18) * 100;
                string evaluate;
                if(result >= 70.0)
                {
                    evaluate = "Đạt tiêu chuẩn";
                } else
                {
                    evaluate = "Không đạt tiêu chuẩn";
                }
                using (SqlCommand appraisalCommand = new SqlCommand(appraisalQuery, connection))
                {
                    appraisalCommand.Parameters.AddWithValue("@StoreId", emp.StoreId);
                    appraisalCommand.Parameters.AddWithValue("@datecheck", date);
                    appraisalCommand.Parameters.AddWithValue("@StaffId", "2AF29B22-F09E-43C4-8F5D-436124AA3C4F");
                    appraisalCommand.Parameters.AddWithValue("@Evaluate", evaluate);
                    appraisalCommand.ExecuteNonQuery();
                }
                
                connection.Close();
            }

            return Ok("Added Successfully");
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select [dbo].[DetailCondition].Id, Content, StoreId, ConditionSafeId, Note, Evaluate, Date, Type
                            from [dbo].[DetailCondition] 
                            inner join [dbo].[ConditionSafe] ON [dbo].[DetailCondition].ConditionSafeId = [dbo].[ConditionSafe].Id
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult GetId(string id)
        {
            string query = @"
                            select * from
                            [dbo].[DetailCondition]
                            ";
            if (id != null && id != "")
            {
                query += " where Id = @id";
            }
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (id != null && id != "")
                    {
                        myCommand.Parameters.AddWithValue("@Id", new Guid(id));
                    }
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("getDetailCondition/{storeId}")]
        public JsonResult Get(string storeId, [FromQuery] string date)
        {
            string query = @"
        SELECT MIN(dc.Id) AS Id, cs.Content, dc.StoreId, dc.ConditionSafeId, dc.Note, dc.Evaluate, dc.Date, cs.Type
        FROM [dbo].[DetailCondition] dc
        INNER JOIN [dbo].[ConditionSafe] cs ON dc.ConditionSafeId = cs.Id
        WHERE dc.StoreId = @StoreId AND dc.Date = @Date
        GROUP BY cs.Content, dc.StoreId, dc.ConditionSafeId, dc.Note, dc.Evaluate, dc.Date, cs.Type";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StoreId", storeId);
                    myCommand.Parameters.AddWithValue("@Date", date);

                    SqlDataReader myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }

                myCon.Close();
            }

            return new JsonResult(table);
        }

    }
}