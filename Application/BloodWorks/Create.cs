using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Create
    {
        public class Command : IRequest
        {
            public BloodWork BloodWork { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.BloodWorks.Add(request.BloodWork);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}