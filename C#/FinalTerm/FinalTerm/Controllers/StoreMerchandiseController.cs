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
    public class StoreMerchandiseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public StoreMerchandiseController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet("getSMerchandise/{dataSMerchandise}")]
        public JsonResult Get(string dataSMerchandise)
        {
            string query = @"
                            select [dbo].[Merchandise].Id AS MerchandiseId, [dbo].[Merchandise].Name, MadeIn, StoreId, [dbo].[StoreMerchandise].Id
                            from Merchandise inner join StoreMerchandise ON Merchandise.Id = StoreMerchandise.MerchandiseId
                            where [dbo].[StoreMerchandise].StoreId=@Id;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    if (dataSMerchandise != null && dataSMerchandise != " ")
                    {
                        myCommand.Parameters.AddWithValue("@Id", dataSMerchandise);
                    }
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
                            select [dbo].[Merchandise].Id AS MerchandiseId, [dbo].[Merchandise].Name, MadeIn, StoreId, [dbo].[StoreMerchandise].Id
                            from Merchandise inner join StoreMerchandise ON Merchandise.Id = StoreMerchandise.MerchandiseId
                            ";
            if (id != null && id != "")
            {
                query += " where [dbo].[StoreMerchandise].Id = @id";
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

        public JsonResult Post(StoreMerchandise emp)
        {
            string query = @"insert into dbo.StoreMerchandise (StoreId,MerchandiseId,MadeIn)
                    values (@StoreId,@MerchandiseId,@MadeIn)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FinalTermAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    Guid idStoreMerchandise = Guid.NewGuid();
                    myCommand.Parameters.AddWithValue("@Id", idStoreMerchandise.ToString());
                    myCommand.Parameters.AddWithValue("@StoreId", emp.StoreId);
                    myCommand.Parameters.AddWithValue("@MerchandiseId", emp.MerchandiseId);
                    myCommand.Parameters.AddWithValue("@MadeIn", emp.MadeIn);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(StoreMerchandise emp)
        {
            string query = @"
                           update dbo.StoreMerchandise
                           set MadeIn=@MadeIn
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
                    myCommand.Parameters.AddWithValue("@MadeIn", emp.MadeIn);
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
                           delete from dbo.StoreMerchandise
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