using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.BloodWorks
{
    public class List
    {
        public class Query : IRequest<Result<List<BloodWork>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BloodWork>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<BloodWork>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<BloodWork>>.Success(await _context.BloodWorks.ToListAsync());
            }
        }
    }
}