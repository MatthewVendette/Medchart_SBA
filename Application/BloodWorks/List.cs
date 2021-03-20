using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.BloodWorks
{
    public class List
    {
        public class Query : IRequest<List<BloodWork>> { }

        public class Handler : IRequestHandler<Query, List<BloodWork>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<BloodWork>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BloodWorks.ToListAsync();
            }
        }
    }
}