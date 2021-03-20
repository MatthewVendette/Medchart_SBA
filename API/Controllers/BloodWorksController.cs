using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BloodWorks;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BloodWorksController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<BloodWork>>> GetBloodWorks()
        {
            return await Mediator.Send(new List.Query());
        }

        //TODO: Error handling for 404
        [HttpGet("{id}")]
        public async Task<ActionResult<BloodWork>> GetBloodWork(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateBloodWork(BloodWork bloodWork)
        {
            return Ok(await Mediator.Send(new Create.Command{BloodWork = bloodWork}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBloodWork(Guid id, BloodWork bloodWork)
        {
            bloodWork.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{BloodWork = bloodWork}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodWork(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}