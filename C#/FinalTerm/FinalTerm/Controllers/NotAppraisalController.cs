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
    public class NotAppraisalController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public NotAppraisalController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet("notAppraisal")]
        public JsonResult GetNotAppraisal()
        {
            string query = @"
                            select [dbo].[Appraisal].Id, [dbo].[Store].Id As StoreId, DateCheck, StaffId, [dbo].[Store].Address, [dbo].[Store].Name
                            from [dbo].[Appraisal] inner join Store ON Store.Id = Appraisal.StoreId
							where [dbo].[Appraisal].StaffId is null and [dbo].[Appraisal].DateCheck is null
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
                            select [dbo].[Appraisal].Id, [dbo].[Store].Id As StoreId, DateCheck, StaffId, [dbo].[Store].Address, [dbo].[Store].Name
                            from [dbo].[Appraisal] inner join Store ON Store.Id = Appraisal.StoreId
                            ";
            if (id != null && id != "")
            {
                query += " where [dbo].[Appraisal].Id = @id";
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

        [HttpPost]

        public JsonResult Post(Appraisal emp)
        {
            string query = @"insert into dbo.Appraisal (DateCheck,StaffId)
                    values (@DateCheck,@StaffId)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Guid idAppraisal = Guid.NewGuid();
                    myCommand.Parameters.AddWithValue("@Id", idAppraisal.ToString());
                    myCommand.Parameters.AddWithValue("@DateCheck", emp.DateCheck);
                    myCommand.Parameters.AddWithValue("@StaffId", emp.StaffId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Appraisal emp)
        {
            string query = @"
                           update dbo.Appraisal
                           set
                            DateCheck=@DateCheck,
                            StaffId=@StaffId
                            where Id=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DateCheck", emp.DateCheck);
                    myCommand.Parameters.AddWithValue("@StaffId", emp.StaffId);
                    myCommand.Parameters.AddWithValue("@Id", new Guid(emp.Id));
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {
            string query = @"
                           delete from dbo.Store
                            where Id=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}