using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Details
    {
        public class Query : IRequest<BloodWork>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BloodWork>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<BloodWork> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BloodWorks.FindAsync(request.Id);
            }
        }
    }
}