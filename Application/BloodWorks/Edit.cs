using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;

namespace Application.BloodWorks
{
    public class Edit
    {
        public class Command : IRequest
        {
            public BloodWork BloodWork { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bloodWork = await _context.BloodWorks.FindAsync(request.BloodWork.Id);

                _mapper.Map(request.BloodWork, bloodWork);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}