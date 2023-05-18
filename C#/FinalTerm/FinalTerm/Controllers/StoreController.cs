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
    public class StoreController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public StoreController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from
                            dbo.Store
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
                            dbo.Store
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

        [HttpPost]

        public JsonResult Post(Store emp)
        {
            string query = @"insert into dbo.Store (Name,OwnerId,Address,PhoneNumber, BusinessStartDate, BusinessLicense, TaxCode )
                    values (@Name,@OwnerId,@Address, @PhoneNumber, @BusinessStartDate, @BusinessLicense, @TaxCode)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Guid idStore = Guid.NewGuid();
                    myCommand.Parameters.AddWithValue("@Id", idStore.ToString());
                    myCommand.Parameters.AddWithValue("@Name", emp.Name);
                    myCommand.Parameters.AddWithValue("@OwnerId", emp.OwnerId);
                    myCommand.Parameters.AddWithValue("@Address", emp.Address);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", emp.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@BusinessStartDate", emp.BusinessStartDate);
                    myCommand.Parameters.AddWithValue("@BusinessLicense", emp.BusinessLicense);
                    myCommand.Parameters.AddWithValue("@TaxCode", emp.TaxCode);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Store emp)
        {
            string query = @"
                           update dbo.Store
                           set
                            Name=@Name,
                            OwnerId=@OwnerId,
                            Address=@Address,
                            PhoneNumber=@PhoneNumber,
                            BusinessStartDate=@BusinessStartDate,
                            BusinessLicense=@BusinessLicense,
                            TaxCode=@TaxCode
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
                    myCommand.Parameters.AddWithValue("@Name", emp.Name);
                    myCommand.Parameters.AddWithValue("@OwnerId", emp.OwnerId);
                    myCommand.Parameters.AddWithValue("@Address", emp.Address);
                    myCommand.Parameters.AddWithValue("@PhoneNumber", emp.PhoneNumber);
                    myCommand.Parameters.AddWithValue("@BusinessStartDate", emp.BusinessStartDate);
                    myCommand.Parameters.AddWithValue("@BusinessLicense", emp.BusinessLicense);
                    myCommand.Parameters.AddWithValue("@TaxCode", emp.TaxCode);
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