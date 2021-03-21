using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Details
    {
        public class Query : IRequest<Result<BloodWork>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BloodWork>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<BloodWork>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bloodWork = await _context.BloodWorks.FindAsync(request.Id);
                return Result<BloodWork>.Success(bloodWork);
            }
        }
    }
}