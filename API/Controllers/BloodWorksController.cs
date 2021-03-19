using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class BloodWorksController : BaseApiController
    {
        private readonly DataContext _ctx;
        public BloodWorksController(DataContext ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public async Task<ActionResult<List<BloodWork>>> GetBloodWorks()
        {
            return await _ctx.BloodWorks.ToListAsync();
        }

        //TODO: Error handling for 404
        [HttpGet("{id}")]
        public async Task<ActionResult<BloodWork>> GetBloodWork(Guid id)
        {
            return await _ctx.BloodWorks.FindAsync(id);
        }
    }
}